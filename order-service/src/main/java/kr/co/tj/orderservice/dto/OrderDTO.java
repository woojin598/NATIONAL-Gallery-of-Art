 package kr.co.tj.orderservice.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;

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
	
//	private String itemName;
	
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
				.productId(orderRequest.getProductId())
				.orderId(orderRequest.getOrderId())
				.artist(orderRequest.getArtist())
				.title(orderRequest.getTitle())
				.itemDescribe(orderRequest.getItemDescribe())
				.qty(orderRequest.getQty())
				.unitPrice(orderRequest.getUnitPrice())
				.username(orderRequest.getUsername())
				.totalPrice(orderRequest.getTotalPrice())
				.createDate(orderRequest.getCreateDate())
				.updateDate(orderRequest.getUpdateDate())
				.build();
	}
	
	public static OrderDTO toOrderDTO(OrderEntity orderEntity) {
		
		return OrderDTO.builder()
				.productId(orderEntity.getProductId())
				.orderId(orderEntity.getOrderId())
				.artist(orderEntity.getArtist())
				.title(orderEntity.getTitle())
				.itemDescribe(orderEntity.getItemDescribe())
				.qty(orderEntity.getQty())
				.unitPrice(orderEntity.getUnitPrice())
				.username(orderEntity.getUsername())//_0605 수정
				.totalPrice(orderEntity.getTotalPrice())
				.createDate(orderEntity.getCreateDate())
				.updateDate(orderEntity.getUpdateDate())
				.build();
	}
	
	public OrderResponse toOrderResponse() {
		
		return OrderResponse.builder()
				.username(username)//_0605 수정
				.orderId(orderId)
				.productId(productId)
				.artist(artist)
				.title(title)
				.qty(qty)
				.itemDescribe(itemDescribe)
				.unitPrice(unitPrice)
				.totalPrice(totalPrice)
				.createDate(createDate)
				.updateDate(updateDate)
				.build();
	}
	
	public OrderEntity toOrderEntity() {
		
		return OrderEntity.builder()
				.username(username)
				.orderId(orderId)
				.productId(productId)
				.artist(artist)
				.title(title)
				.qty(qty)
				.itemDescribe(itemDescribe)
				.unitPrice(unitPrice)
				.totalPrice(totalPrice)
				.createDate(createDate)
				.updateDate(updateDate)
				.build();
	}
	
	public void setId(UUID randomUUID) {
		this.id = id;
	}

}
