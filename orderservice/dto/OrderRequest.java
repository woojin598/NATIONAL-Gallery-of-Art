package kr.co.tj.orderservice.dto;

import lombok.Data;

@Data
public class OrderRequest {
	
	private String username;
	
	private String productId;
	
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
