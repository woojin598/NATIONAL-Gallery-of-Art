package kr.co.tj.memberservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberRequest { //toMemberDTO

	private String username;
	private String name;

	private String email;
	private String phonenum;
	private String address;

	private String password;
	private String password2;
	private String orgPassword;

}
