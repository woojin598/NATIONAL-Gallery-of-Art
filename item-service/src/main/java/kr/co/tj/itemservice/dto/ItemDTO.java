package kr.co.tj.itemservice.dto;

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
public class ItemDTO implements Serializable{

	private static final long serialVersionUID = 1L;

	private String artist;

	private String title;
	
	private String itemDescribe;
	
	private Long price;
	
	private Date createDate;
	
	private Date updateDate;
	
	
	public ItemEntity toItemEntity() {
		 return ItemEntity.builder()
				.artist(artist)
				.title(title)
				.itemDescribe(itemDescribe)
				.price(price)
				.createDate(createDate)
				.updateDate(updateDate)
				.build();
	}
	
	public static ItemDTO toItemDTO(ItemRequest itemRequest) {
		
		   return ItemDTO.builder()
				.artist(itemRequest.getArtist())
				.title(itemRequest.getTitle())
				.itemDescribe(itemRequest.getItemDescribe())
				.price(itemRequest.getPrice())
				.build();

       }
	
	public ItemResponse toItemResponse() {
		
		return ItemResponse.builder()
				.artist(artist)
				.title(title)
				.itemDescribe(itemDescribe)
				.price(price)
				.createDate(createDate)
				.updateDate(updateDate)
				.build();
	
	}
	
	public static ItemDTO toItemDTO(ItemEntity entity) {
	    ItemDTO dto = new ItemDTO();
	    dto.setArtist(entity.getArtist());
	    dto.setTitle(entity.getTitle());
	    dto.setItemDescribe(entity.getItemDescribe());
	    dto.setPrice(entity.getPrice());
	    return dto;
	}

	
}