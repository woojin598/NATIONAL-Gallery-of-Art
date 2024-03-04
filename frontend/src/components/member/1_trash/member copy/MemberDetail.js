import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchFn } from '../../NetworkUtils';
import moment from 'moment';
import { useContext } from 'react';
import { LoginContext } from '../../contexts/LoginContext';

function MemberDetail() {
    const username = useParams().username;
    const [member, setMember] = useState(null);
    const LOGINER = sessionStorage.getItem("LOGINER");
    const { loginInfo, setLoginInfo } = useContext(LoginContext);
    

    useEffect(() => {
        fetchFn("GET", `http://localhost:8000/member-service/member/name/${username}`, null)
            .then(data => {
               
                setMember(data.result);
            })
    }, [username]);



    return (
        <div>
            <h2>마이페이지</h2>
 
            <h2>LOGINER: {loginInfo.LOGINER}</h2>
            <h2>BTOKEN: {loginInfo.BTOKEN}</h2>
            <h2>ROLE: {loginInfo.ROLE}</h2>
  
            {
                member !== null && 
                <>
                    <div className='member'>
                      
                        <p>Id: {member.username}</p>
                        <p>이름: {member.name}</p>
                        <p>성별: {member.gender}</p>
                        <p>e-mail: {member.email}</p>
                        <p>연락처: {member.phonenum}</p>
                        <p>주소: {member.address}</p>
                        <p>가입일: {moment(member.createDate).format("YYYY-MM-DD HH:mm:ss")}</p>
                        <p>최종 수정일: {moment(member.updateDate).format("YYYY-MM-DD HH:mm:ss")}</p>
                    </div>

                    <div className='menu'>
                        <Link to={"/"}>홈으로</Link> |
                        <Link to={"/member-service/list"}>목록</Link> |

                        {LOGINER === member.username && (
                            <>               
                        <Link to={`/member-service/update/${username}`}>회원 정보 수정</Link> |
                        <Link to={`/member-service/update/MemberUpdatePasswd/${username}`}>비밀번호수정</Link> |
                        <Link to={`/member-service/delete/${username}`}>탈퇴하기</Link> |
                        <Link to={"/item-service/insert"}>상품등록</Link> |
                        </>
                        )}
                    </div>
                </>
            }
        </div>
    )
}

export default MemberDetail