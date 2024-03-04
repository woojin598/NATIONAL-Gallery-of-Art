import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';

function MemberDetail() {
  const username = useParams().username;
  const [member, setMember] = useState(null);

  useEffect(() => {
    fetchMemberOrders(username);
  }, [username]);

  async function fetchMemberOrders(username) {
    try {
      const response = await fetch(`http://localhost:8000/member-service/${username}/orders`);
      if (response.ok) {
        const data = await response.json();
        setMember(data);
      } else {
        throw new Error('Error:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div>
      <h2>회원 주문정보</h2>
      {member !== null && (
        <>
          <div className='member'>
            <p>Id: {member.username}</p>
            <p>이름: {member.name}</p>
            {/* <p>성별: {member.gender}</p> */}
            {/* <p>e-mail: {member.email}</p> */}
            {/* <p>연락처: {member.phonenum}</p> */}
            <p>가입일: {moment(member.createAt).format("YYYY-MM-DD HH:mm:ss")}</p>
            <p>최종 수정일: {moment(member.updateAt).format("YYYY-MM-DD HH:mm:ss")}</p>
            {member.orderList && (
              <>
                <h3>주문 목록</h3>
                <ul>
                  {member.orderList.map(order => (
                    <li key={order.orderId}>
                      주문번호: {order.orderId}, 상품명: {order.productName}, 가격: {order.price}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default MemberDetail;
