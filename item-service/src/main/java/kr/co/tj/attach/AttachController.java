package kr.co.tj.attach;

import java.io.File;
import java.io.IOException;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@Controller
@RequestMapping("/attach")
public class AttachController {
// 파일 다운로드 구현
	@GetMapping("/download")
	public ResponseEntity<byte[]> download(String filename) {
		return FileUploadUtils.download(filename);
	}

	// 프론트엔드에서 업로드한 이미지 파일 보여주게 함.
	@GetMapping("/showImage")
	public ResponseEntity<byte[]> showImage(String filename) {
		return FileUploadUtils.showImage("D:" + File.separator + "upload", filename);
	}

	// 파일 업로드 구현
	@PostMapping("/fileupload")
     public String fileupload(MultipartHttpServletRequest mRequest, Model model) {
          // 업로드한 파일이 들어 있는 MultipartFile 객체 획득
          // mRequest.getFile("file");의 "file"은 프론트엔드의 input태그의 name임.
          MultipartFile file = mRequest.getFile("file");
          // 반드시 원래 이름을 획득하여 새로운 파일명을 생성해야 한다. 
          // 새로운 파일명에서 원래의 파일명을 추축할 수 있어야 한다.
          String orgFilename = file.getOriginalFilename();
          // 업로드한 파일들을 저장할 공간 선언
          File path = new File("D:"+File.separator+"upload");
          //D드라이브에 upload폴더가 없으면, 자동으로 생성하기
          if(!path.exists()) {
               path.mkdir();
          }
          // makePath()는 D드라이브의 upload폴더에 연도폴더나 월폴더 또는 날짜 폴더를 생성하고
          // 날짜 폴더의 path를 반환한다.
          // \2023\05\09형식으로..
          String datePath = FileUploadUtils.makePath("D:"+File.separator+"upload");
        // 같은 이름의 파일이 업로드 되면, 기존 파일을 새로 업로드한 파일이 덮어쓰기하고 있음.
          // 덮어쓰기를 방지하는 방법으로 파일명을 유니크하게 변경하는 방법이 있음.
          // 파일명을 변경하더라도 원래 파일명을 추룰할 수 있도록 해야 한다.
          String savedName = FileUploadUtils.makeFilename(orgFilename);
          try {
               // 업로드한 파일을 저장하는 코드
               file.transferTo(new File(path+datePath, savedName));
               String dbsaveFilename =datePath+File.separator+savedName;
               //db 작업이 생략됐음.
               // dbsaveFilename과 이 업로드파일을 보여주는 곳의 id 그리고 이 파일을 업로드한 사람의 정보 등을
               // db에 저장해야 함.
               // datePath는 파일구분자로 \를 사용하는데, 브라우저에서는 /를 사용한다.
               // 이런 이유로 attach/showImage mvc핸들러를 이용해서 업로드한 파일을 
               // 프론트엔드에 출력하려고 하면 에러가 남.
               // \를 /로 전환하는 코드
               dbsaveFilename = dbsaveFilename.replace(File.separatorChar, '/');
               model.addAttribute("dbsaveFilename", dbsaveFilename);
          } catch (Exception e) {
               e.printStackTrace();
          }
        return "attach/read";
        }

	// 파일 업로드할 수 있는 화면으로 이동
	@GetMapping("/test")
	public String test() {
		return "attach/test";
	}
}
