package kr.co.tj.itemservice.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import feign.FeignException;
import kr.co.tj.itemservice.dto.ItemDTO;
import kr.co.tj.itemservice.dto.ItemEntity;
import kr.co.tj.itemservice.dto.ItemRequest;
import kr.co.tj.itemservice.dto.ItemResponse;
import kr.co.tj.itemservice.dto.ReplyRequest;
import kr.co.tj.itemservice.dto.ReplyResponse;
import kr.co.tj.itemservice.feign.ReplyFeign;
import kr.co.tj.itemservice.service.ItemService;

@RestController
@RequestMapping("/item-service")
public class ItemController {

	@Autowired
	private Environment env;

	@Autowired
	private ReplyFeign replyFeign;

	@Autowired
	private ItemService itemService;

	@Autowired
	public ItemController(ReplyFeign replyFeign, ItemService itemService) {
		this.replyFeign = replyFeign;
		this.itemService = itemService;
	}

	public ItemController(ItemService itemService) {
		this.itemService = itemService;
	}

	// 검색기능
	@GetMapping("/search")
	public List<Map<String, Object>> searchItems(@RequestParam(value = "search") String searchTerm) {
		List<ItemDTO> itemList = itemService.searchItems(searchTerm);

		List<Map<String, Object>> result = new ArrayList<>();
		for (ItemDTO dto : itemList) {
			Map<String, Object> item = new HashMap<>();
			item.put("artist", dto.getArtist());
			item.put("title", dto.getTitle());
			item.put("itemDescribe", dto.getItemDescribe());
			item.put("price", dto.getPrice());
			item.put("createDate", dto.getCreateDate());
			item.put("updateDate", dto.getUpdateDate());
			result.add(item);
		}

		return result;
	}

	@GetMapping("/list")
	public ResponseEntity<?> list(int pageNum) {
		Map<String, Object> map = new HashMap<>();
		Page<ItemDTO> page = itemService.findAll(pageNum);
		map.put("result", page);

		return ResponseEntity.ok().body(map);
	}

	@PutMapping("/items/updateitem")
	public ResponseEntity<?> updateItemByTitle(@RequestBody ItemResponse itemResponse) {

		ItemEntity itemEntity = itemService.getItemByTitle(itemResponse.getTitle());

		if (itemEntity == null) {
			return ResponseEntity.status(HttpStatus.OK).body("등록되지 않은 작품이에요.");
		}

		String result;

		try {
			// Update the fields of itemEntity with the values from itemResponse
			itemEntity.setArtist(itemResponse.getArtist());
			itemEntity.setItemDescribe(itemResponse.getItemDescribe());
			itemEntity.setPrice(itemResponse.getPrice());
			itemEntity.setUpdateDate(new Date());

			result = itemService.updateItemByTitle(itemEntity);

			if (result.equalsIgnoreCase("ok")) {
				return ResponseEntity.status(HttpStatus.OK).body("1:성공");
			} else {
				return ResponseEntity.status(HttpStatus.OK).body("0:갱신 실패");
			}

		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.OK).body("0:갱신 실패");
		}

	}

	@GetMapping("/items/all")
	public ResponseEntity<?> findAll() {

		try {
			List<ItemDTO> list = itemService.findAll();
			return ResponseEntity.ok().body(list);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return ResponseEntity.badRequest().body("에러 발생");
		}
	}

	@GetMapping("/items/{id}")
	public ResponseEntity<?> findById(@PathVariable("id") Long id) {
		Map<String, Object> map = new HashMap<>();

		if (id == null) {
			map.put("result", "잘못된 정보입니다.");
			return ResponseEntity.badRequest().body(map);
		}

		try {
			ItemDTO dto = itemService.findById(id);
			map.put("result", dto);

			return ResponseEntity.ok().body(map);

		} catch (Exception e) {
			e.printStackTrace();
			map.put("result", "가져오기에 실패");

			return ResponseEntity.badRequest().body(map);
		}

	}

	 @PostMapping("/items")
     public ResponseEntity<?> createitem(@RequestBody ItemRequest itemRequest){
    
    ItemDTO itemDTO = ItemDTO.toItemDTO(itemRequest);
    
    itemDTO = itemService.createItem(itemDTO);
    
    ItemResponse itemResponse = itemDTO.toItemResponse();
    
    return ResponseEntity.status(HttpStatus.CREATED).body(itemResponse);
        
  }

	@DeleteMapping("")
	public ResponseEntity<?> delete(@RequestBody ItemDTO dto) {
		if (dto == null || dto.getTitle() == null) {
			return ResponseEntity.badRequest().body("잘못된 정보입니다.");
		}

		try {
			itemService.delete(dto.getTitle());
			return ResponseEntity.ok().body("삭제 성공");
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().body("삭제 실패");
		}
	}

	@GetMapping("/health_check")
	public String status() {
		return "item service입니다" + env.getProperty("local.server.port") + env.getProperty("data.test");
	}

	@PostMapping("/items/{id}/reply") // 댓글작성
	public ResponseEntity<?> createReply(@PathVariable("id") Long itemId, @RequestBody ReplyRequest replyRequest) {
		Map<String, Object> response = new HashMap<>();

		try {
			// Item 서비스에서 아이템 조회
			ItemDTO itemDTO = itemService.findById(itemId); // 아이템이 존재하는 경우
			// Reply 서비스로 댓글 작성 요청
			ResponseEntity<?> replyResponse = replyFeign.insert(replyRequest);
			if (replyResponse.getStatusCode().is2xxSuccessful()) {
				response.put("message", "댓글이 작성되었습니다.");
				return ResponseEntity.ok(response);
			} else {
				response.put("message", "댓글 작성에 실패했습니다.");
				return ResponseEntity.badRequest().body(response);
			}
		} catch (RuntimeException e) {
			response.put("message", "아이템을 찾을 수 없습니다."); // 아이템이 존재하지 않을 경우
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		} catch (Exception e) {
			response.put("message", "댓글 작성 중 오류가 발생했습니다.");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}
	}

	@PutMapping("/items/{id}/reply/{replyId}") // 댓글 수정
	public ResponseEntity<?> updateReply(@PathVariable("id") Long itemId, @PathVariable("replyId") Long replyId,
			@RequestBody ReplyRequest replyRequest) {
		Map<String, Object> response = new HashMap<>();

		try {
			// Item 서비스에서 아이템 조회
			ItemDTO itemDTO = itemService.findById(itemId); // 아이템이 존재하는 경우
			// Reply 서비스로 댓글 수정 요청
			ReplyResponse replyResponse = ReplyResponse.builder().id(replyId).bid(itemId)
					.username(replyRequest.getUsername()).comment(replyRequest.getComment()).build();
			ResponseEntity<?> replyUpdateResponse = replyFeign.update(replyRequest.getUsername(), replyResponse);
			if (replyUpdateResponse.getStatusCode().is2xxSuccessful()) {
				response.put("message", "댓글이 수정되었습니다.");
				return ResponseEntity.ok(response);
			} else {
				response.put("message", "댓글 수정에 실패했습니다.");
				return ResponseEntity.badRequest().body(response);
			}
		} catch (RuntimeException e) {
			response.put("message", "아이템을 찾을 수 없습니다."); // 아이템이 존재하지 않을 경우
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		} catch (Exception e) {
			response.put("message", "댓글 수정 중 오류가 발생했습니다.");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}
	}

	@DeleteMapping("/items/{id}/reply/{replyId}") // 댓글 삭제
	public ResponseEntity<?> deleteReply(@PathVariable("id") Long itemId, @PathVariable("replyId") Long replyId) {
		Map<String, Object> response = new HashMap<>();

		try {
			// Item 서비스에서 아이템 조회
			ItemDTO itemDTO = itemService.findById(itemId); // 아이템이 존재하는 경우
			if (itemDTO == null) {
				response.put("message", "아이템을 찾을 수 없습니다.");
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
			}
			
			System.out.println("::::::::::::::::::::::::::::::::::::::::::::::::::::::::");
			// Reply 서비스로 댓글 삭제 요청
			ResponseEntity<String> replyDeleteResponse = replyFeign.delete(replyId);
			System.out.println("******************************************************"+replyDeleteResponse);
			if (replyDeleteResponse.getStatusCode().is2xxSuccessful()) {
				response.put("message", "댓글이 삭제되었습니다.");
				return ResponseEntity.ok(response);
			} else {
				response.put("message", "댓글 삭제에 실패했습니다.");
				return ResponseEntity.status(replyDeleteResponse.getStatusCode()).body(response);
			}
		} catch (FeignException.NotFound e) {
			e.printStackTrace();
			response.put("message", "댓글을 찾을 수 없습니다.");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		} catch (Exception e) {
			e.printStackTrace();
			response.put("message", "댓글 삭제 중 오류가 발생했습니다.");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}
	}

}
