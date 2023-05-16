package kr.co.tj.replyservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.tj.replyservice.dto.ReplyDTO;
import kr.co.tj.replyservice.dto.ReplyRequest;
import kr.co.tj.replyservice.dto.ReplyResponse;
import kr.co.tj.replyservice.service.ReplyService;

@RestController
@RequestMapping("reply-service")
public class ReplyController {
	@Autowired
	private ReplyService replyService;
	
	@DeleteMapping("")
	public ResponseEntity<?> delete(@PathVariable("id") long id){
		
	ReplyDTO replyDTO = replyService.deleteById(id);
		
	if(replyDTO == null) {	
		return ResponseEntity.notFound().build();
	}
		return ResponseEntity.ok(replyDTO);
	}
	
	@PutMapping("/replys/{id}")
	public ResponseEntity<?> update(@PathVariable("id") long id, @RequestBody ReplyRequest replyRequest) {
	    ReplyDTO replyDTO = replyService.findById(id);
	    
	    if (replyDTO == null) {
	        return ResponseEntity.notFound().build();
	    }
	    
	    replyDTO.setUsername(replyRequest.getUsername());
	    replyDTO.setComment(replyRequest.getComment());
	    
	    ReplyDTO updatedReply = replyService.update(replyDTO);
	    
	    if (updatedReply == null) {
	        return ResponseEntity.notFound().build();
	    }
	    
	    ReplyResponse replyResponse = updatedReply.toReplyResponse();
	    return ResponseEntity.ok(replyResponse);
	}
	
	/*
	 * @PutMapping("replys/{id}") public ResponseEntity<?>
	 * update(@PathVariable("id") long id,@RequestBody ReplyRequest replyRequest){
	 * ReplyDTO replyDTO = replyService.findById();
	 * 
	 * if(replyDTO == null) { return ResponseEntity.notFound().build(); }
	 * replyDTO.setUsername(replyRequest.getUsername());
	 * replyDTO.setComment(replyRequest.getComment());
	 * 
	 * replyDTO = replyService.update(replyDTO); ReplyResponse replyResponse =
	 * replyDTO.toReplyResponse(); return ResponseEntity.ok(replyResponse); }
	 */
	
	
	@PostMapping("/replys")
	public ResponseEntity<?> insert(@RequestBody ReplyRequest replyRequest){
		
		ReplyDTO replyDTO = ReplyDTO.toReplyDTO(replyRequest);
		
		replyDTO = replyService.insert(replyDTO);
		
		ReplyResponse replyResponse = replyDTO.toReplyResponse();
		
		return ResponseEntity.status(HttpStatus.CREATED).body(replyResponse);
	}

	@GetMapping("/health_check")
	public String status() {
		
		return "reply-service";
	}

}
