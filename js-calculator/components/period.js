import { calculator } from "./calculator.js";

const period = (dot) => {
  const { inputDisplay, operandHasDecimal, evaluated } = calculator;

  if (inputDisplay == null) {
    calculator.inputDisplay = `0${dot}`;
    calculator.operandHasDecimal = true;
  } else if (evaluated) {
    calculator.inputDisplay = `0${dot}`;
    calculator.resultDisplay = `"Ans = ${inputDisplay}"`;
    calculator.operandHasDecimal = true;
    calculator.evaluated = false;
  } else if (/%$/.test(inputDisplay)) {
    return;
  } else {
    if (!operandHasDecimal) {
      if (/( \+ | − | × | ÷ | ×− | ÷− |√)$/.test(inputDisplay)) {
        calculator.inputDisplay = `${inputDisplay}0${dot}`;
        calculator.operandHasDecimal = true;
      } else {
        calculator.inputDisplay = inputDisplay + dot;
        calculator.operandHasDecimal = true;
      }
    }
  }
};

export { period };
