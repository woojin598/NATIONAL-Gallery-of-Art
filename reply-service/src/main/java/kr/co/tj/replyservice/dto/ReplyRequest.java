package kr.co.tj.replyservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReplyRequest {
	
	private String username;
	
	private long bid;
	
	private String comment;

}
