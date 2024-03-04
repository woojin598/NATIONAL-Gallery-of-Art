import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LoginContext } from './contexts/LoginContext';
import logoImage from './images/logo2.png';

function NavScrollExample() {
  const { loginInfo, setLoginInfo } = useContext(LoginContext);
  /* const isLoggedIn = Boolean(loginInfo); */

  const handleLogout = () => {
    setLoginInfo({ BTOKEN: null, LOGINER: null, ROLE: null });
    // React의 useState는 객체의 내부 속성의 변화에 감지를 못함. 객체를 변화해야 감지하고 상태변화하는 재랜더링
    // 세션의 값도 따로 변경해주어야함
    sessionStorage.removeItem("BTOKEN");
    sessionStorage.removeItem("LOGINER");
    sessionStorage.removeItem("ROLE");
 /*    setLoginInfo(null); */
    window.location.href = "/member-service/login";
    
  };

  const handleLogin = () => {
    window.location.href = "/member-service/login";
  
  };

  const handleInsert = () => {
    window.location.href = "/member-service/insert";
  
  };

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    window.location.href = `/item-service/search/${searchTerm}`;
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container fluid>
        <Nav.Link href="/">
          <span className="logo-image" onClick={() => {window.location.href = "/";}}>
            <img src={logoImage} alt="로고" style={{ width: '200px', height: '200px' }} />
          </span>
        </Nav.Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              {(loginInfo && loginInfo.LOGINER) ? (
                <>
                <div>
                <Nav.Link href={`/member-service/detail/${loginInfo.LOGINER}`}>마이페이지</Nav.Link>
                  </div>
                  <div>
                  <Nav.Link onClick={handleLogout}>로그아웃</Nav.Link>
                </div>
                </>
              ) : (
                <>
                <div>
                  <Nav.Link onClick={handleInsert}>회원가입</Nav.Link>
                </div>
                <div>
                <Nav.Link onClick={handleLogin}>로그인</Nav.Link>
              </div>
              </>
              )}
              <Nav.Link href="/item-service/insert">글 쓰기</Nav.Link>
              <Nav.Link href="/item-service/list">글 목록</Nav.Link>
            </Nav>
            <div>
              <input type="search" class="form-control form-control-dark text-bg-dark" aria-label="Search" value={searchTerm}
                onChange={handleSearchTermChange}
                placeholder="Search"></input>
              <Button type="button" class="btn btn-outline-light me-2" onClick={handleSearch}>검색</Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavScrollExample;
