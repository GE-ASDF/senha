const optionsObject = {
    operandoBase: 5,
    plus: 1,
    finalBase: ['333', '123']
  }

const options = {
	timeZone: 'America/Sao_Paulo',
	hour: 'numeric',
	minute: 'numeric',
  second:'numeric'
};

const actions =  {
  enter(){
    verifiedPassword();
  },
  backspace(){
    deleteValue();
  },
  f5(){
    refreshPage();
  },
};
