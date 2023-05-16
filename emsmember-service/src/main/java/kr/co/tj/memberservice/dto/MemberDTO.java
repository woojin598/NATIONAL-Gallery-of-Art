package kr.co.tj.memberservice.dto;

import java.io.Serializable;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberDTO implements Serializable{
   
   private static final long serialVersionUID = 1L;
   
   private String id;
   
   private String username;//사용자 실제 아이디
   
   private String name;
   
   private String email;
   private String phonenum;
   private String address;
     
   private String password;
   
   private Date createAt;
   
   private Date updateAt;
   
   private String token;
   

	
	
	
		//1-3. MemberService(DB의 회원정보(비밀번호 암호화된 정보))
	   	public MemberDTO toMemberDTO(MemberEntity memberEntity) {      
		      this.username = memberEntity.getUsername();
		      this.name = memberEntity.getName();
		      this.email = memberEntity.getEmail();
		      this.phonenum = memberEntity.getPhonenum();
		      this.address = memberEntity.getAddress();
		      this.createAt = memberEntity.getCreateAt();
		      this.updateAt = memberEntity.getUpdateAt();
		      this.token = memberEntity.getToken();
		      
		      return this;
		   }
		   
		   
		   
		   //1-2. MemberService(회원가입정보 + 시간)
		   public MemberEntity toMemberEntity() {
		      return MemberEntity.builder()
		            .username(username)
		            .name(name)
		            .email(email)
		            .phonenum(phonenum)
		            .address(address)
		            .password(password)
		            .createAt(createAt)
		            .updateAt(updateAt)
		            .build();
		   }
		   
		   
		   //1-1. MemberRequest(회원가입하여 db에 값을 저장할 것들)
		   public static MemberDTO toMemberDTO(MemberRequest memberRequest) {
		      return MemberDTO.builder()
		            .username(memberRequest.getUsername())
		            .name(memberRequest.getName())
		            .email(memberRequest.getEmail())
		            .phonenum(memberRequest.getPhonenum())
		            .address(memberRequest.getAddress())
		            .password(memberRequest.getPassword())
		            .build();
		   }
		   
		   
		   public MemberResponse toMemberResponse() {		      
			      return MemberResponse.builder()
			            .username(username)
			            .name(name)
			            .createAt(createAt)
			            .updateAt(updateAt)
			            .token(token)
			            .build();
			   }



		   //2.로그인
		   public static MemberDTO toMemberDTO(MemberLoginRequest memberLoginRequest) {    
		      return MemberDTO.builder()
		            .username(memberLoginRequest.getUsername())
		            .password(memberLoginRequest.getPassword())
		            .build();
		   }









}
