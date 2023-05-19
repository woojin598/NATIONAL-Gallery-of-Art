package kr.co.tj.itemservice.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import kr.co.tj.itemservice.dto.ReplyRequest;



@FeignClient(name = "reply-service", url="/reply-service")//댓글서비스URL 넣기
public interface ReplyFeign {
	
	@PostMapping("/replys")
	ResponseEntity<?> createReply(@RequestBody ReplyRequest replyRequest);//댓글Create 
	

}