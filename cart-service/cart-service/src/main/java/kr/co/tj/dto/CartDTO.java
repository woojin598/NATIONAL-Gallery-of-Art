package kr.co.tj.dto;

import java.io.Serializable;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartDTO implements Serializable {/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String id;
	private String itemName;
	private long qty; // 상품수량
	private long unitPrice; // 개별가격
	private long totalPrice; // 합산가격
	private Date createDate; // 데이터생성일시
	private Date updateDate; // 업데이트일시

	public CartEntity toEntity() {
		return CartEntity.builder()
			.id(id)
			.itemName(itemName)
			.qty(qty)
			.unitPrice(unitPrice)
			.totalPrice(totalPrice)
			.createDate(createDate)
			.updateDate(updateDate)
			.build();
	}

	public CartEntity toCartEntity() {
		// TODO Auto-generated method stub
		return null;
	}

	public static CartDTO fromEntity(CartEntity cartEntity) {
		 CartDTO cartDTO = new CartDTO();
	        // CartEntity의 필드 값을 CartDTO의 필드에 복사하는 로직 작성
	        cartDTO.setId(cartEntity.getId());
	        cartDTO.setItemName(cartEntity.getItemName());
	        cartDTO.setQty(cartEntity.getQty());
	        // ...
	        return cartDTO;
	}
	public CartEntity toCartEntity() {
	    return CartEntity.builder()
	            .id(id)
	            .itemName(itemName)
	            .qty(qty)
	            .unitPrice(unitPrice)
	            .totalPrice(totalPrice)
	            .createDate(createDate)
	            .updateDate(updateDate)
	            .build();
	}

}
