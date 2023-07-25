import { addClass,removeClass } from "./css.js";
import { getNode } from "./getNode.js"



export function showAlert(node,text = '에러입니다!',timeout = 1000){

  if(typeof node === 'string'){
    node = getNode(node);
  }

  node.textContent = text;

  addClass(node,'is-active');
  
  setTimeout(() => {
    removeClass(node,'is-active');
  }, timeout);


}


// showAlert('.alert-error','이름이 없습니다!',2000)


