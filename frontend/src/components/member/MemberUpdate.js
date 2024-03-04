import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../contexts/LoginContext";
import { fetchFn } from "../../NetworkUtils";
import styles from "./MemberUpdate.module.css";
import { Container } from "react-bootstrap";

function MemberUpdate(props) {
  const { loginInfo } = useContext(LoginContext);
  const username = loginInfo && loginInfo.LOGINER;
  const [member, setMember] = useState(null);

  useEffect(() => {
    fetchFn(
      "GET",
      `http://localhost:8000/member-service/member/name/${username}`,
      null
    ).then((data) => {
      setMember(data.result);
    });
  }, [username]);

  function onInputHandler(e) {
    let val = e.target.value;
    let newMember = { ...member, [e.target.name]: val };
    setMember(newMember);
  }

  // 버튼 클릭 시 activeTab 상태를 업데이트하는 함수
  function handleDeleteButtonClick() {
    props.handleTabClick("delete");
  }

  function handlePasswordButtonClick() {
    props.handleTabClick("password");
  }

  function onSubmitHandler(e) {
    e.preventDefault();

    // 알림창 표시
    const confirmResult = window.confirm("수정하시겠습니까?");

    if (confirmResult) {
      const formData = new FormData(e.target);
      const name = formData.get("name");
      const gender = member.gender;
      const phonenum = formData.get("phonenum");
      const email = formData.get("email");
      const address = formData.get("address");
      const createAt = member.createAt;

      const dto = {
        username,
        name,
        gender,
        email,
        phonenum,
        address,
        createAt,
      };

      fetchFn(
        "PUT",
        `http://localhost:8000/member-service/member/update`,
        dto
      ).then((data) => {
        if (data === undefined) {
          alert("다시 확인 후 입력해주세요.");
          console.log(data);
          return;
        }

        window.location.href = `/member-service/mypage/${loginInfo.LOGINER}`;
      });
    }
  }

  return (
    <Container>
      <div className={styles.updateContainer}>
        <h2 className={styles.updateTitle}>회원 정보 수정</h2>
        {member !== null && (
          <form onSubmit={onSubmitHandler}>
            <div className={styles.formGroup}>
              <p className={styles.formTitle}>아이디</p>
              <p className={styles.formTitle}>{username}</p>
            </div>

            <div className={styles.formGroup}>
              <p className={styles.formTitle}>비밀번호</p>
              <button
                type="button"
                className={styles.goToPasswordTabButton}
                onClick={handlePasswordButtonClick}
              >
                변경
              </button>
            </div>

            <div className={styles.formGroup}>
              <h5 className={styles.formTitle}>이름</h5>
              <input
                name="name"
                value={member.name}
                onInput={onInputHandler}
                className={styles.inputField}
                placeholder="이름"
              />
            </div>

            <div className={styles.formGroup}>
              <h5 className={styles.formTitle}>성별:</h5>
              <p className={styles.formTitle}>{member.gender}</p>
            </div>

            <div className={styles.formGroup}>
              <h5 className={styles.formTitle}>이메일</h5>
              <input
                name="email"
                value={member.email}
                onInput={onInputHandler}
                className={styles.inputField}
                placeholder="e-mail"
              />
            </div>

            <div className={styles.formGroup}>
              <h5 className={styles.formTitle}>휴대폰 번호</h5>
              <input
                type="tel"
                name="phonenum"
                value={member.phonenum}
                onInput={onInputHandler}
                className={styles.inputField}
                placeholder="휴대폰 번호"
              />
            </div>

            <div className={styles.formGroup}>
              <h5 className={styles.formTitle}>주소</h5>
              <input
                name="address"
                value={member.address}
                onInput={onInputHandler}
                className={styles.inputField}
                placeholder="주소"
              />
            </div>

            {/* <div className={styles.formGroup}>
            <h5 className={styles.FormTitle}>가입일</h5>
            <p className={styles.FormTitle}>{moment(member.createDate).format("YYYY-MM-DD")}</p>
          </div> */}
            <hr />

            <div className={styles.formGroup}>
              <button
                className={styles.goToPasswordTabLink}
                onClick={handleDeleteButtonClick}
              >
                회원탈퇴
              </button>
            </div>

            <div className={styles.formGroupButton}>
              <button className={styles.submitButton}>확인</button>
              <button
                onClick={() => {
                  props.handleTabClick("detail");
                }}
                className={styles.submitButton}
              >
                뒤로가기
              </button>
            </div>
          </form>
        )}
      </div>
    </Container>
  );
}

export default MemberUpdate;
