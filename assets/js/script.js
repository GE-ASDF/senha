const $ = (selector) => document.querySelector(selector)

const passwordInput = $("#password")
const clockContainer = $("#clock")
const message = $("#message")
let objectDate = '';

function getMinuteAndSecond(objectDate){

  let secondDigitMinute = Number(objectDate.getMinutes().toString()[1])
  let firstDigitSeconds = Number(objectDate.getSeconds().toString().length) > 1 ? Number(objectDate.getSeconds().toString()[0]):0;
 
  return {secondDigitMinute, firstDigitSeconds}
}


function passwordCalc({operandoBase, plus, finalBase}, {secondDigitMinute, firstDigitSeconds}){
  return secondDigitMinute * operandoBase + plus + firstDigitSeconds + finalBase;
}

function verifiedPassword(e){

  let getSecondAndFirstObject = getMinuteAndSecond(objectDate)
  let passwordValue = Number(passwordInput.value)
  let chave = e.key.toLowerCase();
  
  if(chave === 'enter'){
    if(verifyPassword(getSecondAndFirstObject, passwordValue, chave)){
      message.innerHTML = printMessage('p', 'correct', 'A senha está correta!');
      passwordInput.value = ''
    }else{
      message.innerHTML = printMessage('p', 'incorrect', 'Senha incorreta! Tente novamente.');
      passwordInput.value = ''
    }
  }
  
}

function verifyPassword(getSecondAndFirstObject, passwordValue){

    if(passwordValue){
      if(passwordValue === Number(passwordCalc(optionsObject, getSecondAndFirstObject))){
       return true;
      }else{
        return false;
      }
  }

}

function printMessage(tag, className, message){
    return `<${tag} class="${className}">${message}</${tag}>`;
}

function printDate(objectDate, options){
  const date = new Intl.DateTimeFormat([], options);
  let clock = date.format(objectDate);
  clockContainer.innerHTML = clock;
}

passwordInput.addEventListener("keypress", verifiedPassword)

setInterval(()=>{
  objectDate = new Date();
  printDate(objectDate, options)
},  1000)