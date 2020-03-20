import { calculator } from "./calculator.js";

const inputNumber = (num) => {
  const { inputDisplay, evaluated } = calculator;

  if (inputDisplay == null) {
    calculator.inputDisplay = num;
  } else if (evaluated) {
    calculator.inputDisplay = num;
    calculator.resultDisplay = `"Ans = ${inputDisplay}"`;
    calculator.evaluated = false;
  } else {
    if (/\.\d*0+$/.test(inputDisplay) || /\d+0$/.test(inputDisplay)) {
      calculator.inputDisplay = inputDisplay + num;
    } else if (/0$/.test(inputDisplay)) {
      const str = inputDisplay.replace(/0$/, num);
      if (num != "0") calculator.inputDisplay = str;
    } else if (/%$/.test(inputDisplay)) {
      return;
    } else {
      calculator.inputDisplay = inputDisplay + num;
    }
  }
};

export { inputNumber };
