import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchFn } from "../../NetworkUtils";
import MemberLogin from "../member/MemberLogin";
import moment from "moment";

function OrderDetail() {
  const username = useParams().username;
  const id = useParams().id;
  const [order, setOrder] = useState(null);
  const [member, setMember] = useState(null);
  const LOGINER = sessionStorage.getItem("LOGINER");

  useEffect(() => {
    fetchFn(
      "GET",
      `http://localhost:8000/order-service/orders/detail/${username}`,
      null
    ).then((data) => {
      setOrder(data.result);
      setMember(data.result);
    });
  }, [username]);

  function logout() {
    window.location.href = "/member-service/logout";
  }

  return (
    <div>
      <h2> 주문 정보 자세히보기</h2>
      {order !== null && member !== null && (
        <>
          <div className="order">
            <p>Id: {order.username}</p>
            <p>주문번호: {order.orderId}</p>
            <p>상품번호: {order.productId}</p>
            <p>작가명: {order.artist}</p>
            <p>작품명: {order.title}</p>
            <p>작품소개: {order.itemDescribe}</p>
            <p>작품 갯수: {order.qty}</p>
            <p>작품 당 가격: {order.unitPrice}</p>
            <p>총 가격: {order.totalPrice}</p>
            <p>
              작성일: {moment(order.createDate).format("YYYY-MM-DD HH:mm:ss")}
            </p>
            <p>
              최종 수정일:{" "}
              {moment(order.updateDate).format("YYYY-MM-DD HH:mm:ss")}
            </p>
          </div>

          <div className="menu">
            <Link to={`/`}>홈으로</Link> |
            <Link to={"/member-service/list"}>목록</Link> |
            {LOGINER === member.username && (
              <>
                <Link to={`/order-service/detail/${username}`}>
                  주문내역 확인
                </Link>{" "}
                |<Link to={`/order-service/orders`}>주문 등록</Link> |
                <Link to={`/order-service/orders/edit`}>주문목록 수정</Link> |
                <Link to={`/order-service/delete/${id}`}>주문목록 삭제</Link> |
                <Link onClick={logout}>로그아웃</Link>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default OrderDetail;
