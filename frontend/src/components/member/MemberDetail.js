import React, { useEffect, useState, useContext } from "react";
import { LoginContext } from "../../contexts/LoginContext";
import { Link, useParams } from "react-router-dom";
import { fetchFn } from "../../NetworkUtils";
import moment from "moment";
import styles from "./MemberDetail.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faFemale,
  faIdCard,
  faPhone,
  faMapMarker,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";

function MemberDetail() {
  const { loginInfo, setLoginInfo } = useContext(LoginContext); // useContext를 사용하여 LoginContext에서 loginInfo와 setLoginInfo를 가져옴
  const username = useParams().username; // URL 파라미터에서 username 값을 가져옴
  const [member, setMember] = useState(null); // 회원 정보를 저장할 상태 변수 선언
  const LOGINER = sessionStorage.getItem("LOGINER"); // 로그인 사용자 정보를 세션 스토리지에서 가져옴

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

  return (
    <div className={styles.profileContainer}>
      {member && (
        <div className={styles.profileWrapper}>
          <div className={styles.profileColumn}>
            <div className={styles.profileImage}>
              <img
                src={member.profileImageUrl || "/images/mem_detail_user.png"}
                alt={
                  member.profileImageUrl
                    ? "프로필 사진"
                    : "프로필 디폴트 이미지"
                }
                className={styles.profileImage}
              />
            </div>
            <div className={styles.profileInfo}>
              <h2>{member.name}</h2>
              <p>{member.username}</p>
              <div className={styles["hr-sect"]}></div>
            </div>
          </div>
          <div className={styles.customProfileDetails}>
            <ul className={styles.customProfileList}>
              <div className={styles.inputField}>
                <p>기본 정보</p>
                <li>
                  <FontAwesomeIcon icon={faUser} /> <strong>이름:</strong>{" "}
                  {member.name}
                </li>
                <li>
                  <FontAwesomeIcon icon={faIdCard} /> <strong>아이디:</strong>{" "}
                  {member.username}
                </li>
                <li>
                  <FontAwesomeIcon icon={faEnvelope} /> <strong>이메일:</strong>{" "}
                  {member.email}
                </li>
              </div>
              <div className={styles.inputField}>
                <li>
                  <FontAwesomeIcon icon={faPhone} /> <strong>연락처:</strong>{" "}
                  {member.phonenum}
                </li>
                <li>
                  <FontAwesomeIcon icon={faFemale} /> <strong>성별:</strong>{" "}
                  {member.gender}
                </li>
                <li>
                  <FontAwesomeIcon icon={faMapMarker} /> <strong>주소:</strong>{" "}
                  {member.address}
                </li>
                <li>
                  <FontAwesomeIcon icon={faCalendar} /> <strong>가입일:</strong>{" "}
                  {moment(member.createDate).format("YYYY-MM-DD")}
                </li>
              </div>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default MemberDetail;
