import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { fetchFn } from '../../../../NetworkUtils';

function MemberUpdatePasswd() {
    const username = useParams().username;
    const [member, setMember] = useState(null);

    useEffect(()=>{
        fetchFn("GET",`http://localhost:8000/member-service/member/name/${username}`,null)
        .then(data=>{
            setMember(data.result);
        });
    },[username]);

    function onInputHandler(e){
        let val = e.target.value;

        let newMember = {...member, [e.target.name]:val};

        setMember(newMember); 
    }

    function onSubmitHandler(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        const password = formData.get("password");
        const password2 = formData.get("password2");
        const orgPassword = formData.get("orgPassword");



        const dto = {
            username,
            password,
            password2,
            orgPassword
        };

        fetchFn("PUT",`http://localhost:8000/member-service/member/updatePasswd/${username}`,dto)
        .then(data=>{
            if(data === undefined){
                alert("다시 확인 후 입력해주세요.");
                window.location.href=`/member-service/detail/${username}`;
                return;
            }

          window.location.href=`/member-service/detail/${data.result.username}`;  
        })
    }


    function detail(){

        window.location.href=`/member-service/detail/${username}`;// 회원 상세히보기 화면으로
    }

    


  return (
    <div>
        <h2>비밀번호 변경</h2>
        {
            member !== null &&
        <form action='#' onSubmit={onSubmitHandler}>
            현재 비밀번호 : <input name='orgPassword' value ={member.orgPassword} onInput={onInputHandler}/><br/>
            새 비밀번호 : <input name='password' value ={member.password} onInput={onInputHandler}/><br/>
            새 비밀번호 확인 : <input name='password2' value ={member.password2} onInput={onInputHandler}/><br/>
            <button onClick={detail}>확인</button>
            <button onClick={detail}>취소</button>
        </form>
}

    </div>
  )
}

export default MemberUpdatePasswd