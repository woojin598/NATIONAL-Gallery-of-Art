package kr.co.tj.orderservice.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.tj.orderservice.dto.OrderDTO;
import kr.co.tj.orderservice.dto.OrderRequest;
import kr.co.tj.orderservice.dto.OrderResponse;
import kr.co.tj.orderservice.service.OrderService;

@RestController
@RequestMapping("order-service")
public class OrderController {
	
	@Autowired
	public OrderService orderService;
	
	@GetMapping("/orders/user/{username}")
	public ResponseEntity<?> getOrdersByItem(@PathVariable String itemName) {
		
		List<OrderDTO> list = orderService.getOrdersByItem(itemName);
		
		List<OrderResponse> responseList = new ArrayList<>();
		
		for(OrderDTO orderDTO : list) {
			OrderResponse orderResponse = orderDTO.toOrderResponse();
			responseList.add(orderResponse);
		}
		return ResponseEntity.status(HttpStatus.OK).body(responseList);
	}

	@PostMapping("/orders")
	public ResponseEntity<?> createOrder(@RequestBody OrderRequest orderRequest) {
		
		OrderDTO orderDTO = OrderDTO.toOrderDTO(orderRequest);
		
		//orderDTO = orderService.createOrder(orderDTO);
		
		OrderResponse orderResponse = orderDTO.toOrderResponse();
		
		return ResponseEntity.status(HttpStatus.CREATED).body(orderResponse);
	}
	
//	@DeleteMapping("/orders/delete")
//	public ResponseEntity<?> delete(@PathVariable("id") long id) {
//		
//		OrderDTO orderDTO = orderService.deleteById(id);
//		
//		if(orderDTO == null) {
//			return ResponseEntity.notFound().build();
//			
//			return ResponseEntity.ok(orderDTO);
//		}
//	}
	
	@GetMapping("/health_check")
	public String status() {
		return "order service입니다.";
	}
}
