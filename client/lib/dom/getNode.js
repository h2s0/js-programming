

export function getNode(node){
  
  if(typeof node !== 'string'){
    throw new Error('getNode 함수의 인수는 문자 타입 이어야 합니다.')
  }
  
  return document.querySelector(node);
}


export function getNodes(node){

  if(typeof node !== 'string'){
    throw new Error('getNode 함수의 인수는 문자 타입 이어야 합니다.')
  }

  return document.querySelectorAll(node);
}









