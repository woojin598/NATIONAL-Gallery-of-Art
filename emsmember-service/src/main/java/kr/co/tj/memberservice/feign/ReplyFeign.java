package kr.co.tj.memberservice.feign;


import org.springframework.cloud.openfeign.FeignClient;





@FeignClient(name = "reply-service")
public interface ReplyFeign {
	
	 
}
