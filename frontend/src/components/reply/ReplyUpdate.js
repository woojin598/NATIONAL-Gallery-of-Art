import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UpdateFetchFn, fetchFn } from "../../NetworkUtils";

function ReplyUpdate() {
  const id = useParams().id;
  const [reply, setReply] = useState(null);

  useEffect(() => {
    fetchFn(
      "GET",
      `http://localhost:8000/reply-service/replys/${id}`,
      null
    ).then((data) => {
      console.log(data);
      setReply(data.result);
    });
  }, [id]);

  function onInputHandler(e) {
    const val = e.target.value;
    const newReply = { ...reply, [e.target.name]: val };
    setReply(newReply);
  }

  function onSubmitHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const comment = formData.get("comment");
    const dto = {
      id,
      username: reply.username,
      comment,
    };
    UpdateFetchFn("reply-service", dto, `replys/${id}`);
  }

  return (
    <div>
      <h2>댓글 수정</h2>
      {reply !== null && (
        <form action="#" onSubmit={onSubmitHandler}>
          <input
            name="comment"
            value={reply.comment || ""}
            onInput={onInputHandler}
          />
          <br />
          <button>수정 완료</button>
        </form>
      )}
    </div>
  );
}

export default ReplyUpdate;
