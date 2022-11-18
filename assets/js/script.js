const $ = (selector) => document.querySelector(selector)

const passwordInput = $("#password")
const clockContainer = $("#clock")
const message = $("#message")
let objectDate = '';
const allowedKeys = [0,1,2,3,4,5,6,7,8,9];


function getMinuteAndSecond(objectDate){

  let secondDigitMinute = Number(objectDate.getMinutes().toString()[1])
  let firstDigitSeconds = Number(objectDate.getSeconds().toString().length) > 1 ? Number(objectDate.getSeconds().toString()[0]):0;
 
  return {secondDigitMinute, firstDigitSeconds}

}


function passwordCalc({operandoBase, plus, finalBase}, {secondDigitMinute, firstDigitSeconds}, final){
  if(finalBase.includes(final)){
    return secondDigitMinute * operandoBase + plus + firstDigitSeconds + final;
  }
}

function verifiedPassword(){

  let getSecondAndFirstObject = getMinuteAndSecond(objectDate)
  let passwordValue = Number(passwordInput.value.trim())
  let final = passwordValue.toString().slice(passwordValue.toString().length - 3)

    if(verifyPassword(getSecondAndFirstObject, passwordValue, final)){
      message.innerHTML = printMessage('p', 'correct', 'A senha está correta!');
      passwordInput.value = ''
    }else{
      message.innerHTML = printMessage('p', 'incorrect', 'Senha incorreta! Tente novamente.');
      passwordInput.value = ''
    }
 
}

function verifyPassword(getSecondAndFirstObject, passwordValue, final){

    if(passwordValue){
      if(passwordValue === Number(passwordCalc(optionsObject, getSecondAndFirstObject, final))){
       return true;
      }else{
        return false;
      }
  }

}

function deleteValue(){
  passwordInput.value = passwordInput.value.slice(0, -1)
}

function refreshPage(){
  document.location.reload();
}

function printMessage(tag, className, message){
    return `<${tag} class="${className}">${message}</${tag}>`;
}

function printDate(objectDate, options){
  const date = new Intl.DateTimeFormat([], options);
  let clock = date.format(objectDate);
  clockContainer.innerHTML = clock;
}

passwordInput.addEventListener("keydown", (e)=>{
  e.preventDefault();

  let chave = e.key.toLowerCase();
  
  if(allowedKeys.includes(Number(e.key)) && passwordInput.value.length < 5 && e.key !== ' '){
    passwordInput.value += Number(e.key);
  }


  const funcao = actions[chave]
  
  if(funcao){
    funcao();
  }

})

setInterval(()=>{
  objectDate = new Date();
  printDate(objectDate, options)
},  1000)