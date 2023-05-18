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
public class OrderDTO implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private String username;
	
	private String productId;
	
	private String orderId;
	
	private Long qty;
	
	private Long unitPrice;
	
	private Long totalPrice;
	
	private Date createAt;
	
	private Date updateAt;
	
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
				.username(orderRequest.getUsername())
				.productId(orderRequest.getProductId())
				.qty(orderRequest.getQty())
				.unitPrice(orderRequest.getUnitPrice())
				.build();
	}
	
	public static OrderDTO toOrderDTO(OrderEntity orderEntity) {
		
		return OrderDTO.builder()
				.username(orderEntity.getUsername())
				.productId(orderEntity.getProductId())
				.orderId(orderEntity.getOrderId())
				.qty(orderEntity.getQty())
				.unitPrice(orderEntity.getUnitPrice())
				.totalPrice(orderEntity.getTotalPrice())
				.createAt(orderEntity.getCreateAt())
				.updateAt(orderEntity.getUpdateAt())
				.build();
	}
	
	public OrderResponse toOrderResponse() {
		
		return OrderResponse.builder()
				.username(username)
				.createAt(createAt)
				.orderId(orderId)
				.productId(productId)
				.qty(qty)
				.totalPrice(totalPrice)
				.unitPrice(unitPrice)
				.updateAt(updateAt)
				.build();
	}
	
//	public OrderDTO toOrderDTO() {
//		
//		return OrderDTO.builder()
//				.id(id)
//				.itemName(itemName)
//				.title(title)
//				.itemDescribe(itemDescribe)
//				.price(price)
//				.staff(staff)
//				.createDate(createDate)
//				.updateDate(updateDate)
//				.build();
//	}
	public OrderEntity toOrderEntity() {
		
		return OrderEntity.builder()
				.username(username)
				.productId(productId)
				.orderId(orderId)
				.qty(qty)
				.unitPrice(unitPrice)
				.totalPrice(totalPrice)
				.createAt(createAt)
				.updateAt(updateAt)
				.build();
	}
	

}
