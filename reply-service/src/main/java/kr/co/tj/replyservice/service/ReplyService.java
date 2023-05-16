package kr.co.tj.replyservice.service;

import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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
		
		replyEntity = replyRepository.save(replyEntity);
		
		return replyDTO;
	}

	private ReplyDTO getDate(ReplyDTO replyDTO) {

		Date now = new Date();
		
		if(replyDTO.getCreateDate() == null) {
			replyDTO.setCreateDate(now);
		}
		replyDTO.setUpdateDate(now);
		
		return replyDTO;
	}

	public ReplyDTO findById(long id) {
	    Optional<ReplyEntity> replyEntityOptional = replyRepository.findById(id);
	    
	    if (replyEntityOptional.isPresent()) {
	        return ReplyDTO.toReplyEntity(replyEntityOptional.get());
	    }
	    
	    return null;
	}

	public ReplyDTO update(ReplyDTO replyDTO) {
		  ReplyDTO existingReply = findById(replyDTO.getId()); // 중복 조회 대신 replyDTO를 사용
		    
		    existingReply.setUsername(replyDTO.getUsername());
		    existingReply.setComment(replyDTO.getComment());
		    
		    ReplyEntity updatedReplyEntity = replyRepository.save(existingReply.toReplyEntity());
		    
	    return ReplyDTO.toReplyEntity(updatedReplyEntity);
	}

	public ReplyDTO deleteById(long id) {
		replyRepository.deleteById(id);
		return null;
	}

//
//	public ReplyDTO findById() {
//		
//		 Optional<ReplyEntity> replyEntity = replyRepository.findById();
//		    
//		    if (replyEntity == null) {
//		        return null; 
//		    }
//		    
//		    return ReplyDTO.toReplyDTO(replyEntity);
//	}
//
//	public ReplyEntity update(ReplyDTO replyDTO) {
//		 replyDTO = findById();
//		 if(replyDTO == null) {
//			 return null;
//		 }
//		 
//		 replyDTO.setUsername(replyDTO.getUsername());
//		 replyDTO.setComment(replyDTO.getComment());
//		 
//		return replyRepository.save(replyDTO.toReplyEntity());
//	}
}
