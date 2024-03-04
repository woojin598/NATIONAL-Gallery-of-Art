import React, { useContext, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchFn } from "../../NetworkUtils";
import { useCookies } from "react-cookie";
import { LoginContext } from "../../contexts/LoginContext";
import styles from "./MemberDelete.module.css";
import { Container } from "react-bootstrap";

function MemberDelete(props) {
  const username = useParams().username;
  const passwordRef = useRef();
  const navigate = useNavigate();
  const { loginInfo, setLoginInfo } = useContext(LoginContext);
  const [cookies, setCookie, removeCookie] = useCookies(["rememberLoginID"]);

  function onSubmitHandler(e) {
    e.preventDefault();
    if (window.confirm("확인을 누르면 회원 정보가 삭제됩니다.")) {
      const password = passwordRef.current.value;
      const dto = {
        username,
        password,
      };
      fetchFn(
        "DELETE",
        "http://localhost:8000/member-service/member/delete",
        dto
      )
        .then((data) => {
          console.log(data);
          if (data === undefined) {
            alert("삭제 실패");
            passwordRef.current.value = "";
            return;
          }
          setLoginInfo({ BTOKEN: null, LOGINER: null, ROLE: null });
          sessionStorage.clear();
          removeCookie("rememberLoginID");
          alert("그동안 이용해주셔서 감사합니다.");
          navigate("/");
        })
        .catch((err) => alert(err.response.data.message));
    } else {
      return;
    }
  }

  return (
    <Container className={styles.updateContainer}>
      <h2 className={styles.updateTitle}>회원탈퇴</h2>

      <form onSubmit={onSubmitHandler}>
        <div className={styles.formGroup}>
          <h5 className={styles.formTitle}>username</h5>
          <input
            className={styles.inputField}
            name="username"
            value={username}
            placeholder="username"
            readOnly
          />
        </div>

        <div className={styles.formGroup}>
          <h5 className={styles.formTitle}>password</h5>
          <input
            className={styles.inputField}
            ref={passwordRef}
            placeholder="비밀번호를 입력하세요."
          />
        </div>

        <div className={styles.formGroupButton}>
          <button type="submit" className={styles.submitButton}>
            탈퇴하기
          </button>
          <button
            onClick={() => {
              props.handleTabClick("update");
            }}
            className={styles.submitButton}
          >
            뒤로가기
          </button>
        </div>
      </form>
    </Container>
  );
}

export default MemberDelete;
