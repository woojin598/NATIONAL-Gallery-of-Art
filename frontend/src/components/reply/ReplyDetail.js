import React, { useState } from "react";
import { Link } from "react-router-dom";
import { fetchFn } from "../../NetworkUtils";

function ReplyDetail() {
  const [bid, setBid] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const dto = {
      username: formData.get("username"),
      comment: formData.get("comment"),
      bid: formData.get("bid"),
    };

    fetchFn("POST", "http://localhost:8000/reply-service/replys", dto).then(
      (data) => {
        console.log(data);
        window.location.href = `/reply/detail/${data.result}`;
      }
    );
  };

  const handleChange = (e) => {
    setBid(e.target.value);
  };

  const deleteHere = () => {
    let isOk = window.confirm("정말로 삭제하겠습니까?");

    if (isOk) {
      const dto = {
        bid,
      };

      fetchFn("DELETE", `http://localhost:8000/reply-service/${id}`, dto).then(
        (data) => {
          console.log(data);
          window.location.href = "/";
        }
      );
    }
  };

  return (
    <div>
      <h2>댓글</h2>

      <div className="reply">
        댓글 <br />
        <form action="#" onSubmit={onSubmitHandler}>
          <p>댓글란</p>
          <input value={bid} name="bid" hidden onChange={handleChange} />
          <br />
          작성자 : <input name="username" />
          <br />
          <textarea name="comment" placeholder="댓글을 입력하세요" />
          <button>작성 완료</button>
        </form>
        <br />
        <Link to={`/reply-sevice/update/${bid}`}>수정</Link> |
        <Link onClick={deleteHere}>삭제</Link>
      </div>
    </div>
  );
}

export default ReplyDetail;
