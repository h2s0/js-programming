import { getNode } from "../dom/getNode.js";


function delay(callback,timeout=1000){
  setTimeout(callback,timeout);
}


const first = getNode('.first');
const second = getNode('.second');






// delay(()=>{
//   console.log(1);
//   first.style.top = '-100px';
//   delay(()=>{
//     console.log(2);
//     first.style.transform = 'rotate(360deg)'
//     delay(()=>{
//       console.log(3);
//       first.style.top = '0';
//     })

//     second.style.top = '100px';
//     console.log('b')
//   })
// })


// 객체 합성 mixin = 기본 옵션값

const defaultOptions = {
  shouldReject:false,
  timeout:1000,
  data:'성공!',
  errorMessage:'알 수 없는 오류가 발생했습니다.'
}


// delayP 함수를 실행하면 리턴되는 값이 promise 객체입니다.

// options : 함수가 받은 매개변수 - 실행부에서 적힌 값들이 여기 올라와서 
function delayP(options){

  // 구조 분해 할당
  let config = { ...defaultOptions }

  // delayP 안에 parameter 을 받아오는데, 숫자값인 경우에는 config.timeout 에 우리가 원하는 옵션의 시간을 다시 지정(재할당)하겠다.
  if(typeof options === 'number'){
    config.timeout = options;
  }

  // options 에서 진짜 객체를 받아왔을 때에는, 기존의 config 값과 options의 값을 병합해서 다시 config 에 할당해주겠다.
  if(typeof options === 'object'){
    config = { ...defaultOptions, ...options}
  }

  const {shouldReject, data, errorMessage, timeout} = config;
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {

      if(!shouldReject){
        resolve(data)
      }else{
        reject({message:errorMessage});
      }
    }, timeout);
  })
}

//promise 객체가 튀어나왔기 때문에 then 절 사용가능, 
delayP({shouldReject:false})
.then((res)=>{
  // console.log(res);
})
.catch(({message})=>{
  alert(message)
})
.finally(()=>{
  // console.log('어쨌든 실행합니다.')
})

// await : 코드의 실행흐름제어 / result 결과 값 출
// 