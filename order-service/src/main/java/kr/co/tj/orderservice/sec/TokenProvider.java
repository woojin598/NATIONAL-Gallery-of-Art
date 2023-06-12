package kr.co.tj.orderservice.sec;

import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import kr.co.tj.orderservice.dto.OrderEntity;

@Component
public class TokenProvider {
		// 로그인하면 토큰발행이 되어 클라이언트에게 넘겨줌.
		
		private static final String SECRETE_KEY = "aaaaaaaaaaaaaa";
		
		public String create(OrderEntity orderEntity) {
			long now = System.currentTimeMillis(); //
			
			Date today = new Date(now);
			Date exireDate = new Date(now + 1000 * 1 * 60 * 60 * 24); //1000 * 1 = 1초 * 60 = 1분 * 60 = 1시간 * 24 = 하루
			
			return Jwts.builder()
					.signWith(SignatureAlgorithm.HS512, SECRETE_KEY)
					.setSubject(orderEntity.getUsername())
					.setIssuer("member-service")
					.setIssuedAt(today) //언제?
					.setExpiration(exireDate) //만료일
					.compact();
			//권한은 제외하기로 함 -> apigateway에서 구현
	}
}
