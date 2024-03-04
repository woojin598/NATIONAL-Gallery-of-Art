import React, { useContext, useEffect, useRef, useState } from "react";
import { LoginContext } from "../../contexts/LoginContext";
import { fetchFn } from "../../NetworkUtils";
import styles from "./MemberUpdatePasswd.module.css";
import { Container } from "react-bootstrap";

function MemberUpdatePasswd(props) {
  const { loginInfo } = useContext(LoginContext);
  const [member, setMember] = useState(null);

  useEffect(() => {
    fetchFn(
      "GET",
      `http://localhost:8000/member-service/member/name/${
        loginInfo && loginInfo.LOGINER
      }`,
      null
    ).then((data) => {
      setMember(data.result);
    });
  }, [loginInfo]);

  function onInputHandler(e) {
    let val = e.target.value;
    let newMember = { ...member, [e.target.name]: val };
    setMember(newMember);
  }

  function onSubmitHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const password = formData.get("password");
    const password2 = formData.get("password2");
    const orgPassword = formData.get("orgPassword");

    const dto = {
      username: loginInfo && loginInfo.LOGINER,
      password,
      password2,
      orgPassword,
    };

    fetchFn(
      "PUT",
      `http://localhost:8000/member-service/member/updatePasswd/${
        loginInfo && loginInfo.LOGINER
      }`,
      dto
    ).then((data) => {
      if (data === undefined) {
        alert("다시 확인 후 입력해주세요.");
        props.handleTabClick("password");
        return;
      }
      alert("비밀번호 변경이 완료되었습니다. 다시 로그인해주세요.");
      handleLogout();
    });
  }

  function handleLogout() {
    window.location.href = "/member-service/login";
  }

  return (
    <Container className={styles.updateContainer}>
      <h2 className={styles.updateTitle}>비밀번호 변경</h2>
      {member !== null && (
        <form onSubmit={onSubmitHandler}>
          <div className={styles.formGroup}>
            <h5 className={styles.formTitle}>현재 비밀번호</h5>
            <input
              className={styles.inputField}
              name="orgPassword"
              value={member.orgPassword}
              onInput={onInputHandler}
              placeholder="현재 비밀번호"
            />
          </div>
          <div className={styles.formGroup}>
            <h5 className={styles.formTitle}>새 비밀번호</h5>
            <input
              className={styles.inputField}
              name="password"
              value={member.password}
              onInput={onInputHandler}
              placeholder="새 비밀번호"
            />
          </div>
          <div className={styles.formGroup}>
            <h5 className={styles.formTitle}>새 비밀번호 확인</h5>
            <input
              className={styles.inputField}
              name="password2"
              value={member.password2}
              onInput={onInputHandler}
              placeholder="새 비밀번호 확인"
            />
          </div>
          <div className={styles.formGroupButton}>
            <button className={styles.submitButton}>수정</button>
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
      )}
    </Container>
  );
}

export default MemberUpdatePasswd;
