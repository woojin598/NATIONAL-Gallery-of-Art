package kr.co.tj.replyservice.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import kr.co.tj.replyservice.dto.ReplyDTO;
import kr.co.tj.replyservice.dto.ReplyEntity;
import kr.co.tj.replyservice.jpa.ReplyRepository;

@Service
public class ReplyService {
	
	@Autowired
	private ReplyRepository replyRepository;

	
	public ReplyDTO insert(ReplyDTO replyDTO) {
		
		replyDTO = getDate(replyDTO);
		
		ReplyEntity replyEntity = replyDTO.toReplyEntity();
		replyEntity.setRole("ROLE_USER");
		
		replyEntity = replyRepository.save(replyEntity);
		
		
		return replyDTO.toReplyDTO(replyEntity);
	}

	private ReplyDTO getDate(ReplyDTO replyDTO) {

		Date now = new Date();
		
		if(replyDTO.getCreateDate() == null) {
			replyDTO.setCreateDate(now);
		}
		replyDTO.setUpdateDate(now);
		
		return replyDTO;
	}


	public ReplyDTO update(ReplyDTO dto) {
		Optional<ReplyEntity> optional = replyRepository.findById(dto.getId());
		if (optional.isPresent()) {
			ReplyEntity entity = optional.get();
			entity.setComment(dto.getComment());
			entity.setId(dto.getId());
			entity.setUpdateDate(new Date());
			entity = replyRepository.save(entity);
			return ReplyDTO.toReplyEntity(entity);
		} else {
			throw new RuntimeException("해당하는 댓글이 없습니다.");
		}
	}


	public void deleteById(long id) {
		replyRepository.deleteById(id);
	}

	public List<ReplyDTO> findByBId(Long bid) {

		List<ReplyEntity> list_entity = replyRepository.findByBid(bid);
		List<ReplyDTO> list_dto = new ArrayList<>();

		for (ReplyEntity e : list_entity) {
			list_dto.add(ReplyDTO.toReplyEntity(e));
		}

		return list_dto;

	}
	public Page<ReplyDTO> findByBid(Long bid, int page) {
		List<Sort.Order> sortList = new ArrayList<>();
		sortList.add(Sort.Order.desc("id"));

		Pageable pageable = PageRequest.of(page, 5, Sort.by(sortList));
		Page<ReplyEntity> pageItem = replyRepository.findByBid(bid, pageable);
		Page<ReplyDTO> pageDto = pageItem.map(entity -> new ReplyDTO(entity.getId(), entity.getBid(),
				entity.getUsername(), entity.getComment(), entity.getCreateDate(), entity.getUpdateDate()
, entity.getRole()
		));
		return pageDto;
	}

	public ReplyDTO findById(Long bid) {
		Optional<ReplyEntity> optional = replyRepository.findById(bid);

		if (!optional.isPresent()) {
			throw new RuntimeException("잘못된 접근입니다. 댓글 id가 존재하지 않습니다.");
		}

		ReplyEntity replyEntity = optional.get();

		return ReplyDTO.toReplyEntity(replyEntity);
	}


}
