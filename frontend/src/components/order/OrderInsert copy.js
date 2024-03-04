import React, { useContext, useEffect, useState } from "react";
import { fetchFn } from "../../NetworkUtils";
import { useParams } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContext";
import styles from "./assets/Insert.module.css";

function OrderInsert() {
  const { id } = useParams(); // Retrieve 'id' from the URL
  const username = useParams().username;
  const [item, setItem] = useState(null);
  const [member, setMember] = useState(null);
  const { loginInfo, setLoginInfo } = useContext(LoginContext);

  useEffect(() => {
    fetchFn("GET", `http://localhost:8000/item-service/items/${id}`, null)
      .then((data) => {
        if (data && data.result) {
          data.result.bytes = "data:image/png;base64," + data.result.bytes;
          setItem(data.result);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    fetchFn(
      "GET",
      `http://localhost:8000/member-service/member/name/${username}`,
      null
    )
      .then((data) => {
        setMember(data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, username]);

  function onSubmitHandler(e) {
    e.preventDefault();
    // ...

    // 기존 코드 유지
  }

  return (
    <div>
      <h2>회원 정보</h2>
      <h2>주문 화면</h2>
      {item !== null && member !== null ? (
        <>
          작가명: {item.artist} <br />
          작품명: {item.title} <br />
          가격: {item.price}원<br />
          작품설명: {item.itemDescribe} <br />
          구매자: {loginInfo.LOGINER} <br />
          <div>
            <img src={item.bytes} alt="이미지" />
          </div>
          <h2>회원 정보</h2>
          <div className="member">
            <p>Id: {member.username}</p>
            <p>이름: {member.name}</p>
            <p>성별: {member.gender}</p>
            <p>e-mail: {member.email}</p>
            <p>연락처: {member.phonenum}</p>
            <p>주소: {member.address}</p>
            <p>
              가입일: {moment(member.createDate).format("YYYY-MM-DD HH:mm:ss")}
            </p>
            <p>
              최종 수정일:{" "}
              {moment(member.updateDate).format("YYYY-MM-DD HH:mm:ss")}
            </p>
          </div>
          <form action="#" onSubmit={onSubmitHandler}>
            배송지: <input name="address" />
            <br />
            <button>구매하기</button>
          </form>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default OrderInsert;
