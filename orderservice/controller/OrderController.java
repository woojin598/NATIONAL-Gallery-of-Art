package kr.co.tj.orderservice.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
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

import kr.co.tj.orderservice.dto.OrderDTO;
import kr.co.tj.orderservice.dto.OrderRequest;
import kr.co.tj.orderservice.dto.OrderResponse;
import kr.co.tj.orderservice.service.OrderService;

@RestController
@RequestMapping("order-service")
public class OrderController {
	
	@Autowired
	public OrderService orderService;
	
	private Environment env;
	
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
		
		orderDTO = orderService.createOrder(orderDTO);
		
		OrderResponse orderResponse = orderDTO.toOrderResponse();
		
		return ResponseEntity.status(HttpStatus.CREATED).body(orderResponse);
	}
	
	@PutMapping("/orders/edit")
	public ResponseEntity<?> editOrder(@RequestBody OrderRequest orderRequest) {
		
		OrderDTO orderDTO = OrderDTO.toOrderDTO(orderRequest);
		
		orderDTO = orderService.editOrder(orderDTO);
		
		OrderResponse orderResponse = orderDTO.toOrderResponse();
		
		return ResponseEntity.status(HttpStatus.CREATED).body(orderResponse);
	}
	
	
	
	@DeleteMapping("/orders/delete/{id}")
	public ResponseEntity<?> delete(@RequestBody OrderDTO dto) {
		Map<String, Object> map = new HashMap<>();
		
		if (dto == null) {
			map.put("result", "잘못된 정보입니다.");
			return ResponseEntity.badRequest().body(map);
		}
		
		try {
			orderService.delete(dto);
			map.put("result", "삭제 성공");
			
			return ResponseEntity.ok().body(map);
		
		} catch (Exception e) {
			e.printStackTrace();
			map.put("result", "삭제 실패"); // 에러 500
			return ResponseEntity.badRequest().body(map);
		}		
	}
	
	@GetMapping("/health_check")
	public String status() {
		return "order service(장바구니) 입니다."+env.getProperty("local.server.port");
	}
}
