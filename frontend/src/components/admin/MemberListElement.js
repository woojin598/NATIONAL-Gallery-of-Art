import React from 'react'

function MemberListElement(props) {
  return (
    <div>
    <span className="squaretxt1">{props.member.id}</span>{" "}
    {props.member.title}
    <hr />  
    </div>
  )
}

export default MemberListElement