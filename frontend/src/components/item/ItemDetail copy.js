import React, { useEffect, useReducer, useState } from 'react';
import { fetchFn } from '../../NetworkUtils';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ReplyInsert from '../reply/ReplyInsert';
import ReplyList from '../reply/ReplyList';
import moment from 'moment';
import './assets/ItemComp.module.css';

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
    <div>
      {item !== null && (
        <>
          <div>
            <div>
              <div>
                <div>
                  {bytes !== null && <img src={bytes} alt="이미지" />}
                </div>
              </div>
              <div>
                <div>
                  <p>작가명: {item.artist}</p>
                  <p>작품명: {item.title}</p>
                  <p>작품설명: {item.itemDescribe}</p>
                  <p>가격: {item.price}</p>
                  <p>등록날짜: {moment(item.createDate).format('YYYY-MM-DD hh:mm')}</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>
              <Link to={`/order-service/orders/${id}`}>구매</Link>|
              {item !== null &&
                <>
                  <Link to={`/item-service/update/${id}`}> 수정</Link>
                  <button onClick={deleteHere}>삭제</button>
                </>
              }
            </div>
          </div>
        </>
      )}

      <div>
        <ReplyList bid={id} replies={replies} dispatch={dispatch} />
      </div>

      <ReplyInsert bid={id} replies={replies} dispatch={dispatch} />
    </div>
  );
};


export default ItemDetail;