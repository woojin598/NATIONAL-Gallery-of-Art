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
	
	private String role;

	public static ReplyDTO toReplyDTO(ReplyRequest replyRequest) {
		 
		return ReplyDTO.builder()
				.username(replyRequest.getUsername())
				.bid(replyRequest.getBid())
				.comment(replyRequest.getComment())
				.build();
	}

	public ReplyResponse toReplyResponse() {
		// TODO Auto-generated method stub
		return ReplyResponse.builder()
				.id(id)
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
				.id(replyEntity.getId())
				.bid(replyEntity.getBid())
				.username(replyEntity.getUsername())
				.comment(replyEntity.getComment())
				.createDate(replyEntity.getCreateDate())
				.updateDate(replyEntity.getUpdateDate())				
				.build();
	}

	public ReplyDTO toReplyDTO(ReplyEntity replyEntity) {
		   this.id = replyEntity.getId();
		    this.bid = replyEntity.getBid();
		    this.username = replyEntity.getUsername();
		    this.comment = replyEntity.getComment();
		    this.createDate = replyEntity.getCreateDate();
		    this.updateDate = replyEntity.getUpdateDate();
		    this.role = replyEntity.getRole();
		    
		    return this;
	}
	

}
