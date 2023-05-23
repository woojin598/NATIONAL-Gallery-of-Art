package kr.co.tj.cartservice.cookie;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerInterceptor;

public class CartCookie implements HandlerInterceptor {
	@Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // 쿠키를 읽는 로직
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("cart")) {
                    // 장바구니 정보를 처리하는 로직
                }
            }
        }
        return true;
    }
}

//접속시 장바구니 자동생성 장바구니 ID를 쿠키에 저장하고 쿠키에서 읽는 기능을 제공합니다.