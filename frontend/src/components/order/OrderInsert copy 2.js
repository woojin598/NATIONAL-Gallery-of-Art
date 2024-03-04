import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchFn } from "../../NetworkUtils";
import { LoginContext } from "../../contexts/LoginContext";
import { useContext } from "react";
import { ItemContext } from "../../contexts/ItemContext";
import DaumPostcode from "react-daum-postcode"; // react-daum-postcode import 추가
import ModalComponent from "./ModalComponent";

function OrderInsert() {
  const id = useParams().id;
  const [member, setMember] = useState(null);
  const { loginInfo } = useContext(LoginContext); //회원정보가져오기
  const { itemInfo } = useContext(ItemContext); //상품정보가져오기
  const [item, setItem] = useState(null);
  const [bytes, setBytes] = useState(null);
  const [order, setOrder] = useState(null);
  const [qty, setQty] = useState(1);
  const [address, setAddress] = useState(""); // 선택한 주소를 저장할 상태
  const [openPostcode, setOpenPostcode] = useState(false); // 주소 검색 팝업 열림 상태를 저장할 상태
  const [isAddressModalOpen, setAddressModalOpen] = useState(false);

  /* 회원정보 */
  useEffect(() => {
    fetchFn(
      "GET",
      `http://localhost:8000/member-service/member/name/${loginInfo.LOGINER}`,
      null
    ).then((data) => {
      if (data !== undefined) {
        console.log(data);
        setMember(data.result);
      }
    });
  }, [loginInfo.LOGINER]);

  /* 상품정보 */
  useEffect(() => {
    if (id !== null) {
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
    }
  }, [id]);

  /* 주문서작성하기 */
  function onSubmitHandler(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const receiver_name = formData.get("receiver_name");
    const receiver_phone = formData.get("receiver_phone");
    const receiver_adress1 = formData.get("receiver_adress1");
    const receiver_adress2 = formData.get("receiver_adress2");
    const receiver_adress3 = formData.get("receiver_adress3");
    // const order_status = formData.get("order_status");
    const notes = formData.get("notes");
    const address = formData.get("address");
    const totalprice = item ? item.price * qty : 0;

    const dto = {
      username: loginInfo.LOGINER,
      artist: item.artist,
      title: item.title,
      itemDescribe: item.itemDescribe,
      price: item.price,
      qty: item.qty,
      receiver_name,
      receiver_phone,
      receiver_adress1,
      receiver_adress2,
      receiver_adress3,
      address,
      // order_status,
      notes,
      totalprice, // 계산한 totalprice 추가
    };

    fetchFn("POST", `http://localhost:8000/order-service/orders`, dto)
      .then((data) => {
        if (data !== undefined) {
          alert("주문 성공, 이용해 주셔서 감사합니다");
          window.location.href = "/";
        } else {
          console.log(data);
          console.log(dto);
          alert("이미 존재하거나 없는 주문내역입니다.");
          //window.location.href = `/item-service/detail/${id}`;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleQuantityChange(e) {
    const newQty = parseInt(e.target.value);
    if (!isNaN(newQty) && newQty >= 1) {
      setQty(newQty);
    }
  }

  function handleAddressSelect(data) {
    const { address, addressType, bname, buildingName } = data;
    let fullAddress = address;
    let extraAddress = "";

    if (addressType === "R") {
      if (bname !== "") {
        extraAddress += bname;
      }
      if (buildingName !== "") {
        extraAddress += `${extraAddress !== "" ? ", " : ""}${buildingName}`;
      }
      fullAddress += `${extraAddress !== "" ? ` ${extraAddress}` : ""}`;
    }

    setAddress(fullAddress);
    setOpenPostcode(false);
    closeAddressModal();
  }

  function openAddressModal() {
    setAddressModalOpen(true);
  }

  function closeAddressModal() {
    setAddressModalOpen(false);
  }

  return (
    <div>
      <div
        className="orderlist"
        style={{ border: "1px solid black", padding: "10px" }}
      >
        {/* 상품정보 */}
        {item !== null && (
          <div className="item">
            <h2>상품정보</h2>
            <p>작가명: {item.artist}</p>
            <p>작품명: {item.title}</p>
            <p>작품설명: {item.itemDescribe}</p>
            <p>가격: {item.price}원</p>
            {/* <p>수량: {order.qty}원</p> */}
            {/* <p>가격: {order.unitPrice}원</p> */}
            {/* <p>합계: {order.totalPrice}원</p> */}
            {bytes !== null && <img src={bytes} alt="이미지" />}
          </div>
        )}
        {item !== null && (
          <div className="order">
            <p>
              수량:{" "}
              <input
                type="number"
                value={qty}
                onChange={handleQuantityChange}
                min="1"
              />
            </p>
            <p>가격: {item.price}원</p>
            <p>합계: {item.price * qty}원</p>
          </div>
        )}

        <hr></hr>
        {/* 주문자정보 */}
        {member !== null && (
          <div className="member">
            <h2>주문자 정보</h2>
            <p>아이디: {member.username}</p>
            <p>이름: {member.name}</p>
            <p>e-mail: {member.email}</p>
            <p>연락처: {member.phonenum}</p>
          </div>
        )}

        <hr></hr>
        {/* 배송지정보 */}
        <div className="order">
          <h2>배송지정보</h2>
          <form action="#" onSubmit={onSubmitHandler}>
            수령인: <input name="receiver_name" />
            <br />
            수령인 연락처: <input name="receiver_phone" />
            <br />
          </form>
          <div>
            주소:
            <input
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={{ width: "20%", wordWrap: "break-word" }}
            />
            <button onClick={openAddressModal}>주소 검색</button>
            <ModalComponent
              isOpen={isAddressModalOpen}
              onClose={closeAddressModal}
            >
              <DaumPostcode
                onComplete={handleAddressSelect}
                autoClose
                defaultQuery={address}
              />
            </ModalComponent>
            <br />
            상세주소: <input name="receiver_address3" />
            <br />
            배송메모: <input name="notes" />
            <br />
            <button type="submit">주문서작성완료</button>
          </div>

          <p>
            도서산간 지역의 경우 추후 수령 시 추가 배송비가 과금될 수 있습니다.
          </p>
          <hr></hr>
          <div className="pay">
            <h2>결제수단(예정)</h2>
            <p>주문서 확인 후 연락드리겠습니다.</p>
            <p>주문 내용을 확인하였으며, 정보 제공 등에 동의합니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderInsert;
