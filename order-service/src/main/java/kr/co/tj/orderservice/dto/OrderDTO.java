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
	
	private Long id;
	
	private String itemName;
	
	private String title;
	
	private String itemDescribe;
	
	private Long price;
	
	private String staff;
	
	private Date createDate;
	
	private Date updateDate;
	
	public static OrderDTO toOrderDTO(OrderRequest orderRequest) {
		
		return OrderDTO.builder()
				.id(orderRequest.getId())
				.itemName(orderRequest.getItemName())
				.itemDescribe(orderRequest.getItemDescribe())
				.price(orderRequest.getPrice())
				.build();
	}
	
	public static OrderDTO toOrderDTO(OrderEntity orderEntity) {
		
		return OrderDTO.builder()
				.id(orderEntity.getId())
				.itemName(orderEntity.getItemName())
				.title(orderEntity.getTitle())
				.itemDescribe(orderEntity.getItemDescribe())
				.price(orderEntity.getPrice())
				.createDate(orderEntity.getCreateDate())
				.updateDate(orderEntity.getUpdateDate())
				.build();
	}
	
	public OrderResponse toOrderResponse() {
		
		return OrderResponse.builder()
				.id(id)
				.itemName(itemName)
				.title(title)
				.itemDescribe(itemDescribe)
				.price(price)
				.staff(staff)
				.createDate(createDate)
				.updateDate(updateDate)
				.build();
	}
	
	public OrderDTO toOrderDTO() {
		
		return OrderDTO.builder()
				.id(id)
				.itemName(itemName)
				.title(title)
				.itemDescribe(itemDescribe)
				.price(price)
				.staff(staff)
				.createDate(createDate)
				.updateDate(updateDate)
				.build();
	}
	public OrderEntity toOrderEntity() {
		
		return OrderEntity.builder()
				.id(id)
				.itemName(itemName)
				.title(title)
				.itemDescribe(itemDescribe)
				.price(price)
				.staff(staff)
				.createDate(createDate)
				.updateDate(updateDate)
				.build();
	}
	

}
