
/*

[readystate] : 현재 상태

0: uninitialized
1: loading
2: loaded
3: interactive
4: complete


*/

// import { defaultOptions } from "acorn";
import { refError } from "../error/refError.js";

export function xhr({
    method = "GET",
    url = '',
    onSuccess = null,
    onFail = null,
    body = null,
    headers = {
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*'
    }
} = {}) {


// 어차피 객체를 받고 분해해서 사용할 것이라면 받을 때 바로 구조분해할당을 설정해주자.

    // 비동기 통신에 필요한 객체 생성
    const xhr = new XMLHttpRequest();

    
    // open 메써드를 사용해서 이용할 통신, 주소
    // xhr.open('GET','https://jsonplaceholder.typicode.com/users')
    // 변수로 만들어줘서 인자 입력해둠
    xhr.open(method,url);


    // objext.entries 로 배열을 만들어주고 forEach의 key value 값을 넣어 갯수만큼 작성하지 않아도 되게 해줌
    Object.entries(headers).forEach(([key,value])=>{
        // 데이터 리퀘스트 할건데 content-type 은 json 타입이야를 알려줘야함
        xhr.setRequestHeader(key,value);
    })

    // 이벤트 영역을 따로 만들어 주는 이유 : 정확히 state 가 변경되고, 서버에 대한 정보를 잘 가지고 온 후 다음 단계로 넘어가기 위해서
    xhr.addEventListener('readystatechange',()=>{

        const {status,readyState,response} = xhr;

        if(readyState === 4){
            if(status >= 200 && status < 400 ){
                onSuccess(JSON.parse(response));
            }else{
                onFail('failed');
            }
        }
    });
    // 정보들을 보내주겠다.
    xhr.send(JSON.stringify(body));
}



// 1. 자바스크립트의 함수는 객체다.
// 2. 사용자(협업개발자) 입장 : 쉽게 쓰자 
// 3. 설계자 -> 함수 안에 메서드(객체)를 넣어 버리자 !! 


/*
 
 * @param {string} url 서버와 통신할 주소
 * @param {function} onSuccess 서버와 통신 성공시 실행될 콜백 함수 
 * @param {function} onFail 서버와의 통신 실패시 실행될 콜백 함수
 * @return server data
 */

// shorthand property
xhr.get = (url,onSuccess,onFail)=>{
    xhr({
        url,
        onSuccess,
        onFail
    })
}

xhr.post = (url,body,onSuccess,onFail)=>{
    xhr({
        method:'POST',
        url,
        body,
        onSuccess,
        onFail
    })
}

xhr.put = (url,body,onSuccess,onFail)=>{
    xhr({
        method:'PUT',
        url,
        body,
        onSuccess,
        onFail
    })
}

xhr.delete = (url,onSuccess,onFail)=>{
    xhr({
        method:'DELETE',
        url,
        onSuccess,
        onFail
    })
}


        // // 실행하는 구문
        // xhr.get(
        //     // 주소
        //     'https://jsonplaceholder.typicode.com/users',

        //     // 성공했을 때 실행되는 함수
        //     (result)=>{
        //         console.log(result);
        //     },

        //     // 실패했을 때 실행되는 함수
        //     (err)=>{
        //         console.log(err);
        //     }
        // )



//   xhr({
//     method : 'GET',
//     url : 'https://jsonplaceholder.typicode.com/users',
//     onSuccess : ()=>{},
//     onFail : ()=>{},
//     body : {
//         name: 'heesae',
//         age : 26
//     },
//     headers : {
//         'Content-Type':'application/json',
//         'Access-Control-Allow-Origin':'*'
//     }
//   });





/* promise API -------------------------- */

const defaultOptions = {
    method:'GET',
    url: '',
    body:null,
    errorMessage:'서버와의 통신이 원활하지 않습니다.',
    headers:{
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'*'
    }
  }
  
  
  export function xhrPromise(options){
  
    // mixin ( 두 가지 배열 합치는 것 (?) )
    // const config = {...defaultOptions,...options}
    const {method,url,body,errorMessage,headers} = Object.assign({},defaultOptions,options)

    if(!url) refError('서버와 통신할 url은 필수값입니다.');

    const xhr = new XMLHttpRequest();
    
    xhr.open(method,url);
  
  
    Object.entries(headers).forEach(([key,value])=>{
      xhr.setRequestHeader(key,value);
    })
  
    
    xhr.send(JSON.stringify(body))
  
    return new Promise((resolve, reject) => {
      xhr.addEventListener('readystatechange',()=>{
        if(xhr.readyState === 4){
          if(xhr.status >= 200 && xhr.status < 400){
            resolve(JSON.parse(xhr.response))
          }else{
            reject({message:errorMessage})
          }
        }
      })
    })
  }

// xhrPromise({
//   url:'https://jsonplaceholder.typicode.com/users'
// })
// .then((res)=>{
//   res.forEach((item)=>{
//     console.log( item );
//   })
// })

xhrPromise.get = (url)=>{
    return xhrPromise({ url })
  }
  
  xhrPromise.post = (url,body)=>{
    return xhrPromise({
      url,
      body,
      method:'POST'
    })
  }
  
  xhrPromise.delete = (url)=>{
    return xhrPromise({
      url,
      method:'DELETE'
    })
  }
  
  
  xhrPromise.put = (url,body)=>{
    return xhrPromise({
      url,
      body,
      method:'PUT'
    })
  }