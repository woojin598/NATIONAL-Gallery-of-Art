package kr.co.tj.orderservice.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDTO implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private long id;
	
	private String itemName;
	
	private String username;
	
	private String orderId;
	
	private String productId;
	
	private String artist;
	
	private String title;
	
	private String itemDescribe;

	private Long qty;
	
	private Long unitPrice;
	
	private Long totalPrice;
	
	private Date createDate;
	
	private Date updateDate;
	
//	private Long id;
//	
//	private String itemName;
//	
//	private String title;
//	
//	private String itemDescribe;
//	
//	private Long price;
//	
//	private String staff;
//	
//	private Date createDate;
//	
//	private Date updateDate;
	
	public static OrderDTO toOrderDTO(OrderRequest orderRequest) {
		
		return OrderDTO.builder()
				.artist(orderRequest.getArtist())
				.title(orderRequest.getTitle())			
				.qty(orderRequest.getQty())
				.unitPrice(orderRequest.getUnitPrice())
				.build();
	}
	
	public static OrderDTO toOrderDTO(OrderEntity orderEntity) {
		
		return OrderDTO.builder()
				.artist(orderEntity.getArtist())
				.title(orderEntity.getTitle())
				.itemDescribe(orderEntity.getItemDescribe())
				.unitPrice(orderEntity.getUnitPrice())
				.build();
	}
	
	public OrderResponse toOrderResponse() {
		
		return OrderResponse.builder()
				.artist(artist)
				.title(title)

				.itemDescribe(itemDescribe)
				.totalPrice(totalPrice)
				.unitPrice(unitPrice)
				
				.createAt(createDate)
				.updateAt(updateDate)
				.build();
	}
	
	public OrderEntity toOrderEntity() {
		
		return OrderEntity.builder()
				.artist(artist)
				.title(title)
				.itemDescribe(itemDescribe)
				.unitPrice(unitPrice)
				.createDate(createDate)
				.updateDate(updateDate)
				.build();
	}
	
	public void setId(UUID randomUUID) {
		this.id = id;
	}

}
