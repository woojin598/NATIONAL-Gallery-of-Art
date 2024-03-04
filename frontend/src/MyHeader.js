import React, { useContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import Menu from './components/menu/Menu';
import SearchComponent from './components/item/SearchComp';
import { LoginContext } from './contexts/LoginContext';

function MyHeader() {
  const { loginInfo, setLoginInfo } = useContext(LoginContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies(['rememberLoginID']);

  const handleLogout = () => {
    setLoginInfo({ BTOKEN: null, LOGINER: null, ROLE: null });
    sessionStorage.clear();
    localStorage.removeItem("LOGINER");
    localStorage.removeItem("BTOKEN");
    localStorage.removeItem("ROLE");
    removeCookie('rememberLoginID');
    window.location.href = "/member-service/login";
  };
  const handleLogin = (userInfo) => {
    // 로그인 정보를 로컬 스토리지에 저장
    localStorage.setItem("LOGINER", userInfo.LOGINER);
    localStorage.setItem("BTOKEN", userInfo.BTOKEN);
    localStorage.setItem("ROLE", userInfo.ROLE);
    // 기타 로그인 관련 작업 수행
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    window.location.href = `/item-service/search/${searchTerm}`;
  };

  const items = [
    {
      name: "About",
      color: "#f44336",
      href: "/about"
    },
    {
      name: loginInfo && loginInfo.LOGINER ? "LogOut" : "LogIn",
      color: "#e91e63",
      href: loginInfo && loginInfo.LOGINER ? null : "/member-service/login",
      onClick: loginInfo && loginInfo.LOGINER ? handleLogout : null,
    },

    {
      name: "작품등록",
      color: "#9c27b0",
      href: "/item-service/insert"
    },
    {
      name: "GALLERY",
      color: "#673ab7",
      href: "/item-service/list"
    },
    {
      name: "CONTACT",
      color: "#3f51b5",
      href: "/contact"
    }
  ];

  if (loginInfo && loginInfo.LOGINER) {
    items.push({
      name: "MyPage",
      color: "#00C853",
      href: `/member-service/mypage/${loginInfo.LOGINER}`,
      // href: `/member-service/detail/${loginInfo.LOGINER}`,
    });
  }


  return (
    <div>
      <div className="header-container">
        <div className="logo-container">
          <span className="logo-image" onClick={() => { window.location.href = "/"; }}>
            <img src={`${process.env.PUBLIC_URL}/images/logo2.png`} alt="로고" style={{ width: '180px', height: '180px' }} />
          </span>
        </div>
        <Menu items={items} handleLogout={handleLogout} />
        <SearchComponent loginInfo={loginInfo} />
      </div>
    </div>
  );
}

export default MyHeader;
