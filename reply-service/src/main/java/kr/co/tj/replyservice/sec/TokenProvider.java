package kr.co.tj.replyservice.sec;

import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import kr.co.tj.replyservice.dto.ReplyEntity;

@Component
public class TokenProvider {
	
	private static final String SECRETE_KEY = "aaaaaaaaaaaaaa";
	
	public String create(ReplyEntity replyEntity) {
		long now = System.currentTimeMillis(); 
		
		Date today = new Date(now);
		Date exireDate = new Date(now + 1000 * 1 * 60 * 60 * 24); 

		return Jwts.builder()
				.signWith(SignatureAlgorithm.HS512, SECRETE_KEY)
				.setSubject(replyEntity.getUsername())
				.claim("role", replyEntity.getRole())
				.setIssuer("reply-service")
				.setIssuedAt(today) 
				.setExpiration(exireDate) 
				.compact();
		
	}

}
