import React, { useState } from "react";
import { fetchFn } from "../../NetworkUtils";
import moment from "moment";
import styles from "../item/ItemDetail.module.css";

function ReplyComp(props) {
  const reply = props.reply;
  const id = props.id;
  const loggedInUser = sessionStorage.getItem("LOGINER");
  const [showEmoticonPicker, setShowEmoticonPicker] = useState(false);

  // State to manage the edit mode and edited comment
  const [editMode, setEditMode] = useState(false);
  const [editedComment, setEditedComment] = useState(reply.comment);
  const [selectedEmoticon, setSelectedEmoticon] = useState(null);

  // Function to handle edit mode activation
  function onEditClick() {
    setEditMode(true);
  }

  // Function to handle edit mode deactivation and reset the edited comment
  function onCancelClick() {
    setEditMode(false);
    setEditedComment(reply.comment); // Reset the edited comment to the original comment
  }

  // Function to handle saving the edited comment
  function onSaveClick() {
    setEditMode(false);

    const dto = {
      id,
      comment: editedComment, // Use the edited comment
    };

    fetchFn(
      "PUT",
      `http://localhost:8000/reply-service/replys/${id}`,
      dto
    ).then(
      (data) => {
        console.log(data);
        console.log(dto);
        props.dispatch({
          type: "update-reply",
          payload: { id, comment: editedComment },
        });
      },
      [id]
    );
  }

  // Function to handle deleting the reply
  function onDeleteClick() {
    const dto = {
      id,
    };
    // Prompt the user to confirm the deletion
    const confirmDelete = window.confirm("삭제하시겠습니까?");
    if (confirmDelete) {
      fetchFn(
        "DELETE",
        `http://localhost:8000/reply-service/replys/${id}`,
        dto
      ).then(
        (data) => {
          console.log(data);
          props.dispatch({ type: "delete-reply", payload: { id: id } });
        },
        [id]
      );
    }
  }

  // Function to handle emoticon selection
  function onEmoticonSelect(emoticon) {
    setShowEmoticonPicker(false);
    setSelectedEmoticon(emoticon); // Store the selected emoticon
    setEditedComment((prevComment) => prevComment + emoticon); // Add the emoticon to the edited comment
  }

  return (
    <div>
      {editMode ? (
        <div className={styles.editArea}>
          <textarea
            rows="1"
            cols="50"
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
          />
          <div className={styles.buttonGroup}>
            <button
              className={`${styles.buttonStyle} ${styles.buttonFour}`}
              onClick={onSaveClick}
            >
              저장
            </button>
            <button
              className={`${styles.buttonStyle} ${styles.buttonFour}`}
              onClick={onCancelClick}
            >
              취소
            </button>
            <span
              className={`${styles.emoticonIcon}`}
              role="button"
              aria-label="Open Emoticon Picker"
              onClick={() => setShowEmoticonPicker(!showEmoticonPicker)}
            >
              😊
            </span>
            {selectedEmoticon && <span>{selectedEmoticon}</span>}
            <p>{editedComment}</p>
          </div>
        </div>
      ) : (
        <div className={styles.replyContent}>
          <div>
            <strong>{reply.username} : </strong>
            {reply.comment}
          </div>
          <div className={styles.replyDate}>
            {moment(reply.updateDate).format("YYYY-MM-DD hh:mm")}
          </div>
          {loggedInUser === reply.username && (
            <div className={styles.buttonGroup}>
              <button
                className={`${styles.buttonStyle} ${styles.buttonFour}`}
                onClick={onEditClick}
              >
                수정
              </button>
              <button
                className={`${styles.buttonStyle} ${styles.buttonFour}`}
                onClick={onDeleteClick}
              >
                삭제
              </button>
            </div>
          )}
        </div>
      )}
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

export default ReplyComp;
