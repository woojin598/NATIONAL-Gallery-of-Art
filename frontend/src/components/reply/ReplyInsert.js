import React, { useState } from "react";
import { fetchFn } from "../../NetworkUtils";
import { AiOutlineComment } from "react-icons/ai";
import styles from "../item/ItemDetail.module.css";
import "font-awesome/css/font-awesome.min.css";

function ReplyInsert(props) {
  const username = sessionStorage.getItem("LOGINER");
  const bid = props.bid;
  const [comment, setComment] = useState("");
  const [showEmoticonPicker, setShowEmoticonPicker] = useState(false);

  function onSubmitHandler(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const dto = {
      comment: formData.get("comment"),
      username,
      bid,
    };

    // insertFetchFn("reply-service", dto, "replys");

    fetchFn("POST", "http://localhost:8000/reply-service/replys", dto).then(
      (data) => {
        console.log(data);
        if (data !== undefined) {
          // 새 댓글을 추가한 뒤 댓글 목록을 다시 가져오기
          fetchFn("GET", `http://localhost:8000/reply-service/all/${bid}`, null)
            .then((data) => {
              if (data !== null) {
                console.log(data);
                props.dispatch({
                  type: "loading-replies",
                  payload: { replies: data.result },
                });
              }
            })
            .catch((error) => {
              console.error(error);
            });

          setComment(""); // Clear the comment field
        }
      },
      [bid]
    );
  }

  function onCommentChange(e) {
    setComment(e.target.value);
  }

  function onEmoticonSelect(emoticon) {
    setComment((prevComment) => prevComment + emoticon); // 댓글에 선택한 이모티콘 추가
    setShowEmoticonPicker(true); // 이모티콘 선택 창 닫기
  }

  return (
    <div className="container">
      <form action="#" onSubmit={onSubmitHandler}>
        <div className="comment-input">
          <i className="idus-icon-mypage comment-icon">
            <AiOutlineComment />
          </i>
          <label
            className="input-text"
            htmlFor="add_comment"
            aria-label="add_comment"
          >
            <input
              type="text"
              id="add_comment"
              name="comment"
              className={styles.inputText}
              placeholder="같이 감상해요 :)"
              autoComplete="off"
              aria-labelledby="add_comment"
              value={comment}
              onChange={onCommentChange}
            />
          </label>
          <span
            className={`${styles.emoticonIcon}`}
            role="button"
            aria-label="Open Emoticon Picker"
            onClick={() => setShowEmoticonPicker(!showEmoticonPicker)}
          >
            😊
          </span>
          <button
            className={`${styles.buttonStyle} ${styles.buttonFour}`}
            type="submit"
          >
            작성
          </button>
        </div>
      </form>
      {showEmoticonPicker && (
        <div className="emoticon-picker">
          <button onClick={() => onEmoticonSelect("😀")}>😀</button>
          <button onClick={() => onEmoticonSelect("😄")}>😄</button>
          <button onClick={() => onEmoticonSelect("😊")}>😊</button>
          <button onClick={() => onEmoticonSelect("🤞")}>🤞</button>
          <button onClick={() => onEmoticonSelect("👍")}>👍</button>
          <button onClick={() => onEmoticonSelect("👋")}>👋</button>
          <button onClick={() => onEmoticonSelect("👎")}>👎</button>
          <button onClick={() => onEmoticonSelect("❤️")}>❤️</button>
        </div>
      )}
    </div>
  );
}

export default ReplyInsert;
