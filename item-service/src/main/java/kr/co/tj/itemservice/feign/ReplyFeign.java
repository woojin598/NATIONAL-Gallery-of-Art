package kr.co.tj.itemservice.feign;


import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import kr.co.tj.itemservice.dto.ReplyRequest;
import kr.co.tj.itemservice.dto.ReplyResponse;


@FeignClient(name = "reply-service")
public interface ReplyFeign {

	 @GetMapping("/reply-service/id/{id}")
	    ResponseEntity<?> findById(@PathVariable("id") Long id);

	    @GetMapping("/reply-service/bid")
	    ResponseEntity<?> listByBid(@RequestBody Long bid, @RequestParam("pageNum") int pageNum);

	    @GetMapping("/reply-service/all/{bid}")
	    ResponseEntity<?> findByBId(@PathVariable("bid") Long bid);

//	    @DeleteMapping("/reply-service/replys/{id}")
//	    ResponseEntity<ReplyResponse> delete(@PathVariable("id") Long id);
	    @DeleteMapping("/reply-service/replys/{id}")
	    ResponseEntity<String> delete(@PathVariable("id") Long id);

	    @PutMapping("/reply-service/replys/{username}")
	    ResponseEntity<?> update(@PathVariable("username") String username, @RequestBody ReplyResponse replyResponse);

	    @PostMapping("/reply-service/replys")
	    ResponseEntity<?> insert(@RequestBody ReplyRequest replyRequest);
}
