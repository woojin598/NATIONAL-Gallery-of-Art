import React from "react";
import { useParams } from "react-router-dom";
import { fetchFn } from "../../NetworkUtils";

function ReplyDelete() {
  const id = useParams.id;

  function onClickHandler(e) {
    e.preventDefault();

    const dto = { id };

    fetchFn(
      "DELETE",
      `http://localhost:8000/reply-service/replys/${id}`,
      dto
    ).then((data) => {
      alert("삭제 성공!");
      console.log(data);
      window.location.href = `/`;
    });
  }

  return (
    <div>
      <h2>댓글 삭제 하기</h2>
      <button onClick={onClickHandler}>삭제하기</button>
    </div>
  );
}

export default ReplyDelete;
