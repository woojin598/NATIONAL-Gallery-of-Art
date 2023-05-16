package kr.co.tj.orderservice.dto;

import lombok.Data;

@Data
public class OrderRequest {

	private long id;
	
	private String itemName;
	
	private String itemDescribe;
	
	private long price;
}
