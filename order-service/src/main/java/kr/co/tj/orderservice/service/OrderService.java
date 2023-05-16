package kr.co.tj.orderservice.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.tj.orderservice.dto.OrderDTO;
import kr.co.tj.orderservice.dto.OrderEntity;
import kr.co.tj.orderservice.dto.OrderResponse;
import kr.co.tj.orderservice.feign.OrderFeign;
import kr.co.tj.orderservice.jpa.OrderRepository;

@Service
public class OrderService {
	
	@Autowired
	private OrderRepository orderRepository;
	
	@Autowired
	private OrderFeign orderFeign;
	
	public OrderDTO createOrder(OrderDTO orderDTO) {
		
		orderDTO = getDate(orderDTO);
		
		OrderEntity orderEntity = orderDTO.toOrderEntity();
		
		orderEntity = orderRepository.save(orderEntity);
		
		OrderResponse orderResponse = orderDTO.toOrderResponse();
		
		String result = orderFeign.updateStockById(orderResponse);
		
		if(result.startsWith("0")) {
			orderRepository.delete(orderEntity);
			
			return null;
		}
		return orderDTO;
	}
	
	private OrderDTO getDate(OrderDTO orderDTO) {
		Date now = new Date();
		
		if(orderDTO.getCreateDate() == null) {
			orderDTO.setCreateDate(now);
		}
		
		orderDTO.setUpdateDate(now);
		
		return orderDTO;
	}

	public List<OrderDTO> getOrdersByItem(String itemName) {
		List<OrderEntity> dbList = orderRepository.findByitemName(itemName);
		List<OrderDTO> list = new ArrayList<>();
		
		for(OrderEntity x : dbList) {
			OrderDTO orderDTO = OrderDTO.toOrderDTO(x);
			list.add(orderDTO);
		}
		
		return list;
	}

//	public OrderDTO deleteById(long id) {
//		
//		delete
//		
//		
//		return orderDTO;
//	}
}
