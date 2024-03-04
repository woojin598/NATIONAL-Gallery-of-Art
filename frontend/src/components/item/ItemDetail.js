import React, { useEffect, useReducer, useState } from 'react';
import { fetchFn } from '../../NetworkUtils';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ReplyInsert from '../reply/ReplyInsert';
import ReplyList from '../reply/ReplyList';
import moment from 'moment';
import styles from './ItemDetail.module.css';

const reducer = function (state, action) {
  switch (action.type) {
    case 'add-replies':
      return action.payload.replies;

    case 'loading-replies':
      return action.payload.replies;

    case 'delete-reply':
      return state.filter((reply) => reply.id !== action.payload.id);

    default:
      return state;
  }
};

const initReplies = [];

function ItemDetail() {
  const loggedInUser = localStorage.getItem('LOGINER');
  const id = useParams().id;
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [item, setItem] = useState(null);
  const [bytes, setBytes] = useState(null);
  const [, setMember] = useState(null);
  const [replies, dispatch] = useReducer(reducer, initReplies);
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredComment, setIsHoveredComment] = useState(false);


  useEffect(() => {
    if (id !== undefined) {
      fetchFn('GET', `http://localhost:8000/item-service/items/${id}`, null)
        .then((data) => {
          if (data !== undefined) {
            setItem(data.result);
            setBytes('data:image/png;base64,' + data.bytes);
            setMember(data.member);
          }
        });
    }
  }, [id]);

  function deleteHere() {
    let isOk = window.confirm('정말 삭제하시겠습니까?');

    if (isOk) {
      const dto = {
        id,
      };
      fetchFn('DELETE', `http://localhost:8000/item-service/items/${id}`, dto).then((data) => {
        if (data === undefined) {
          console.log(data);
          alert('삭제 실패');
          return;
        }
        navigate('/item-service/list'); // 페이지 이동을 navigate 함수로 처리
      });
    }
  }

  if (id === undefined) {
    return <div>유효하지 않은 ID입니다.</div>;
  }

  return (
    <div className={styles.container}>
      {item !== null && (
        <>
          <div className={styles.firstBox}>
            {bytes !== null && <img src={bytes} alt="이미지" className={styles.imageStyle} />}
          </div>
          <div
            className={styles.box}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {!isHovered &&
              <div className={styles.intro}>
                <p className={styles.customFontSize}>Introduction</p>
              </div>
            }
            {isHovered &&
              <div className={styles.hoverDetails}>

                <p>
                  <span className={styles.boldText}>Title</span><br />
                  <span className={styles.textChangeColor}>{item.title}</span>
                </p>


                <p>
                  <span className={styles.boldText}>Artist</span><br />
                  <span className={styles.textChangeColor}>{item.artist}</span>
                </p>


                <p>
                  <span className={styles.boldText}>Artist's Statement</span><br />
                  <span className={styles.textChangeColor}>{item.itemDescribe}</span>
                </p>

                <p>
                  <span className={styles.boldText}>Price</span><br />
                  <span className={styles.textChangeColor}>{item.qty}</span>
                </p>


                <p>
                  <span className={styles.boldText}>Price</span><br />
                  <span className={styles.textChangeColor}>{item.price}</span>
                </p>

                <p className={styles.textChangeColor}>Upload Date: {moment(item.createDate).format('YYYY-MM-DD hh:mm')}</p>
                <div className={styles.buttonContainer}>
                  <Link className={`${styles.buttonStyle} ${styles.buttonOne}`} to={`/order-service/orders/${id}`}>구매</Link>
                  <Link className={`${styles.buttonStyle} ${styles.buttonTwo}`} to={`/item-service/update/${id}`}>수정</Link>
                  <button className={`${styles.buttonStyle} ${styles.buttonThree}`} onClick={deleteHere}>삭제</button>
                </div>
              </div>
            }
          </div>
          <div
            className={styles.box}
            onMouseEnter={() => setIsHoveredComment(true)}
            onMouseLeave={() => setIsHoveredComment(false)}
          >
            {!isHoveredComment && <div className={styles.intro}>
              <p className={styles.customFontSize}>Comments</p></div>}

            {isHoveredComment &&
              <div style={{ position: 'absolute', bottom: 30, zIndex: 2 }}>
                <ReplyList bid={id} replies={replies} dispatch={dispatch} />
                <ReplyInsert bid={id} replies={replies} dispatch={dispatch} />
              </div>
            }
          </div>
        </>
      )}
    </div>
  );
};

export default ItemDetail;