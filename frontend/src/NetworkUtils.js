export function fetchFn(method, url, dto) {
    let options = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    const token = sessionStorage.getItem("BTOKEN");
  
    if (token !== null && token.length > 0) {
      options.headers.Authorization = "Bearer " + token;
    }
  
    if (dto) {
      options.body = JSON.stringify(dto);
    }
  
    return fetch(url, options)
      .then((res) => {
        if (res.status === 403) {
          window.location.href = "/item-service/list";
        }
        if (!res.ok) {
          throw new Error("입력 실패유");
        }
        
        const contentType = res.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          return res.json();
        } else {
          return null; // 또는 원하는 처리를 수행할 수 있는 값으로 수정
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  
// export function fetchFn(method, url, dto){

//     let options = {
//         method : method,
//         headers : {
//             "Content-Type" : "application/json"
//         }
//     };

//     const token = sessionStorage.getItem("BTOKEN")

//     if(token !== null && token.length>0 ){
//         options.headers.Authorization = "Bearer "+ token; // 토큰시작 indext 확인
//     }

//     if(dto){
//         options.body = JSON.stringify(dto);
//     }
    
//     return fetch(url, options)
//     .then(res =>{
//         if(res.status===403){
//             window.location.href="/item-service/list";
//         }
//         if(!res.ok){
//             throw new Error("입력 실패유");
//         }
//         return res.json();
//     })
//     .catch(error=>{
//         alert(error.message);
//     });
// }
export function uploadFetchFn(servicename, dto, is){
    return fetchFn("GET", `http://localhost:8000/${servicename}/${is}`, dto)
    .then(data =>{
        console.log(data.result);
        if(servicename === "auth"){
            servicename = "member";
        }
        let what = `${data.result.id}`;
        if(servicename === "member"){
            what = data.result.username;
        }
        if(servicename === "reply-service"){
            servicename = "item-service"
            what = data.result.bid;
        }
        window.location.href=`/${servicename}/detail/${what}`
    })
}

export function insertFetchFn(servicename, dto, is){
    return fetchFn("POST", `http://localhost:8000/${servicename}/${is}`, dto)
    .then(data =>{
       
        if(servicename === "auth"){
            servicename = "member-service";
        }
        
        let what = '';
        if(servicename === "member-service"){
            what = data.username;
        }
        if(servicename === "reply-service"){
            servicename = "item-service"
            what = data.bid;
        }
        window.location.href=`/${servicename}/detail/${what}`
    })
}

export function UpdateFetchFn(servicename, dto,is){

    return fetchFn("PUT", `http://localhost:8000/${servicename}/${is}`, dto)
    .then((data) => {
        console.log(data)
        if(data.result === undefined){
            console.log("data is undefined......")
            return
          }
        if(servicename === "member-service"){
            window.location.href = `/${servicename}/detail/${data.result.username}`;
        } else if (servicename === "item-service") {
            window.location.href = `/${servicename}/detail/${data.result.id}`;
        } else if (servicename === "reply-service") {
            servicename = "item-service"
            window.location.href = `/${servicename}/detail/${data.result.bid}`;
        }
    })
}

export function DeleteFetchFn(servicename, dto, id) {
    return fetchFn("DELETE", `http://localhost:8000/${servicename}/${id}`, dto)
      .then((data) => {
        if (data === undefined) {
          console.log("data is undefined...");
          return;
        }
  
        if (servicename === "reply-service") {
          servicename = "item-service";
          window.location.href = `/${servicename}/detail/${data.bid}`;
        } else {
          window.location.href = `/${servicename}/list`;
        }
      });
  }
  export function fetchFn3(method, url, formData ){

    const token = sessionStorage.getItem("BTOKEN");

    let options = {

        method: method,

        headers : {

            // "Content-Type" : "application/json",********주석처리나 삭제

            processData: false,// form태그를 이용해서 보내는 것 아니야...formData 객체를 이용했음.

            contentType: false, // application/json 타입 아니야...

        }

    }

    if(token !== null && token.length > 0) {

        options.headers.Authorization = "Bearer "+token;
    }

    if(formData){

        options.body = formData;//json으로 보내면 에러남*****JSON.stringify(formData);xx
    }

    return fetch(url, options)

    .then((response) => {
        if(response.status === 403){
            window.location.href = `/member-service/login`;
        }
        if(!response.ok){
            throw new Error("잘못된 접근입니다.");
        }
        return response.json();
    })
    .catch((error) => {
        alert(error.message);

    })
    }