package kr.co.tj.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartRequest {
//		private String id;
	    private String itemName;
	    private long qty;
	    private long unitPrice;
//	    private long totalPrice;
}
