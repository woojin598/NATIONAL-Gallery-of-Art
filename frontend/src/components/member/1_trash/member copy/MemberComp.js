import moment from 'moment';
import React from 'react'
import { Link } from 'react-router-dom';

function MemberComp(props) {
    const member = props.member;

  return (
    <div>
       {/* <p>id:{member.id}</p> */}
        <p>사용자: <Link to={`/member-service/detail/${member.username}`}>{member.username}</Link></p>
        <p>이름: {member.gender}</p>
        <p>성별: {member.name}  </p>
        <p>e-mail: {member.email}  </p>
        <p>연락처: {member.phonenum}  </p>
        <p>주소: {member.address}  </p>
        <p>가입일: {moment(member.createDate).format("YYYY-MM-DD HH:mm:ss")}</p>
        <p>회원정보 수정일: {moment(member.updateDate).format("YYYY-MM-DD HH:mm:ss")}</p>
    </div>

  )
}

export default MemberComp