const calculator = {
  inputDisplay: null,
  resultDisplay: null,
  operandHasDecimal: false,
  evaluated: false,
};

const updateDisplay = () => {
  document.getElementById("input").innerHTML = calculator.inputDisplay;
  document.getElementById("result").innerHTML = calculator.resultDisplay;
};

export { calculator, updateDisplay };