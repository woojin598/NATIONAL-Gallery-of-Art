import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFn } from "../../NetworkUtils";

function OrderUpdate() {
  const orderId = useParams().orderId;
  const productId = useParams().productId;
  const username = useParams().username;
  const qty = useParams().qty;
  const unitPrice = useParams().unitPrice;

  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchFn(
      "GET",
      `http://localhost:8000/order-service/user/${username}`,
      null
    ).then((data) => {
      setOrder(data.result);
    });
  }, [orderId]);

  function onInputHandler(e) {
    let val = e.target.value;

    let newOrder = { ...order, [e.target.name]: val };

    setOrder(newOrder);
  }

  function onSubmitHandler(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get();

    const dto = {};

    fetchFn("PUT", `http://localhost:8000/order-service/edit`, dto).then(
      (data) => {
        if (data === undefined) {
          alert("다시 확인 후 입력해주세요");
          console.log(data); // test
          console.log(dto); //test
          return;
        }

        console.log(data);
        console.log(dto);
      }
    );
  }

  return (
    <div>
      <h2>주문 정보 수정</h2>
      {orderId !== null && (
        <form action="#" onSubmit={onSubmitHandler}>
          id: {username}
          <br />
          productId :{" "}
          <input name="productId" value={productId} onInput={onInputHandler} />
          <br />
          qty: <input name="qty" value={qty} onInput={onInputHandler} />
          <br />
          품목 당 금액:{" "}
          <input name="unitPrice" value={unitPrice} onInput={onInputHandler} />
          <br />
        </form>
      )}
    </div>
  );
}

export default OrderUpdate;
