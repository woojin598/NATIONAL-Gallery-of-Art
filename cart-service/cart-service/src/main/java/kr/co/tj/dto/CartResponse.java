package kr.co.tj.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartResponse {
	private Long id;
    private String itemName;
    private Long qty;
    private Long unitPrice;
    private Long totalPrice;
    private String message; //사용자에게 전달할 메세지를 담을 수 있습니다

}
