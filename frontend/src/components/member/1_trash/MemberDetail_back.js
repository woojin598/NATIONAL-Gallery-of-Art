import React, { useEffect, useState, useContext } from "react";
import { LoginContext } from "../../../contexts/LoginContext";
import { Link, useParams } from 'react-router-dom'
import { fetchFn } from '../../../NetworkUtils';
import moment from 'moment';
import styles from './MemberDetail.module.css';

function MemberDetail() {
    const { loginInfo, setLoginInfo } = useContext(LoginContext); // useContext를 사용하여 LoginContext에서 loginInfo와 setLoginInfo를 가져옴
    const username = useParams().username; // URL 파라미터에서 username 값을 가져옴
    const [member, setMember] = useState(null); // 회원 정보를 저장할 상태 변수 선언
    const LOGINER = sessionStorage.getItem("LOGINER"); // 로그인 사용자 정보를 세션 스토리지에서 가져옴

    useEffect(() => {
        // 사용자 이름을 기반으로 회원 데이터를 가져옴
        fetchFn("GET", `http://localhost:8000/member-service/member/name/${username}`, null)
            .then(data => {
                setMember(data.result); // 가져온 회원 데이터를 상태 변수에 설정
            });
    }, [username]);

    return (
        <div className={styles.contentContainer}>
          <h2>마이페이지</h2>
          <h2>LOGINER: {loginInfo.LOGINER}</h2>
          {member !== null && (
            <>
              <div className={styles.member}>
                <p>Id: {member.username}</p>
                <p>이름: {member.name}</p>
                <p>성별: {member.gender}</p>
                <p>e-mail: {member.email}</p>
                <p>연락처: {member.phonenum}</p>
                <p>주소: {member.address}</p>
                <p>가입일: {moment(member.createDate).format("YYYY-MM-DD")}</p>
                <p>최종 수정일: {moment(member.updateDate).format("YYYY-MM-DD")}</p>
              </div>
    
              <div className={styles.menu}>
                <Link to={"/"}>홈으로</Link> |
                <Link to={"/member-service/list"}>목록</Link> |
    
                {loginInfo.LOGINER === member.username && (
                  <>
                    <Link to={`/member-service/update/${loginInfo.LOGINER}`}>회원 정보 수정</Link> |
                    <Link to={`/member-service/update/MemberUpdatePasswd/${username}`}>비밀번호 수정</Link> |
                    <Link to={`/member-service/delete/${username}`}>탈퇴하기</Link> |
                    <Link to="/item-service/insert" > 상품 등록</Link>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      );
    };
    
    export default MemberDetail;