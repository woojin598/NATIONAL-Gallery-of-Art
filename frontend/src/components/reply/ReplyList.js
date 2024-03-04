import React, { useEffect } from "react";
import ReplyComp from "./ReplyComp";
import { fetchFn } from "../../NetworkUtils";
import styles from "../item/ItemDetail.module.css";

function ReplyList({ bid, dispatch, replies }) {
  useEffect(() => {
    fetchFn("GET", `http://localhost:8000/reply-service/all/${bid}`, null)
      .then((data) => {
        if (data !== null) {
          dispatch({
            type: "loading-replies",
            payload: { replies: data.result },
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className={styles.reContainer}>
      <div>
        {replies?.length > 0 &&
          replies.map((reply) => (
            <div key={reply.id}>
              <ReplyComp
                reply={reply}
                bid={bid}
                id={reply.id}
                dispatch={dispatch}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default ReplyList;
