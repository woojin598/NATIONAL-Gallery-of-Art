import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";

function OrderComp(props) {
  const order = props.order;

  return (
    <div>
      <p>id : {order.id}</p>
      <p>orderid : {order.orderId}</p>
      <p>productid : {order.productId}</p>
      <p>artist : {order.artist}</p>
      <p>title : {order.title}</p>
      <p>itemDescribe : {order.itemDescribe}</p>
      <p>갯수 : {order.qty}</p>
      <p>품목당 금액 : {order.unitPrice}</p>
      <p>총 금액: {order.totalPrice}</p>
      <p>최초 생성일: {order.createDate}</p>
      <p>수정일: {order.updateDate}</p>

      <p>수령인: {order.receiver_name}</p>
      <p>수령인 연락처: {order.receiver_phone}</p>
      <p>우편번호: {order.receiver_adress1}</p>
      <p>주소: {order.receiver_adress2}</p>
      <p>상세주소: {order.receiver_adress3}</p>
      <p>배송메모: {order.notes}</p>
    </div>
  );
}

export default OrderComp;
