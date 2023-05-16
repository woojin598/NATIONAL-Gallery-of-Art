package kr.co.tj.replyservice.jpa;


import org.springframework.data.jpa.repository.JpaRepository;

import kr.co.tj.replyservice.dto.ReplyEntity;

public interface ReplyRepository extends JpaRepository<ReplyEntity, Long>{




}
