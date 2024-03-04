import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Nav, Form, FormGroup, FormControl, Button } from "react-bootstrap";
import styles from './MemberLogin.module.css';
import { fetchFn } from "../../../NetworkUtils";
import { LoginContext } from "../../../contexts/LoginContext";
import { useCookies } from 'react-cookie';



const MemberLogin = () => {
  const { loginInfo, setLoginInfo } = useContext(LoginContext);

  const [cookies, setCookie, removeCookie] = useCookies(['rememberLoginID']);
  const [loginID, setLoginID] = useState('');
  const [isRemember, setIsRemember] = useState(false);

  const [loginPassword, setLoginPassword] = useState('');
  const [activeTab, setActiveTab] = useState("login");

  const [passwordOption, setPasswordOption] = useState(false);
  const [passwordInputType, setPasswordInputType] = useState({
    type: "password",
    autoComplete: "current-password",
  });

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };


  // @@@@카카오 로그인[백단 수정예정]
  const handleKakaoLogin = () => {
    const Rest_api_key = '83bcfdb679bf4de14da3a1f6f58db4f7'; // REST API KEY
    const redirect_uri = 'http://localhost:3000'; // Redirect URI
  
    // oauth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
    window.location.href = kakaoURL;
  };

  const code = new URL(window.location.href).searchParams.get("code"); //인가코드 추출

 

  //아이디를 쿠키에 저장합니다.
  useEffect(() => {
    if(cookies.rememberLoginID !== undefined) {
      setLoginID(cookies.rememberLoginID);
      setIsRemember(true);
    }
 }, []);

 const handleOnChange = (e) => {
  const newLoginID = e.target.value;
  setIsRemember(e.target.checked);

  setCookie('rememberLoginID', e.target.checked ? newLoginID : '', { maxAge: 2000 });
};

useEffect(() => {
  if (isRemember) {
    setCookie('rememberLoginID', loginID, { maxAge: 2000 });
  } else {
    removeCookie('rememberLoginID');
  }
}, [isRemember, loginID, setCookie, removeCookie]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    const dto = {
      username,
      password,
    };

    if (activeTab === "login") {
      fetchFn("POST", "http://localhost:8000/member-service/all/login", dto)
        .then((data) => {
          if (data.result === "id를 바르게 입력하세요." || data.result === "비밀번호를 바르게 입력하세요." || data.result === "사용자명이나 비밀번호가 잘못 되었습니다.") {
            alert(data.result);
            return;
          }

          sessionStorage.setItem("BTOKEN", data.result.token); //페치수정
          //sessionStorage.setItem("LOGINER", data.result.username); // 아이디 저장
          //sessionStorage.setItem("ROLE", data.result.role);
          setLoginInfo({
            BTOKEN: data.result.token,
            LOGINER: data.result.username,
            ROLE: data.result.role
          });

          window.location.href = `/member-service/detail/${username}`;
        });
    } else if (activeTab === "admin") {
      // TODO: 관리자 로그인 처리 로직 추가
    }
  };

  const handleLoginIDChange = (e) => {
    setLoginID(e.target.value);
  };

  const handleLoginPasswordChange = (e) => {
    setLoginPassword(e.target.value);
  };



  useEffect(() => {
    if (passwordOption === false) {
      setPasswordInputType({
        type: "password",
        autoComplete: "current-password",
      });
    } else {
      setPasswordInputType({
        type: "text",
        autoComplete: "on",
      });
    }
  }, [passwordOption]);
  const isAdmin = activeTab === "admin";



  return (
    <Container className={styles["login-container"]}>
      <Row className="justify-content-center mt-5" >
        <Col>
        <div className={styles.bannerContainer}>
        <div className={styles.bannerImageContainer}>
          <img
            src="/images/mem_login_ex_banner2.jpg"
            alt="회원가입 배너 이미지"
            className={styles.yourImageClass}
          />
        </div>
      </div>
      <div className={styles["login_wrap_container"]}>
              <div className={styles["login_wrap"]} >
                <div className={styles["login_content"]} >
                  {/* 로그인 및 관리자 로그인 탭 */}
                  <Nav variant="tabs" className={`${styles.login_tabs}`}>
                    <Nav.Item>
                      <Nav.Link
                        onClick={() => handleTabClick("login")}
                        active={activeTab === "login"}
                        className={`${styles["nav-link"]} ${activeTab === "login" ? styles.active : ""}`}
                      >
                        로그인
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        onClick={() => handleTabClick("admin")}
                        active={activeTab === "admin"}
                        className={`${styles["nav-link"]} ${activeTab === "admin" ? styles.active : ""}`}
                      >
                        관리자 로그인
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                  {/* 로그인 폼 */}
                  <Form id="loginForm" onSubmit={onSubmitHandler} >
                    <FormGroup>
                      <FormControl
                        type="text"
                        id="loginID"
                        name="username"
                        placeholder="아이디"
                        value={loginID}
                        onChange={handleLoginIDChange}
                        className={styles["inputField"]}
                      />
                      <FormControl
                        type={passwordOption ? "text" : "password"}
                        name="password"
                        placeholder="비밀번호"
                        autoComplete={passwordOption ? "on" : "current-password"}
                        value={loginPassword}
                        onChange={handleLoginPasswordChange}
                        className={styles["inputField"]}
                      />
                    </FormGroup>
                    <div className={styles.CheckboxContainer}>
                      <label className={styles.FormCheck_Label}>
                        <input
                          type="checkbox"
                          className={styles.FormCheck_Input}
                          checked={isRemember}
                          onChange={handleOnChange}
                        />
                        아이디 저장
                      </label>
                      <label className={styles.FormCheck_Label}>
                        <input
                          type="checkbox"
                          className={styles.FormCheck_Input}
                          checked={passwordOption}
                          onChange={() => setPasswordOption(!passwordOption)}
                        />
                        비밀번호 표시
                      </label>
                    </div>
                    <Button variant="primary" type="submit" className={styles["btn_login"]}>
                      {isAdmin ? "관리자 로그인" : "로그인"}
                    </Button>
                  </Form>
                  <ul className="list-unstyled mt-3">
                  <div>NATIONAL Gallery of Art에 처음이세요? <Link to="/member-service/insert" 
                className={styles.insertLink}>계정만들기</Link></div>
                </ul>
                </div>
              </div>
              <div className={styles["signup-form"]}>
                <div className={styles["hr-sect"]}>또는</div>
                <p>간편로그인</p>
                  <button className={styles["btn-login-social_wrap"]}  onClick={handleKakaoLogin}>
                    <img
                      src="/images/btn_kakao_signin.png"
                      alt="카카오 로고"
                      className={styles["login-social_icon"]}
                    />
                  </button>
              {/* <p>계정을 만들면 더 빨리 결제하고, 둘 이상의 주소를 유지하고,주문을 추적하는 등 많은 이점이 있습니다.</p> */}
              </div>
              </div>
        </Col>
      </Row>    
    </Container>
  );
};


export default MemberLogin;