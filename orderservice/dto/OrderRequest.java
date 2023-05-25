package kr.co.tj.orderservice.dto;

import lombok.Data;

@Data
public class OrderRequest {
		
	private long id;
	
	private String username;
	
	private String artist;
	
	private String productId;
	
	private String title;
	
	private long qty;
	
	private long unitPrice;

//	private long id;
//	
//	private String itemName;
//	
//	private String itemDescribe;
//	
//	private long price;
}
