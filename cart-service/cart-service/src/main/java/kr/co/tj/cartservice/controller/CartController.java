package kr.co.tj.cartservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.tj.cartservice.service.CartService;
import kr.co.tj.dto.CartDTO;
import kr.co.tj.dto.CartRequest;
import kr.co.tj.dto.CartResponse;

@RestController
@RequestMapping("/cart")
public class CartController {
	@Autowired
	private CartService cartService;

	@PostMapping("/add")
	public ResponseEntity<CartResponse> addToCart(@RequestBody CartRequest cartRequest) {
		CartDTO cartDTO = CartDTO.builder()
				.itemName(cartRequest.getItemName())
				.qty(cartRequest.getQty())
				.unitPrice(cartRequest.getUnitPrice())
				.build();

		CartDTO addedCartItem = cartService.addToCart(cartDTO);

		CartResponse response = CartResponse.builder()
				.id(addedCartItem.getId())
				.itemName(addedCartItem.getItemName())
				.qty(addedCartItem.getQty())
				.unitPrice(addedCartItem.getUnitPrice())
				.totalPrice(addedCartItem.getTotalPrice())
				.build();

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@DeleteMapping("/delete/{itemId}")
	public ResponseEntity<CartResponse> deleteFromCart(@PathVariable Long itemId) {
		cartService.deleteFromCart(itemId);

		CartResponse response = CartResponse.builder()
				.message("Item successfully deleted from cart.")
				.build();

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@PutMapping("/update/{itemId}")
	public ResponseEntity<CartResponse> updateCart(@PathVariable Long itemId, @RequestBody CartRequest cartRequest) {
		cartService.updateCart(itemId, cartRequest.getQty());

		CartResponse response = CartResponse.builder()
				.message("Cart updated successfully.")
				.build();

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@GetMapping("/items")
	public ResponseEntity<CartResponse> getCartItems() {
		CartResponse response = CartResponse.builder()
				.message("Cart items retrieved successfully.")
				.build();

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@DeleteMapping("/clear")
	public ResponseEntity<CartResponse> clearCart() {
		cartService.clearCart();

		CartResponse response = CartResponse.builder()
				.message("Cart cleared successfully.")
				.build();

		return new ResponseEntity<>(response, HttpStatus.OK);
	}
}

