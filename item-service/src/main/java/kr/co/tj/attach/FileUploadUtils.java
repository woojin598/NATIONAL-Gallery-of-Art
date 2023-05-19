package kr.co.tj.attach;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import org.apache.commons.io.IOUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

public class FileUploadUtils{
//파일 다운로드 구현
	public static ResponseEntity<byte[]> download(String filename) {
		ResponseEntity<byte[]> entity = null;
		HttpHeaders headers = new HttpHeaders();
		InputStream in = null;
		try {
			in = new FileInputStream("D:" + File.separator + "upload" + filename);
			// 파일 다운로드를 유도하는 contentType: Octet_stream
			headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
			// 파일명에서 원래 파일명을 추출함
			String orgFilename = FileUploadUtils.getOrgFilename(filename);
			// 우리는 utf-8로 인코딩하지만, 브라우저는 ISO-8859-1로 인코딩함
			orgFilename = new String(orgFilename.getBytes("UTF-8"), "ISO-8859-1");
			// 다운로드했을 때, 원래 파일명으로 다운로드하게 함.
			headers.add("Content-Disposition", "attachment;filename=\"" + orgFilename + "\"");
			byte[] arr = IOUtils.toByteArray(in);
			entity = new ResponseEntity<byte[]>(arr, headers, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			entity = new ResponseEntity<byte[]>(HttpStatus.BAD_REQUEST);
		} finally {
			if (in != null) {
				try {
					in.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return entity;
	}

	// 파일명으로부터 원래 파일명 추출하기.
	// 다운로드한 파일명이 내가 업로드한 파일명이 아닌 이상한 이름으로 되어 있는 파일명이라면 열어 보겠는가?
	public static String getOrgFilename(String filename) {
		int idx = filename.indexOf('_', 12) + 1;
		return filename.substring(idx);
	}

	// 파일로부터 데이터를 읽어와서 byte[]배열로 만들어서
	// 프론트엔드로 전달하게 함.
	public static ResponseEntity<byte[]> showImage(String uploadPath, String filename) {
		ResponseEntity<byte[]> entity = null;
		MediaType mType = getMediaType(filename);
		HttpHeaders headers = new HttpHeaders();
		InputStream in = null;
		try {
			in = new FileInputStream(uploadPath + filename);
			headers.setContentType(mType);
			byte[] arr = IOUtils.toByteArray(in);
			entity = new ResponseEntity<byte[]>(arr, headers, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			entity = new ResponseEntity<byte[]>(HttpStatus.BAD_REQUEST);
		} finally {
			if (in != null) {
				try {
					in.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return entity;
	}

	public static MediaType getMediaType(String filename) {
		int idx = filename.lastIndexOf(".") + 1;
		String formatName = filename.substring(idx);
		// 대소문자 구분하지 않게 하려고.. 지금은 모두 소문자로 만든 코드
		formatName = formatName.toLowerCase();
		// png, gif, jpg, jpeg을 제외한 확장자명은 null을 반환함.
		Map<String, MediaType> map = new HashMap<>();
		map.put("png", MediaType.IMAGE_PNG);
		map.put("gif", MediaType.IMAGE_GIF);
		map.put("jpg", MediaType.IMAGE_JPEG);
		map.put("jpeg", MediaType.IMAGE_JPEG);
		return map.get(formatName);
	}

	// 업로드 되는 파일명이 동일하면, 새로 업로드된 파일이 기존 파일을 덮어쓰기 함.
	// 이를 방지하기 위해서 유니크한 파일명을 만들어서 활용함.
	public static String makeFilename(String orgFilename) {
		// UUID를 이용하면 유니크한 문자열을 자동으로 생성함.
		String uid = UUID.randomUUID().toString();
		// 유니크한 파일명을 만들더라도 원래 파일명을 추출할 수 있도록 만들어야 함.
		String savedName = uid + "_" + orgFilename;
		return savedName;
	}

// 실제로 폴더를 만드는 메서드
	public static void makeDir(String uploadPath, String yearPath, String monthPath, String datePath) {
		File yearFile = new File(uploadPath, yearPath);
		if (!yearFile.exists()) {
			yearFile.mkdir();
		}
		File monthFile = new File(uploadPath, monthPath);
		if (!monthFile.exists()) {
			monthFile.mkdir();
		}
		File dateFile = new File(uploadPath, datePath);
		if (!dateFile.exists()) {
			dateFile.mkdir();
		}
	}

	public static String makePath(String uploadPath) {
		// getCalendarInfo()의 반환값을 이용해서 연월일의 경로를 만듦
		int[] calendarInfo = getCalendarInfo();
		int year = calendarInfo[0];
		String yearPath = File.separator + year;
		int month = calendarInfo[1];
		// 폴더명이 5가 아닌 05처럼 되게 만드려고...
		String sMonth = month < 10 ? "0" + month : month + "";
		String monthPath = yearPath + File.separator + sMonth;
		// 폴더명이 8이 아닌 08처럼 되게 만드려고...
		int date = calendarInfo[2];
		String sDate = date < 10 ? "0" + date : date + "";
		String datePath = monthPath + File.separator + sDate;
		// 위에서 만든 경로를 이용해서 폴더를 생성함.
		makeDir(uploadPath, yearPath, monthPath, datePath);
		return datePath;
	}

	// 연월일 정보를 이용해서 폴더를 생성하려고 함.
	// 이를 위해서 Calendar 객체를 이용해서 그에 대한 정보를 획득하고 배열로 반환함.
	public static int[] getCalendarInfo() {
		Calendar c = Calendar.getInstance();
		int year = c.get(Calendar.YEAR);
		int month = c.get(Calendar.MONTH) + 1;
		int date = c.get(Calendar.DATE);
		int[] calendarInfo = { year, month, date };
		return calendarInfo;
	}
}