// MyPageTabLink.js
import React from "react";
import { Link } from "react-router-dom";
import styles from "./MyPage.module.css";

function MyPageTabLink({ to, label, activeTab, member, onClick }) {
  // member 정보를 이용하여 필요한 작업 수행
  // 예: member.username을 사용하여 동적인 처리 등

  return (
    <Link
      to={to}
      className={activeTab === to ? styles.activeTab : ""}
      onClick={() => onClick(to)}
    >
      {label}
    </Link>
  );
}

export default MyPageTabLink;
