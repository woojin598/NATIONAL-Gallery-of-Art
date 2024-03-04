import React, { useContext, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchFn } from '../../../../NetworkUtils';
import { LoginContext } from '../../../../contexts/LoginContext';

function MemberDelete() {
  const username = useParams().username;
  const passwordRef = useRef();
  const navigate = useNavigate();
  const { loginInfo, setLoginInfo } = useContext(LoginContext);

  function onSubmitHandler(e) {
    e.preventDefault();
    if (window.confirm('확인을 누르면 회원 정보가 삭제됩니다.')) {
      const password = passwordRef.current.value;
      const dto = {
        username,
        password
      };
      fetchFn("DELETE", "http://localhost:8000/member-service/member/delete", dto)
        .then(data => {
          console.log(data);
          if (data === undefined) {
            alert("삭제 실패");
            passwordRef.current.value = "";
            return;
          }
          sessionStorage.clear();
          alert('그동안 이용해주셔서 감사합니다.');
          navigate('/');
          sessionStorage.removeItem("BTOKEN");
          sessionStorage.removeItem("LOGINER");
          sessionStorage.removeItem("ROLE");
          setLoginInfo(null);
        })
        .catch(err => alert(err.response.data.message));
    } else {
      return;
    }
  }

  useEffect(() => {
    passwordRef.current.focus();
  }, []);

  const handleClick = () => {
    navigate(`/member-service/detail/${username}`); // 원하는 경로로 이동
  };

  return (
    <div>
      <h2>회원 정보 삭제</h2>
      <form onSubmit={onSubmitHandler}>
        username: <input value={username} readOnly /><br />
        password: <input ref={passwordRef} placeholder='비밀번호를 입력하세요.' />
        <button type="submit">탈퇴하기</button>
      </form>
      <br />
      <div>
        <button onClick={handleClick}>뒤로가기</button>
      </div>
    </div>
  );
}

export default MemberDelete;
