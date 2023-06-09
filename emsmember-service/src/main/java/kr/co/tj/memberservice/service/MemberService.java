package kr.co.tj.memberservice.service;

import java.util.Date;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.event.TransactionalEventListener;

import kr.co.tj.memberservice.dto.MemberDTO;
import kr.co.tj.memberservice.dto.MemberEntity;
import kr.co.tj.memberservice.jpa.MemberRepository;
import kr.co.tj.memberservice.sec.TokenProvider;

@Service
public class MemberService {

	
	@Autowired
	private MemberRepository memberRepository;
	
	@Autowired
	private TokenProvider tokenProvider;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder; 
	


	//회원가입
	public MemberDTO createMember(MemberDTO memberDTO) {
		memberDTO = getDate(memberDTO);
		MemberEntity memberEntity = memberDTO.toMemberEntity();// dto -> entity로 변환
		memberEntity.setPassword( passwordEncoder.encode(memberEntity.getPassword()) ); //패스워드 암호화
		memberEntity = memberRepository.save(memberEntity); // 암호화한 정보를 DB에 저장	
		return memberDTO.toMemberDTO(memberEntity); // DB의 값을 다시 DTO로 변환하여 반환
	}

	//회원가입(현재시간등록)
	private MemberDTO getDate(MemberDTO memberDTO) {
		Date date = new Date();
		if (memberDTO.getCreateAt() == null) {
			memberDTO.setCreateAt(date);
		}
		memberDTO.setUpdateAt(date);
		return memberDTO;
	}


	//로그인
	public MemberDTO login(MemberDTO memberDTO) {
		
		//사용자 인증(username, password의 일치여부)
		MemberEntity memberEntity = memberRepository.findByUsername(memberDTO.getUsername());
		if(memberEntity == null) {
			return null;
		}
		
		if(!passwordEncoder.matches(memberDTO.getPassword(), memberEntity.getPassword())) {
			return null;
		}
		
		//토큰생성(서버에 저장)
		String token = tokenProvider.create(memberEntity);
		
		memberDTO = memberDTO.toMemberDTO(memberEntity);
		memberDTO.setToken(token); // dto에 token삽입
		memberDTO.setPassword(""); // (보안)dto에비 비밀번호 제거


		return memberDTO; //password: null로 반환
	}

	@Transactional
	public MemberDTO findByUsername(String username) {

		MemberEntity entity = memberRepository.findByUsername(username);

		MemberDTO dto = new ModelMapper().map(entity, MemberDTO.class);
		dto.setId(null);
		dto.setPassword(null);

		return dto;
	}


}
