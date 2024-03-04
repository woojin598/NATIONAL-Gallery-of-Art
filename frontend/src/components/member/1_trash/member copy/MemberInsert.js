import React, { useState } from 'react'
import styles from './MemberInsert.module.css';
import { fetchFn } from '../../NetworkUtils';
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

function MemberInsert() {
  const [gender, setGender] = useState('');
  const [agreed, setAgreed] = useState(false); // 추가: 동의 여부 상태


  function onSubmitHandler(e) {
    e.preventDefault();

    if (!agreed) {
      alert('서비스 약관과 개인 정보 보호 정책에 동의해주세요.');
      return;
    }

    const formData = new FormData(e.target);
    const dto = {
      username: formData.get("username"),
      name: formData.get("name"),
      gender: formData.get("gender"),
      password: formData.get("password"),
      password2: formData.get("password2"),
      email: formData.get("email"),
      phonenum: formData.get("phonenum"),
      address: formData.get("address")
    };

    // memberInsertFetchFn(dto);
    fetchFn("POST", `http://localhost:8000/member-service/all/members`, dto)
      .then(data => {
        if (data === undefined) {
          console.log(data)
          alert("이미 존재하는 회원입니다.");
          window.location.href = "/member-service/insert";
          return;
        }

        console.log(data); //test
        console.log(dto); //test

        window.location.href = "/member-service/login";
      });



  }

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleAgreeChange = () => {
    setAgreed(!agreed);
  };







  return (
    <Container>
      <Row className="justify-content-center mt-5" >
      <Col>
      <h2 className={styles.signupHeading}>ID 생성</h2>
      <p>"예술로 빛나는 문화 속 회원이 되어주세요!"</p>
      <div className={styles.signupContainer}>
      <form action="#" onSubmit={onSubmitHandler} className={styles.signupForm}>
        <div className={styles.formGroup}>
          <input type="text" name="username" className={styles.inputField} placeholder="아이디" />
        </div>

        <div className={styles.formGroup}>
          <input type="password" name="password" className={styles.inputField} placeholder="비밀번호" />
        </div>

        <div className={styles.formGroup}>
          <input type="password" name="password2" className={styles.inputField} placeholder="비밀번호 확인" />
        </div>

        <div className={`${styles.formGroup} ${styles.formGroupRow}`}>
  <input type="text" name="name" className={styles.inputField} placeholder="이름" />
  <div className={styles.genderCheckontainer}>
    <label className={styles.FormCheck_Label}>
      <input
        type="radio"
        className={styles.FormCheck_Input}
        id="male"
        name="gender"
        value="남자"
        checked={gender === '남자'}
        onChange={handleGenderChange}
      />남자
    </label>
    <label className={styles.FormCheck_Label}>
      <input
        type="radio"
        className={styles.FormCheck_Input}
        id="female"
        name="gender"
        value="여자"
        checked={gender === '여자'}
        onChange={handleGenderChange}
      />여자
    </label>
  </div>
</div>

        <div className={styles.formGroup}>
          <input type="tel" name="phonenum" className={styles.inputField} placeholder="연락처" />
        </div>
        <div className={styles.formGroup}>
          <input type="email" name="email" className={styles.inputField} placeholder="e-mail" />
        </div>
        <div className={styles.formGroup}>
          <input type="text" name="address" className={styles.inputField} placeholder="주소" />
        </div>
        <br />
        <div className={styles.formGroup}>
          <button type="submit" className={styles.submitButton}>
            회원 가입
          </button>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.FormCheck_Label}>
            <input
              type="checkbox"
              id="agree"
              className={styles.FormCheck_Input}
              checked={agreed}
              onChange={handleAgreeChange}
            />
            <span className={styles.checkboxLabel}>
              NATIONAL Gallery of Art의 <a href="/NATIONALGalleryofArt/Terms">서비스 약관</a>, <a href="/NATIONALGalleryofArt/privacy">개인 정보 보호 정책</a>에 동의합니다.
            </span>
          </label>
          </div>

        <form className={styles.formGroupLogin}>
  <div>이미 계정이 있으신가요? <Link to="/member-service/login" className={styles.loginLink}>로그인</Link></div>
</form>


      </form>
    </div>
    </Col>
    </Row>
    </Container>
  );
}

export default MemberInsert