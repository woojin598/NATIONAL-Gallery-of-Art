package kr.co.tj.itemservice.dto;

import java.io.Serializable;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class ReplyResponse implements Serializable{
 
	private static final long serialVersionUID = 1L;
	
	private long id;
	
	private long bid;
	
	private String username;
	
	private String comment;
	
	private Date updateDate;
	
	private Date createDate;

}
