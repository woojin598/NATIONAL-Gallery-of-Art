# tj705

Member

POST - Member/service/members [회원등록] SEC : NO, Roles : ALL
PUT - Member/service/update [회원 정보 수정] SEC : YES, Roles : USER
PUT - Member/service/update [회원 정보 (비밀번호) 수정] SEC : YES, Roles : USER
DELETE - Member/service/delete [회원 삭제 (탈퇴)] SEC : YES, Roles : USER
GET - Member/service/name/{username} [회원 정보 자세히보기)] SEC : YES, Roles : USER, ADMIN
GET - Member/service/all [회원 목록] SEC : YES, Roles : USER, ADMIN
POST - Member/service/login [회원 로그인] SEC : NO, Roles : ALL
- [회원 로그아웃] SEC : YES, Roles : USER, ADMIN (리액트에서 token을 null 예정)

- - - - - - - -

Cart

POST - Cart-service/cart/new [새로운 카드 생성] SEC : - , Roles : -
GET - Cart-service/cart/list/{id} [아이템명에 따라 카트 목록 조회] SEC : - , Roles : -
DELETE - Cart-service/cart/delete/{id} [아이템명에 따라 카트에서 아이템제거] SEC : - , Roles : -
PUT - Cart-service/catalogs/itemname [상품 주문에 따른 재고 업데이트] SEC : - , Roles : -

- - - - - - - -

Item

POST - Item-service/create [상품등록] SEC : YES, Roles : ADMIN
GET - Item-service/read [상품보기] SEC : NO, Roles : ALL
GET - Item-service/list [상품목록] SEC : NO, Roles : ALL
PUT - Item-service/update [상품수정] SEC : YES, Roles : ADMIN
DELETE - Item-service/delete [상품삭제] SEC : YES, Roles : ADMIN

- - - - - - - -

Order

GET - Order-service/orders/user/{username} [주문 확인] SEC : NO, Roles : ALL
POST - Order-service/orders [주문 생성] SEC : YES, Roles : ALL
PUT -  Order-service/orders/edit [주문 수정] SEC : YES , Roles : ALL
DELETE - orders/delete/{id} [주문 삭제] SEC : YES, Roles : ALL
