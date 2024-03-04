import React, { useEffect, useState } from 'react'
import { fetchFn } from '../../NetworkUtils';
import MemberListPaging from './MemberListPaging';
import MemberComp from '../member/MemberComp';

function MemberList() {
    const [pageList, setPageList] = useState([]);
    //const [members, setMembers] = useState([]);

    // useEffect(() => {
    //     fetchFn("GET", "http://localhost:9007/api/member/all", null)
    //       .then(data => {
    //         console.log(data.list);
    //         setMembers(data.list);
    //       })
    //   }, []);

    

    useEffect(() => {
        fetchFn("GET", `http://localhost:8000/member-service/list?pageNum=0`)
        .then((data) => {
                setPageList(data.result.content);//이클립스에 구현
                //setMembers(data.list);
            }
        );
    }, []);

    return (
        <div>
            {
                //members.length > 0 && members.map(member => <MemberComp key={member.id} member={member}
                pageList.length > 0 && pageList.map(member => <MemberComp key={member.id} member={member} />)
            }

                <MemberListPaging setFn={setPageList} />
        </div>
    )
}

export default MemberList
