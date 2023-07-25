


import { getNode } from "./getNode.js";



export function bindEvent(node,type,handler){
  if(typeof node === 'string'){
    node = getNode(node);
  }

  if(!(/\bmouseenter|click|mousemove|mouseout|mouseover\b/g).test(type)){
    throw new TypeError('bindEvent 함수의 두 번째 인수는 유효한 이벤트 타입 이어야 합니다.')
  }

  node.addEventListener(type,handler);


  return ()=> node.removeEventListener(type,handler);

  // function tiger() {
  //   return node.removeEventListener(type,handler)
  // }

  // return tiger;

}
















