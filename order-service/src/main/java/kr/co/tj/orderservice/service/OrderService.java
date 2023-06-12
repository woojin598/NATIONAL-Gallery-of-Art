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
import kr.co.tj.orderservice.dto.OrderRequest;
import kr.co.tj.orderservice.dto.OrderResponse;
import kr.co.tj.orderservice.jpa.OrderRepository;
import kr.co.tj.orderservice.sec.TokenProvider;

@Service
public class OrderService {
	
	@Autowired
	private OrderRepository orderRepository;

	
//	@Autowired
//	private TokenProvider tokenProvider;
	
//	@Autowired
//	private BCryptPasswordEncoder passwordEncoder;
	
	
	//주문 생성
	public OrderDTO createOrder(OrderDTO orderDTO) {

		orderDTO = getDate(orderDTO);
		
		OrderEntity orderEntity = orderDTO.toOrderEntity();
		orderDTO.setTotalPrice(orderDTO.getUnitPrice() * orderDTO.getQty());
		
//		orderDTO.setCreateDate(nowDate);
//		orderDTO.setUpdateDate(nowDate);
		
		
		orderEntity = orderRepository.save(orderEntity);
				
//		String result = orderFeign.updateStockByProductId(orderResponse);
//		
//		if(result.startsWith("0")) {
//			orderRepository.delete(orderEntity);
//			
//			return null;
//		}
		 
		return orderDTO.toOrderDTO(orderEntity);
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
	
	//날짜 생성
	private OrderDTO getDate(OrderDTO orderDTO) {
		Date date = new Date();
		
		if(orderDTO.getCreateDate() == null) {
			orderDTO.setCreateDate(date);
		}
		
		orderDTO.setUpdateDate(date);
		
		return orderDTO;
	}
	
	//주문목록가져오기(username)_0605 수정
	public List<OrderDTO> getOrdersByUsername(String username) {
		List<OrderEntity> dbList = orderRepository.findByUsername(username);
		List<OrderDTO> list = new ArrayList<>();
		
		for(OrderEntity x : dbList) {
			OrderDTO orderDTO = OrderDTO.toOrderDTO(x);
			list.add(orderDTO);
		}
		
		return list;
	}
	

	public List<OrderDTO> getOrdersByItem(String orderid) {
		List<OrderEntity> dbList = orderRepository.findByUsername(orderid);
		List<OrderDTO> list = new ArrayList<>();
		
		for(OrderEntity x : dbList) {
			OrderDTO orderDTO = OrderDTO.toOrderDTO(x);
			list.add(orderDTO);
		}
		
		return list;
	}
	
//	// 주문 정보 수정
//	@Transactional
//	public OrderDTO editOrder(OrderDTO orderDTO) {
//		OrderEntity orderEntity = orderRepository.findByOrderId(orderDTO.getOrderId());
//		
//		if (orderEntity == null) {
//			throw new RuntimeException("주문 정보가 잘못됐습니다...");
//		}
//		
////		if (!passwordEncoder.matches(orderDTO.getPassword, null)) {
////			
////		}
//		
//		orderEntity.setUnitPrice(orderDTO.getUnitPrice() - (orderDTO.getUnitPrice() - (orderDTO.getQty() * orderDTO.getUnitPrice())));
//		orderEntity.setTotalPrice(orderDTO.getUnitPrice() * orderDTO.getQty());
//		
//		return orderDTO;
//	}
	

	
	
	public OrderEntity getByCredentials(String orderId) {
		return orderRepository.findByOrderId(orderId);
	}

	//삭제
	@Transactional
	public void delete(Long id) {
		 orderRepository.deleteById(id);		
	}
	
	//수정
	@Transactional
	public String updateItemByTitle(OrderEntity orderEntity) {
		
		try {
			OrderEntity existingItem = orderRepository.findByProductId(orderEntity.getProductId());
			
			if(existingItem == null) {
				return "failed";
			}
			
			existingItem.setArtist(orderEntity.getArtist());
			existingItem.setItemDescribe(orderEntity.getItemDescribe());
			existingItem.setQty(orderEntity.getQty());
			orderEntity.setUnitPrice(orderEntity.getUnitPrice());
			existingItem.setTotalPrice(orderEntity.getUnitPrice() * orderEntity.getQty());
			existingItem.setUpdateDate(new Date());
			
			orderRepository.save(existingItem);
			
			return "ok";
		} catch (Exception e) {
			e.printStackTrace();
			return "failed";
		}
	}

	
}
