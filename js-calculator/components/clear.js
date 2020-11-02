import calculator from "./calculator.js";

const clear = () => {
  const { inputDisplay, evaluated } = calculator;
  let str;

  if (inputDisplay != null) {
    if (evaluated) {
      return;
    } else {
      if (/( × −| ÷ −)$/.test(inputDisplay)) {
        str = inputDisplay.replace(/−$/, "");
        calculator.inputDisplay = str;
      } else if (/( \+ | − | × | ÷ )$/.test(inputDisplay)) {
        const regex = /\d+\.\d+%?( \+ | − | × | ÷ )$/;
        str = inputDisplay.replace(/( \+ | − | × | ÷ )$/, "");

        calculator.inputDisplay = str;
        calculator.operandHasDecimal = regex.test(inputDisplay) ? true : false;
      } else if (/\.$/.test(inputDisplay)) {
        str = inputDisplay.replace(/\.$/, "");

        calculator.inputDisplay = str;
        calculator.operandHasDecimal = false;
      } else if (inputDisplay.length == 1) {
        calculator.inputDisplay = null;
      } else {
        str = inputDisplay.substr(0, inputDisplay.length - 1);
        calculator.inputDisplay = str;
      }
    }
  }
};

export default clear;
