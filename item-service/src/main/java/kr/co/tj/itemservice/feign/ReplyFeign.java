package kr.co.tj.itemservice.feign;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import kr.co.tj.itemservice.dto.ReplyRequest;
import kr.co.tj.itemservice.dto.ReplyResponse;

@FeignClient(name = "reply-service")
public interface ReplyFeign {

@PostMapping("reply-service/replys")
public ResponseEntity<ReplyResponse> insertReply(@RequestBody ReplyRequest replyRequest);
	
@GetMapping("/replys/item/{id}")
public List<ReplyResponse> getReplysByItemId(@PathVariable("itemId") Long itemId);

}
