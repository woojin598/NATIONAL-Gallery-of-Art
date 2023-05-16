package kr.co.tj.orderservice.dto;

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
public class OrderResponse implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private long id;
	
	private String itemName;
	
	private String title;
	
	private String itemDescribe;
	
	private long price;
	
	private String staff;
	
	private Date createDate;
	
	private Date updateDate;

}