package kr.co.tj.orderservice.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import kr.co.tj.orderservice.dto.OrderDTO;
import kr.co.tj.orderservice.dto.OrderEntity;
import kr.co.tj.orderservice.dto.OrderResponse;
import kr.co.tj.orderservice.feign.OrderFeign;
import kr.co.tj.orderservice.jpa.OrderRepository;
import kr.co.tj.orderservice.sec.TokenProvider;

@Service
public class OrderService {
	
	@Autowired
	private OrderRepository orderRepository;
	
	@Autowired
	private TokenProvider tokenProvider;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	@Autowired
	private OrderFeign orderFeign;
	
	
	public OrderDTO createOrder(OrderDTO orderDTO) {
		
		orderDTO = getDate(orderDTO);
		
		orderDTO.setOrderId(UUID.randomUUID().toString());
		
		orderDTO.setTotalPrice(orderDTO.getUnitPrice() * orderDTO.getQty());
		
		OrderEntity orderEntity = orderDTO.toOrderEntity();
		orderEntity = orderRepository.save(orderEntity);
		
		OrderResponse orderResponse = orderDTO.toOrderResponse();
		
		String result = orderFeign.updateStockByProductId(orderResponse);
		
		if(result.startsWith("0")) {
			orderRepository.delete(orderEntity);
			
			return null;
		}
		 
		return orderDTO;
	}
	
//	public OrderDTO editOrder(OrderDTO orderDTO) {
//		
//		orderDTO = getDate(orderDTO);
//		
//		orderDTO.getItemName();
//		orderDTO.getProductId();
//		
//		orderDTO.setUnitPrice(orderDTO.getUnitPrice());
//		
//		orderDTO.setTotalPrice(orderDTO.getUnitPrice() * orderDTO.getQty());
//		
//		OrderEntity orderEntity = orderDTO.toOrderEntity();
//		orderEntity = orderRepository.save(orderEntity);
//		
//		OrderResponse orderResponse = orderDTO.toOrderResponse();
//		
//		String result = orderFeign.updateStockByProductId(orderResponse);
//		
//		if(result.startsWith("0")) {
//			orderRepository.delete(orderEntity);
//			
//			return null;
//		}
//		
//		return orderDTO;
//	}
	
	private OrderDTO getDate(OrderDTO orderDTO) {
		Date now = new Date();
		
		if(orderDTO.getCreateDate() == null) {
			orderDTO.setCreateDate(now);
		}
		
		orderDTO.setUpdateDate(now);
		
		return orderDTO;
	}

	public List<OrderDTO> getOrdersByItem(String itemName) {
		List<OrderEntity> dbList = orderRepository.findByUsername(itemName);
		List<OrderDTO> list = new ArrayList<>();
		
		for(OrderEntity x : dbList) {
			OrderDTO orderDTO = OrderDTO.toOrderDTO(x);
			list.add(orderDTO);
		}
		
		return list;
	}
	
	// 주문 정보 수정
	@Transactional
	public OrderDTO editOrder(OrderDTO orderDTO) {
		OrderEntity orderEntity = orderRepository.findByOrderId(orderDTO.getOrderId());
		
		if (orderEntity == null) {
			throw new RuntimeException("주문 정보가 잘못됐습니다...");
		}
		
//		if (!passwordEncoder.matches(orderDTO.getPassword, null)) {
//			
//		}
		
		orderEntity.setUnitPrice(orderDTO.getUnitPrice() - (orderDTO.getUnitPrice() - (orderDTO.getQty() * orderDTO.getUnitPrice())));
		orderEntity.setTotalPrice(orderDTO.getUnitPrice() * orderDTO.getQty());
		
		return orderDTO;
	}
	
	public OrderEntity getItemByTitle(String title) {
		// TODO Auto-generated method stub
		return orderRepository.findByTitle(title);
	}
	
	//삭제
	public OrderEntity getByCredentials(String productId) {
		return orderRepository.findByProdutId(productId);
	}

	//삭제
	@Transactional
	public void delete(OrderDTO orderDTO) {
		OrderEntity orderEntity = getByCredentials(orderDTO.getProductId());
		
		if (orderEntity == null) {
			throw new RuntimeException("상품 정보가 잘못됐습니다...");
		}
		
		if (!passwordEncoder.matches(orderDTO.getOrderId(), orderEntity.getOrderId())) {
			throw new RuntimeException();
			
		}
		
		orderRepository.delete(orderEntity);
	}
	
}
