package kr.co.tj.replyservice.dto;

import java.io.Serializable;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReplyDTO implements Serializable {


	private static final long serialVersionUID = 1L;

	private long id;
	
	private long bid;
	
	private String username;
	
	private String comment;
	
	private Date createDate;
	
	private Date updateDate;

	public static ReplyDTO toReplyDTO(ReplyRequest replyRequest) {
		 
		return ReplyDTO.builder()
				.username(replyRequest.getUsername())
				.comment(replyRequest.getComment())
				.build();
	}

	public ReplyResponse toReplyResponse() {
		// TODO Auto-generated method stub
		return ReplyResponse.builder()
				.bid(bid)
				.username(username)
				.comment(comment)
				.createDate(createDate)
				.updateDate(updateDate)
				.build();
	}

	public ReplyEntity toReplyEntity() {
		// TODO Auto-generated method stub
		return ReplyEntity.builder()
				.bid(bid)
				.username(username)
				.comment(comment)
				.createDate(createDate)
				.updateDate(updateDate)
				.build();
	}

	
	public static ReplyDTO toReplyEntity(ReplyEntity replyEntity) {
		return ReplyDTO.builder()
				.username(replyEntity.getUsername())
				.comment(replyEntity.getComment())
				.updateDate(replyEntity.getUpdateDate())				
				.build();
	}

}
