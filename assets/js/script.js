const $ = (selector) => document.querySelector(selector)

const passwordInput = $("#password")
const clockContainer = $("#clock")
const message = $("#message")
const optionsObject = {
  operandoBase: 5,
  plus: 1,
  finalBase: '333'
}

function getMinuteAndSecond(){
  const objectDate = new Date();
  const options = {
	timeZone: 'America/Sao_Paulo',
	hour: 'numeric',
	minute: 'numeric',
  second:'numeric'
};
  
  let secondDigitMinute = Number(objectDate.getMinutes().toString()[1])
const date = new Intl.DateTimeFormat([], options);
let clock = date.format(objectDate);
clockContainer.innerHTML = clock;
  let firstDigitSeconds = Number(objectDate.getSeconds().toString().length) > 1 ? Number(objectDate.getSeconds().toString()[0]):0;
 
  return {secondDigitMinute, firstDigitSeconds}
}


function passwordCalc({operandoBase, plus, finalBase}){
  return getMinuteAndSecond().secondDigitMinute * operandoBase + plus + getMinuteAndSecond().firstDigitSeconds + finalBase;
}


passwordInput.addEventListener("keyup", ()=>{
  let passwordValue = Number(passwordInput.value)
 
    if(passwordValue){
      if(passwordValue === Number(passwordCalc(optionsObject))){
        message.innerHTML = `<p class="correct">As senhas coincidem </p>`;
      }else{
        message.innerHTML = `<p class="incorrect">Senha incorreta! Tente novamente. </p>`
      }
    }else{
      message.innerHTML = "Preencha o campo de senha."
    }
})

setInterval(getMinuteAndSecond,  2000)