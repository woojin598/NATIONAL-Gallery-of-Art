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
public class ItemResponse implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	private String itemName;
	
	private long id;
	
	private Long stock;
	
	private Long unitPrice;
	
	private Date createAt;
	
	private long qty;

}
