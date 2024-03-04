import React, { useState } from 'react'
import styles from './MemberInsert.module.css';
import { fetchFn } from '../../../NetworkUtils';

function MemberInsert() {
    const [gender, setGender] = useState('');


    function onSubmitHandler(e){
        e.preventDefault();

        const formData = new FormData(e.target);
        const dto = {
            username:formData.get("username"),
            name:formData.get("name"),
            gender:formData.get("gender"),
            password:formData.get("password"),
            password2:formData.get("password2"),
            email:formData.get("email"),
            phonenum:formData.get("phonenum"),
            address:formData.get("address")
        };

        // memberInsertFetchFn(dto);
        fetchFn("POST",`http://localhost:8000/member-service/all/members`,dto)
        .then(data=> {
            if(data === undefined){
                console.log(data)
                alert("이미 존재하는 회원입니다.");
                window.location.href="/member-service/insert";
                return;
            }

            console.log(data); //test
            console.log(dto); //test
        
            window.location.href="/member-service/login";
    });

    }

    const handleGenderChange = (e) => {
        setGender(e.target.value);
      };



    return (
        <div>
            <h2>회원 가입</h2>
            <form action='#' onSubmit={onSubmitHandler}>
               
                Id: <input name='username' /><br />             
                비밀번호: <input name='password' /><br />
                비밀번호 확인: <input name='password2' /><br />
                이름: <input name='name' /><br />
                성별:
                    <label>
                    <input type="radio" name="gender" value="남자" checked={gender === "남자"} onChange={handleGenderChange} /> 남자
                    </label>
                    <label>
                    <input type="radio" name="gender" value="여자" checked={gender === "여자"} onChange={handleGenderChange} /> 여자
                    </label>
                    <br />
                연락처:<input name='phonenum' /><br />
                e-mail:<input name='email' /><br />
                주소:<input name='address' /><br />
                <button>Sign up</button>
            </form>

        </div>
    )
}

export default MemberInsert