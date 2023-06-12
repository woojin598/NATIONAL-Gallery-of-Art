package kr.co.tj.orderservice.dto;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class OrderRequest {
		
	private long id;
	
	private String orderId;
	
	private String username;
	
	private String artist;
	
	private String productId;
	
	private String title;
	
	private String itemDescribe;
	
	private Long qty;
	
	private Long unitPrice;
	
	private Long totalPrice;
	
	@JsonProperty("create_date")
	private Date createDate;
	
	@JsonProperty("update_date")
	private Date updateDate;
}
