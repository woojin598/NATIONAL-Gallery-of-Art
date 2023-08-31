**Exhibition Service - Product API Server**

---

- 개발 인원: 3명
- 개발기간: 2023.05.01 ~ 2023.06.21
- 담당역할:  
- This app is for study Spring Boot and MSA.
- This app is Product/Comment API Server.
- Visit (링크예정)

**Development environment**

---

- 개발언어: Java(JDK 11), JavaScript
- 프레임워크: Spring Boot 2.4.2, Spring Cloud 2020.0.0
- IDE: Eclipse 2022.12 (4.26.0) , Visual Studio Code(1.79.0)
- 버전 관리 시스템: Git (GitHub)
- Service Discovery : Eureka 1.10.10
- Web Application Server: Tomcat 9.0.41
- 빌드 자동화 도구: Maven 3.1.0
- 데이터베이스 : mysql
- 운영체제: Windows 10

**Using this app**

---

- Use Products / Comments APIs
- 주요기능(회원관리, 상품관리, 댓글관리, 주문관리)
- API List

| Endpoint |   |   | Description | Secured | Roles |
| --- | --- | --- | --- | --- | --- |
| Member | POST | Member-service/members | 회원 등록 | NO | ALL |
|  | PUT | Member-service/update | 회원 정보 수정 | YES | USER |
|  | PUT | Member-service/update | 회원 정보(비밀번호) 수정 | YES | USER |
|  | DELETE | Member-service/delete | 회원 삭제(탈퇴) | YES | USER |
|  | GET | Member-service/name/{username} | 회원 정보 자세히보기 | YES | USER,ADMIN |
|  | GET | Member-service/all | 회원 목록 | YES | USER,ADMIN |
|  | POST | Member-service/login | 회원 로그인 | NO | ALL |
|  | - | Member-service/logout | 회원 로그아웃 | YES | USER,ADMIN |
| Item | POST | Item-service/create | 상품등록 | YES | ADMIN |
|  | GET | Item-service/read | 상품보기 | NO | ALL |
|  | GET | Item-service/list | 상품목록 | NO | ALL |
|  | PUT | Item-service/update | 상품수정 | YES | ADMIN |
|  | DELETE | Item-service/delete | 상품삭제 | YES | ADMIN |
| Order 
|  | POST | Order-service/orders | 주문 생성 | YES | ALL |
| Reply | GET | reply-service/replys/{id} | 댓글 자세히보기 | NO | ALL |
|  | GET | reply-service/bid | 댓글목록 | NO | ALL |
|  | PUT | reply-service/replys/{id} | 댓글수정 | YES | USER,ADMIN |
|  | POST | reply-service/replys | 댓글작성 | YES | USER,ADMIN |
|  | DELETE | reply-service/replys/{id} | 댓글삭제 | YES | USER,ADMIN |

**Contacts**

---

- 조장/ 김우진(깃주소 첨부예정)
- 조원/ 김도희(깃주소 첨부예정)
- 조원/ 최수진(깃주소 첨부예정)
