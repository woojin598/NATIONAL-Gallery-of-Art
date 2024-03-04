import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { fetchFn } from "../../NetworkUtils";

function OrderDelete() {
  const id = useParams().id;
  const orderId = useParams().orderId;
  const productId = useRef;

  useEffect(() => {
    productId.current.focus();
  }, []);

  return (
    <div>
      <p>주문 정보 삭제</p>
      orderId : <input value={orderId} readOnly />
      <br />
      productID :{" "}
      <input
        ref={productId}
        placeholder="목록에서 삭제할 상품 ID를 입력하세요"
      />
      <br />
      <br />
      <button
        onClick={() => {
          const productId = productId.current.value;
          const dto = {};
          fetchFn(
            "DELETE",
            "http://localhost:8000/order-service/delete",
            dto
          ).then((data) => {
            console.log(data);
            if (data === undefined) {
              alert("삭제 실패");
              productId.current.value = "";
              return;
            }
            // window.location.href = "/order-service/"
          });
        }}
      >
        {" "}
        삭제
      </button>
    </div>
  );
}

export default OrderDelete;
