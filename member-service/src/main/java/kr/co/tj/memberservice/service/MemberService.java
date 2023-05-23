package kr.co.tj.memberservice.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import kr.co.tj.memberservice.dto.MemberDTO;
import kr.co.tj.memberservice.dto.MemberEntity;
import kr.co.tj.memberservice.dto.MemberUpdatePasswdRequest;
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
	@Transactional
	public MemberDTO createMember(MemberDTO memberDTO) {
		memberDTO = getDate(memberDTO);
		MemberEntity memberEntity = memberDTO.toMemberEntity();// dto -> entity로 변환
		memberEntity.setPassword( passwordEncoder.encode(memberEntity.getPassword()) ); //패스워드 암호화
		memberEntity = memberRepository.save(memberEntity); // 암호화한 정보를 DB에 저장
		

//		item과 연결될 예정(값을 연결)respond에 보낼 값 수정하기 ★feign 작업예정입니다
//		MemberResponse memberResponse = memberDTO.toMemberResponse();
//		String result = catalogFeign.updateStockByProductId(memberResponse);	
//		if(result.startsWith("0")){
//			memberRepository.delete(memberEntity);
//			
//			return null;
//		}
		
		
		return memberDTO.toMemberDTO(memberEntity); // DB의 값을 다시 DTO로 변환하여 반환
	}
	
	 
	//회원가입, 회원수정(현재시간등록)
	private MemberDTO getDate(MemberDTO memberDTO) {
		Date date = new Date();
		if (memberDTO.getCreateAt() == null) {
			memberDTO.setCreateAt(date);
		}
		memberDTO.setUpdateAt(date);
		return memberDTO;
	}


	
	
	//로그인
	@Transactional
	public MemberDTO login(MemberDTO memberDTO) {
		
		//사용자 인증(username, password의 일치여부)
		MemberEntity memberEntity = memberRepository.findByUsername(memberDTO.getUsername());
		if(memberEntity == null) {
			return null;
		}
		
		if(!passwordEncoder.matches(memberDTO.getPassword(), memberEntity.getPassword())) {
			return null;
		}
		
		String token = tokenProvider.create(memberEntity);//토큰생성(서버에 저장)
		memberDTO = memberDTO.toMemberDTO(memberEntity);
		memberDTO.setToken(token); // dto에 token삽입
		memberDTO.setId("");
		memberDTO.setPassword("");

		return memberDTO; //id, pw를 null, 토큰값 반환
	}

	
	
	
	
	//회원정보 자세히 보기
	@Transactional
	public MemberDTO findByUsername(String username) {

		MemberEntity memberEntity = memberRepository.findByUsername(username);
		MemberDTO memberDTO = new MemberDTO();
		memberDTO.toMemberDTO(memberEntity);
		memberDTO.setId("");
		memberDTO.setPassword("");
		
		return memberDTO;
	}

	

	
	
	//회원정보 수정
	@Transactional
	public MemberDTO update(MemberDTO memberDTO) {
		MemberEntity memEntity = memberRepository.findByUsername(memberDTO.getUsername());

		if (memEntity == null) {
			throw new RuntimeException("회원 정보가 잘못됐습니다..");
		}
		
		if(!passwordEncoder.matches(memberDTO.getPassword(), memEntity.getPassword())) {
			throw new RuntimeException("비밀번호가 틀렸습니다.");
		}
		
		memEntity.setName(memberDTO.getName());
		memEntity.setEmail(memberDTO.getEmail());
		memEntity.setPassword(passwordEncoder.encode(memberDTO.getPassword()));
		memEntity.setPhonenum(memberDTO.getPhonenum());
		memEntity.setAddress(memberDTO.getAddress());
		memEntity.setUpdateAt(new Date());

		memEntity = memberRepository.save(memEntity);
		
		memberDTO = memberDTO.toMemberDTO(memEntity);
		memberDTO.setId("");
		memberDTO.setPassword("");
		
		return memberDTO;
	}


	
	//비밀번호 수정
	@Transactional
	public MemberDTO updatePasswd(MemberUpdatePasswdRequest updatePasswdRequest) {
		MemberEntity memberEntity = memberRepository.findByUsername(updatePasswdRequest.getUsername());
		System.out.println(memberEntity);
		
		if (memberEntity == null) {
			throw new RuntimeException("회원 정보가 잘못됐습니다.");
		}
		
		if(!passwordEncoder.matches(updatePasswdRequest.getOrgPassword(), memberEntity.getPassword())) {
			throw new RuntimeException("기존 비밀번호가 틀렸습니다.");
		}
		
		memberEntity.setPassword(passwordEncoder.encode(updatePasswdRequest.getPassword()));
		memberEntity = memberRepository.save(memberEntity);
		MemberDTO memberDTO = new MemberDTO();
		memberDTO = memberDTO.toMemberDTO(memberEntity);

		return memberDTO;
	}



	//삭제
	public MemberEntity getByCredentials(String username) {
		return memberRepository.findByUsername(username);
	}

    
	//삭제
	@Transactional
	public void delete(MemberDTO memberDTO) {
		MemberEntity memberEntity = getByCredentials(memberDTO.getUsername());

		if (memberEntity == null) {
			throw new RuntimeException("회원 정보가 잘못됐습니다..");
		}

		if (!passwordEncoder.matches(memberDTO.getPassword(), memberEntity.getPassword())) {
			throw new RuntimeException("비밀번호가 잘못됐습니다..");
		}

		memberRepository.delete(memberEntity);

	}


	
	//회원목록
	@Transactional
	public List<MemberDTO> findAll() {
		List<MemberEntity> list_entity = memberRepository.findAll();
		List<MemberDTO> list_dto = new ArrayList<>();

	    for (MemberEntity e : list_entity) {
	        MemberDTO memberDTO = new MemberDTO();
	        memberDTO.toMemberDTO(e);
	        list_dto.add(memberDTO);
	    }
	    
		return list_dto;
	}
	
	
	@Transactional
	public Page<MemberDTO> findAll(int page) {
		List<Sort.Order> sortList = new ArrayList<>();
		sortList.add(Sort.Order.desc("id"));

		Pageable pageable = (Pageable) PageRequest.of(page, 10, Sort.by(sortList));
		Page<MemberEntity> page_member = memberRepository.findAll(pageable);
		Page<MemberDTO> page_dto = page_member.map(
				MemberEntity -> new MemberDTO(
				MemberEntity.getId(),
				MemberEntity.getUsername(),
				MemberEntity.getName(),
				MemberEntity.getEmail(),
				MemberEntity.getPhonenum(),
				MemberEntity.getAddress(),
				MemberEntity.getPassword(),
				null,
				null,
				MemberEntity.getCreateAt(),
				MemberEntity.getUpdateAt(),
				null));
		
		return page_dto;
	}

	
	
//	@Transactional
//	public Page<MemberDTO> findAll(int page) {
//	    Pageable pageable = PageRequest.of(page, 10, Sort.by("id").descending());
//	    Page<MemberEntity> pageMember = memberRepository.findAll(pageable);
//	    return pageMember.map(MemberDTO::toMemberDTO);
//	}


    





}
