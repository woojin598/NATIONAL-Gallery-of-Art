package kr.co.tj.orderservice.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.modelmapper.ModelMapper;
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
import kr.co.tj.orderservice.dto.OrderEntity;
import kr.co.tj.orderservice.dto.OrderRequest;
import kr.co.tj.orderservice.dto.OrderResponse;
import kr.co.tj.orderservice.service.OrderService;

@RestController
@RequestMapping("/order-service")
public class OrderController {
	
	@Autowired
	private Environment env;
	
	@Autowired
	public OrderService orderService;
	
	
	//주문 보기(username)_0605 수정
	@GetMapping("/orders/detail/{username}")
	public ResponseEntity<?> getOrdersByUsername(@PathVariable() String username) {
		
		List<OrderDTO> orderlist = orderService.getOrdersByItem(username);	
		List<OrderResponse> result = new ArrayList<>();
		
		for (OrderDTO orderDTO : orderlist) {
			OrderResponse orderResponse = orderDTO.toOrderResponse();
			result.add(orderResponse);
		}
		

		return ResponseEntity.status(HttpStatus.OK).body(result);
	}

	
	//주문 보기
	@GetMapping("/orders/user1/{username}")
	public ResponseEntity<List<OrderResponse>> getOrders(@PathVariable String username) {
		
		List<OrderDTO> orderlist = orderService.getOrdersByItem(username);
		
		List<OrderResponse> result = new ArrayList<>();
		
		orderlist.forEach(x -> {
			result.add(new ModelMapper().map(x, OrderResponse.class));
		});
		
//		for(OrderDTO orderDTO : list) {
//			OrderResponse orderResponse = orderDTO.toOrderResponse();
//			responseList.add(orderResponse);
//		}
		
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}

	
	// 주문 생성
	@PostMapping("/orders")
	public ResponseEntity<?> createOrder(@RequestBody OrderRequest orderRequest) {
		
		OrderDTO orderDTO = OrderDTO.toOrderDTO(orderRequest);
		String orderId = UUID.randomUUID().toString();
		orderDTO.setOrderId(orderId);
		
		orderDTO = orderService.createOrder(orderDTO);
		
		OrderResponse orderResponse = orderDTO.toOrderResponse();
		
		Date date = new Date();
		
		date = orderResponse.getCreateDate();
		date = orderResponse.getUpdateDate();
		
		return ResponseEntity.status(HttpStatus.CREATED).body(orderResponse);
	}
	
	// 주문 수정
	  @PutMapping("/orders/edit") 
	  public ResponseEntity<?> editOrder(@RequestBody OrderResponse orderResponse) {
	  
	  OrderEntity orderEntity = orderService.getByCredentials(orderResponse.getOrderId());
	  
	  if(orderEntity == null) { 
		  
		  return ResponseEntity.status(HttpStatus.OK).body("등록되지 않은 작품입니다."); }
	  
	  String result;
	  
	  try {
	  
	  orderEntity.setQty(orderResponse.getQty());
	  orderEntity.setUnitPrice(orderResponse.getUnitPrice());
	  orderEntity.setTotalPrice(orderResponse.getQty() * orderResponse.getUnitPrice());
	  
	  Date date = new Date();
		
	  date = orderResponse.getUpdateDate();
		
	  
	  result = orderService.updateItemByTitle(orderEntity);
	  
	  if(result.equalsIgnoreCase("ok")) {
		  return ResponseEntity.status(HttpStatus.OK).body("1:성공"); 
		  
		  } else { 
			 
			  return ResponseEntity.status(HttpStatus.OK).body("0:갱신 실패"); }
	  
	  } catch (Exception e) { 
		  return ResponseEntity.status(HttpStatus.OK).body("0:갱신 실패"); 
		  
	  }
	}
	
	//주문 삭제
	@DeleteMapping("/orders/delete/{id}")
	public void delete(@PathVariable Long id) {

		orderService.delete(id);
	}
	
	@GetMapping("/health_check")
	public String status() {
		return "order service(장바구니) 입니다."+env.getProperty("local.server.port");
	}
}
