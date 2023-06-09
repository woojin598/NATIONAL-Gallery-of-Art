package kr.co.tj.replyservice.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.tj.replyservice.dto.ReplyDTO;
import kr.co.tj.replyservice.dto.ReplyEntity;
import kr.co.tj.replyservice.dto.ReplyRequest;
import kr.co.tj.replyservice.dto.ReplyResponse;
import kr.co.tj.replyservice.service.ReplyService;

@RestController
@RequestMapping("reply-service")
public class ReplyController {
	@Autowired
	private ReplyService replyService;
	
	 @GetMapping("/replys/{id}")
	   public ResponseEntity<?> findById(@PathVariable("id") Long id){
	      Map<String, Object> map = new HashMap<>();
	      
	      if ( id == null) {
	         map.put("result", "잘못된 접근입니다. 존재하지 않는 id입니다.");
	         return ResponseEntity.badRequest().body(map);
	      }
	      
	      try {
	         ReplyDTO dto = replyService.findById(id);
	         map.put("result", dto);
	         return ResponseEntity.ok().body(map);
	      } catch (Exception e) {
	         // TODO Auto-generated catch block
	         e.printStackTrace();
	         map.put("err", e.getMessage());
	         return ResponseEntity.badRequest().body(map);
	      }
	   }

	
	@GetMapping("/bid")
	   public ResponseEntity<?> listByBid(@RequestBody Long bid, @RequestParam int pageNum){
	      Map<String, Object> map = new HashMap<>();
	      Page<ReplyDTO> page = replyService.findByBid(bid, pageNum);
	      map.put("result", page);
	      return ResponseEntity.ok().body(map);
	   }
	
	@GetMapping("/all/{bid}")
	   public ResponseEntity<?> findByBId(@PathVariable("bid") Long bid){
	      Map<String, Object> map = new HashMap<>();
	      
	      if ( bid == null) {
	         map.put("result", "잘못된 접근입니다. 존재하지 않는 bid입니다.");
	         return ResponseEntity.badRequest().body(map);
	      }
	      
	      try {
	         List<ReplyDTO> list = replyService.findByBId(bid);
	         map.put("result", list);
	         return ResponseEntity.ok().body(map);
	      } catch (Exception e) {
	         // TODO Auto-generated catch block
	         e.printStackTrace();
	         map.put("err", e.getMessage());
	         return ResponseEntity.badRequest().body(map);
	      }
	   }
	   
	 
	
	
	@DeleteMapping("/replys/{id}")
	public ResponseEntity<?> delete(@PathVariable("id") long id){
		
	try {
		replyService.deleteById(id);
		return ResponseEntity.ok().body("삭제 성공");
	} catch (Exception e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
		return ResponseEntity.badRequest().body("삭제실패");
	}
	}
	@PutMapping("/replys/{id}")
	public ResponseEntity<?> update(@PathVariable("id") Long id, @RequestBody ReplyDTO dto) {
	    Map<String, Object> map = new HashMap<>();

	    if (dto == null) {
	        map.put("result", "잘못된 데이터입니다");
	        return ResponseEntity.badRequest().body(map);
	    }
	    if (dto.getId() <= 0L) { // 유효한 bid 값을 확인
	        map.put("result", "잘못된 데이터입니다");
	        return ResponseEntity.badRequest().body("정보가없음");
	    }
	    if (dto.getComment() == null) {
	        map.put("result", "잘못된 데이터입니다");
	        return ResponseEntity.badRequest().body("정보가없음");
	    }
	    try {
	       
	        dto = replyService.update(dto);
	        map.put("result", dto);
	        return ResponseEntity.ok().body(map);
	    } catch (Exception e) {
	        e.printStackTrace();
	        map.put("result", "수정실패");
	        return ResponseEntity.badRequest().body(map);
	    }
	}
	
	
	
	@PostMapping("/replys")
	public ResponseEntity<?> insert(@RequestBody ReplyRequest replyRequest){
		
		ReplyDTO replyDTO = ReplyDTO.toReplyDTO(replyRequest);
		
		try {
			replyDTO = replyService.insert(replyDTO);
			
			ReplyResponse replyResponse = replyDTO.toReplyResponse();
			
			return ResponseEntity.status(HttpStatus.CREATED).body(replyResponse);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ReplyResponse.builder().build());
		}
	}
	
	
	@GetMapping("/health_check")
	public String status() {
		
		return "reply-service";
	}

}
