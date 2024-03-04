import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { fetchFn } from '../../../../NetworkUtils';

function MemberUpdate() {
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
        const name = formData.get("name");
        const gender = member.gender;
        const phonenum = formData.get("phonenum");
        const email = formData.get("email");
        const address = formData.get("address");
        const createAt = member.createAt;


        const dto = {
            username,
            name,
            gender,
            email,
            phonenum,
            address,
            createAt
        };

        fetchFn("PUT",`http://localhost:8000/member-service/member/update`,dto)
        .then(data=>{
            if(data === undefined){
                alert("다시 확인 후 입력해주세요.");
                console.log(data); //test
                //console.log(dto); //test
                //window.location.href=`/member-service/detail/${username}`;
                return;
            }

            console.log(data);
            console.log(dto);

          window.location.href=`/member-service/detail/${username}`;  
        })
    }


  return (
    <div>
        <h2>회원 정보 수정</h2>
        {
            member !== null &&
        <form action='#' onSubmit={onSubmitHandler}>
            Id : {username}<br/>
            이름 : <input name='name' value ={member.name} onInput={onInputHandler}/><br/>
            성별: {member.gender}<br/>
            e-mail: <input name='email' value ={member.email} onInput={onInputHandler}/><br/>
            연락처 : <input name='phonenum' value ={member.phonenum} onInput={onInputHandler}/><br/>
            주소 : <input name='address' value ={member.address} onInput={onInputHandler}/><br/>
            가입일: {member.createAt}<br/>
        
            <button>확인</button>
        </form>
}

    </div>
  )
}

export default MemberUpdate