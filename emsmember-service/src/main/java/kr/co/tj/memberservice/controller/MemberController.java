package kr.co.tj.memberservice.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.tj.memberservice.dto.MemberDTO;
import kr.co.tj.memberservice.dto.MemberLoginRequest;
import kr.co.tj.memberservice.dto.MemberRequest;
import kr.co.tj.memberservice.dto.MemberResponse;
import kr.co.tj.memberservice.service.MemberService;

@RestController
@RequestMapping("/member-service")
public class MemberController {
	
	@Autowired
	private Environment env;
	
	@Autowired
	private MemberService memberService;
	
	@GetMapping("/name/{username}")
	public ResponseEntity<?> findByUsername(@PathVariable("username") String username) {
		Map<String, Object> map = new HashMap<>();

		if (username == null) {
			map.put("result", "잘못된 정보입니다");
			return ResponseEntity.badRequest().body(map);
		}

		try {
			MemberDTO dto = memberService.findByUsername(username);
			map.put("result", dto);
			return ResponseEntity.ok().body(map);
		} catch (Exception e) {
			e.printStackTrace();
			map.put("result", "조회 실패");
			return ResponseEntity.badRequest().body(map);
		}
		
		}
	//로그인
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody MemberLoginRequest memberLoginRequest){
		Map<String, Object> map = new HashMap<>();
		

		if(memberLoginRequest.getUsername() == null || memberLoginRequest.getUsername().isEmpty()) {
			map.put("result", "id를 바르게 입력하세요.");
			return ResponseEntity.ok().body(map);			
		}
		
		if(memberLoginRequest.getPassword() ==null || memberLoginRequest.getPassword().isEmpty()) {
			map.put("result", "비밀번호를 바르게 입력하세요.");
			return ResponseEntity.ok().body(map);			
		}
		
		MemberDTO memberDTO = MemberDTO.toMemberDTO(memberLoginRequest); //dto로 변환
		
		memberDTO = memberService.login(memberDTO); 
		
		map.put("result", memberDTO);
		
		if(memberDTO == null) {
			map.put("result", "사용자명이나 비밀번호가 잘못 되었습니다.");
			return ResponseEntity.ok().body(map);
			}
		
		MemberResponse memberResponse = memberDTO.toMemberResponse();		
		map.put("result", memberResponse);

		return ResponseEntity.ok().body(map);	
	}
	
	
	@GetMapping("/test")
	public ResponseEntity<?> test(){
		System.out.println(":::::::::::::::잘될ㄲ?::::::로그인 하고 토큰 첨부해야 하는데::::::::::");
		
		return ResponseEntity.status(HttpStatus.OK).body(new MemberResponse());
	}
	
	
	
	//회원가입
	@PostMapping("/members")
	public ResponseEntity<?> createMember(@RequestBody MemberRequest memberRequest) {
		MemberDTO memberDTO = MemberDTO.toMemberDTO(memberRequest); //req -> dto
		
		memberDTO = memberService.createMember(memberDTO); //dto -> entity
		MemberResponse memberResponse = memberDTO.toMemberResponse();
		
		return ResponseEntity.status(HttpStatus.CREATED).body(memberResponse);
	}
	
	
	@GetMapping("/health_check")
	public String status() {
		return "user service입니다"+env.getProperty("local.server.port");
	}
	
	

}
