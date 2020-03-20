const calculator = {
  inputDisplay: null,
  resultDisplay: null,
  operandHasDecimal: false,
  evaluated: false,
};

const updateDisplay = () => {
  document.getElementById("calculator__input").innerHTML = calculator.inputDisplay;
  document.getElementById("calculator__result").innerHTML = calculator.resultDisplay;
};

export { calculator, updateDisplay };
