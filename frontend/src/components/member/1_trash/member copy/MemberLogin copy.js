import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Nav, Form, FormGroup, FormControl, Button } from "react-bootstrap";
import styles from './MemberLogin.module.css';
import { fetchFn } from "../../NetworkUtils";
import { LoginContext } from "../../contexts/LoginContext";
import { useCookies } from 'react-cookie';



const MemberLogin = () => {
  const { loginInfo, setLoginInfo } = useContext(LoginContext);

  const [cookies, setCookie, removeCookie] = useCookies(['rememberLoginID']);
  const [loginID, setLoginID] = useState('');
  const [isRemember, setIsRemember] = useState(false);

  const [loginPassword, setLoginPassword] = useState('');
  const [activeTab, setActiveTab] = useState("login");
  const [saveIDFlag, setSaveIDFlag] = useState(false);
  const [passwordOption, setPasswordOption] = useState(false);
  const [passwordInputType, setPasswordInputType] = useState({
    type: "password",
    autoComplete: "current-password",
  });




  
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };





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

          sessionStorage.setItem("BTOKEN", data.result.token);
          sessionStorage.setItem("LOGINER", data.result.username);
          sessionStorage.setItem("ROLE", data.result.role);
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
    const idFlag = JSON.parse(sessionStorage.getItem("LOGINER_ID_FLAG"));
    if (idFlag !== null) {
      setSaveIDFlag(idFlag);
    }

    const data = sessionStorage.getItem("LOGINER");
    if (data !== null) {
      setLoginID(data);
    }
  }, []);

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
    <Container>
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
            <div className={styles["login-form"]} >
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
                  <Form id="loginForm" onSubmit={onSubmitHandler} 
                  className={styles.login_form}>
                    <FormGroup>
                      <FormControl
                        type="text"
                        id="loginID"
                        name="username"
                        placeholder="아이디"
                        value={loginID}
                        onChange={handleLoginIDChange}
                        className={styles["loginID"]}
                      />
                      <div className={styles["login_spacing"]} />
                      <FormControl
                        type={passwordOption ? "text" : "password"}
                        name="password"
                        placeholder="비밀번호"
                        autoComplete={passwordOption ? "on" : "current-password"}
                        value={loginPassword}
                        onChange={handleLoginPasswordChange}
                        className={styles["loginPassword"]}
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
                  
                </div>

                <div className={styles["signup-form"]}>
                {/* 아이디 찾기, 비밀번호 찾기, 회원가입 탭 formGroupInsert */}
                <ul className="list-unstyled mt-3">
                <div>NATIONAL Gallery of Art에 처음이세요? <Link to="/member-service/insert" className={styles.insertLink}>회원가입</Link></div>

                </ul>
              </div>

              </div>

              <Form>
                <li className="list-unstyled">
                <br />
                <p>또는 쇼설</p>
                <hr/>
                <Link to="">
                  <button className={styles["btn-login-social_wrap"]}>
                  <p>카카오로그인 구현예정</p>
                    {/* <img
                      src="/images/btn_kakao_signin.png"
                      alt="카카오 로고"
                      className={styles["login-social_icon"]}
                    /> */}
                  </button>
                </Link>
                <br />
                <Link to="">
                  <button className={styles["btn-login-social_wrap"]}>
                  <p>페북로그인 구현예정</p>
                    {/* <img
                      src="/images/btn_google_signin.png"
                      alt="페이스북 로고"
                      className={styles["login-social_icon"]}
                    /> */}
                  </button>
                </Link>
              </li>
              </Form>

              

            <div className={styles.login_wrap2}>
            
            </div>
            </div>
          <hr />
        </Col>
      </Row>
    </Container>
  );
};

export default MemberLogin;