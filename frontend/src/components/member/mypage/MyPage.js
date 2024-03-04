import React, { useState, useContext, useEffect } from "react";
import styles from "./MyPage.module.css";
import { LoginContext } from "../../../contexts/LoginContext";
import { fetchFn } from "../../../NetworkUtils";
import MemberDetail from "../MemberDetail";
import MemberUpdate from "../MemberUpdate";
import MemberUpdatePasswd from "../MemberUpdatePasswd";
import MemberDelete from "../MemberDelete";
import { useParams } from "react-router-dom";
import MemberList from "../../admin/MemberList";
import ItemList from "../../item/ItemList";

function MyPage() {
  const [activeTab, setActiveTab] = useState("info");
  const { loginInfo } = useContext(LoginContext);
  const { username } = useParams(); // URL 파라미터에서 username 값을 가져옴
  const [member, setMember] = useState(null); // 회원 정보를 저장할 상태 변수 선언

  useEffect(() => {
    // 사용자 이름을 기반으로 회원 데이터를 가져옴
    fetchFn(
      "GET",
      `http://localhost:8000/member-service/member/name/${username}`,
      null
    ).then((data) => {
      setMember(data.result); // 가져온 회원 데이터를 상태 변수에 설정
    });
  }, [username]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.contentContainer}>
      {member !== null && (
        <>
          <div className={styles.banner}>
            <img
              src="/images/mem_detail_banner1.jpg"
              alt="Banner"
              className={styles.bannerImage}
            />
            <div className={styles.gradientBox}>MyPage</div>
            <div className={styles.menuTop}>
              {loginInfo.ROLE === "admin" && (
                <span
                  className={`${styles.activeTab} ${
                    activeTab === "list" ? styles.activeTab : ""
                  }`}
                  onClick={() => handleTabClick("list")}
                >
                  목록
                </span>
              )}
              {loginInfo.LOGINER !== null && (
                <>
                  <span
                    className={`${styles.activeTab} ${
                      activeTab === "detail" ? styles.activeTab : ""
                    }`}
                    onClick={() => handleTabClick("detail")}
                  >
                    나의 프로필
                  </span>
                  <span
                    className={`${styles.activeTab} ${
                      activeTab === "update" ? styles.activeTab : ""
                    }`}
                    onClick={() => handleTabClick("update")}
                  >
                    나의 정보 수정
                  </span>
                  {/* 비밀번호수정탭 숨김 ture/false */}
                  {false && (
                    <span
                      className={`${styles.activeTab} ${
                        activeTab === "password" ? styles.activeTab : ""
                      }`}
                      onClick={() => handleTabClick("password")}
                    >
                      비밀번호 수정
                    </span>
                  )}

                  {/* 탈퇴하기탭 숨김 ture/false */}
                  {false && (
                    <span
                      className={`${styles.activeTab} ${
                        activeTab === "delete" ? styles.activeTab : ""
                      }`}
                      onClick={() => handleTabClick("delete")}
                    >
                      탈퇴하기
                    </span>
                  )}

                  <span
                    className={`${styles.activeTab} ${
                      activeTab === "itemList" ? styles.activeTab : ""
                    }`}
                    onClick={() => handleTabClick("itemList")} // itmeList -> itemList 수정
                  >
                    나의 상품 목록
                  </span>
                </>
              )}
            </div>
          </div>
          <div className={styles["hr-sect"]}></div>
          <div className={styles.tabContent}>
            {activeTab === "detail" && (
              <div className={styles.member}>
                <MemberDetail
                  member={member}
                  handleTabClick={handleTabClick} //props.activeTab 함수호출
                />
              </div>
            )}
            {activeTab === "update" && (
              <div className={styles.member}>
                <MemberUpdate member={member} handleTabClick={handleTabClick} />
              </div>
            )}
            {activeTab === "password" && (
              <div className={styles.member}>
                <MemberUpdatePasswd
                  member={member}
                  handleTabClick={handleTabClick}
                />
              </div>
            )}
            {activeTab === "delete" && (
              <div className={styles.member}>
                <MemberDelete member={member} handleTabClick={handleTabClick} />
              </div>
            )}
            {activeTab === "MemberList" && (
              <div className={styles.member}>
                <MemberList member={member} handleTabClick={handleTabClick} />
              </div>
            )}
            {activeTab === "ItemList" && (
              <div className={styles.member}>
                <ItemList member={member} handleTabClick={handleTabClick} />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default MyPage;
