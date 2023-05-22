package kr.co.tj.cartservice.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.tj.cartservice.jpa.CartRepository;
import kr.co.tj.dto.CartDTO;
import kr.co.tj.dto.CartEntity;

@Service
public class CartService {
	@Autowired
	private CartRepository cartRepository;


	// 아이템을 장바구니에 추가하는 로직
	public CartDTO addToCart(CartDTO cartDTO) {

		// CartDTO를 CartEntity로 변환
		CartEntity cartEntity = cartDTO.toCartEntity();

		// 필요한 계산을 수행하여 총 가격 등을 업데이트
		cartEntity.setTotalPrice(cartEntity.getUnitPrice() * cartEntity.getQty());

		// 카트를 저장하고 저장된 엔티티를 반환
		cartEntity = cartRepository.save(cartEntity);

		// 저장된 엔티티를 CartDTO로 변환하여 반환
		return CartDTO.fromEntity(cartEntity);
	}

	public List<CartDTO> deleteFromCart(Long itemId) {
	    Optional<CartEntity> cartEntityOptional = cartRepository.findById(itemId);
	    if (cartEntityOptional.isPresent()) {
	        CartEntity cartEntity = cartEntityOptional.get();
	        cartRepository.delete(cartEntity);
	    }
	    
	    // 장바구니에 남아 있는 아이템들을 조회하여 totalPrice 업데이트
	    List<CartEntity> cartEntities = cartRepository.findAll();
	    for (CartEntity cartEntity : cartEntities) {
	        long totalPrice = cartEntity.getQty() * cartEntity.getUnitPrice();
	        cartEntity.setTotalPrice(totalPrice);
	    }
	    
	    // 업데이트된 아이템들을 CartDTO로 변환하여 반환
	    return cartEntities.stream()
	            .map(CartDTO::fromEntity)
	            .collect(Collectors.toList());
	}

	public void updateCart(Long itemId, int quantity) {
	    Optional<CartEntity> cartEntityOptional = cartRepository.findById(itemId);
	    if (cartEntityOptional.isPresent()) {
	        CartEntity cartEntity = cartEntityOptional.get();
	        
	        // 아이템 수량 또는 가격 업데이트(수정) 로직을 수행
	        cartEntity.setQty(quantity);
	        cartEntity.setTotalPrice(cartEntity.getUnitPrice() * quantity);
	        
	        // 업데이트된 정보를 저장
	        cartRepository.save(cartEntity);
	    } else {
	        // 아이템이 존재하지 않을 경우 예외 처리 또는 오류 메시지 등을 수행
	        throw new IllegalArgumentException("Item not found in the cart.");
	    }
	}

	        // 카트에 담긴 아이템 목록을 조회하는 로직
	 public   List<CartDTO> getCartItems() {
		 
		  // 카트에 담긴 아이템 목록을 조회하는 로직
		    List<CartEntity> cartEntities = cartRepository.findAll();

		    for (CartEntity cartEntity : cartEntities) {
		        long totalPrice = cartEntity.getTotalPrice();
		        long quantity = cartEntity.getQty();

		        System.out.println("Total Price: " + totalPrice);
		        System.out.println("Quantity: " + quantity);
		    }

		    // 조회된 아이템 목록을 CartDTO로 변환하여 반환
		    return cartEntities.stream()
		            .map(CartDTO::fromEntity)
		            .collect(Collectors.toList());
		}
	 public void clearCart() {
		    // 모든 아이템을 한 번에 삭제
		    cartRepository.deleteAll();
		    
		    // 비워진 장바구니를 저장 (옵셔널)
		    cartRepository.saveAll(getCartItems());
}
}