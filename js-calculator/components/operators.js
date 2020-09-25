import calculator from "./calculator.js";

const operators = sign => {
  const { inputDisplay, evaluated } = calculator;
  let str;

  switch (sign) {
    case "%":
      if (evaluated) {
        calculator.inputDisplay = inputDisplay + sign;
        calculator.resultDisplay = `"Ans = ${inputDisplay}"`;
        calculator.evaluated = false;
      } else if (/(\.|\.\d+0+|\.0+)$/.test(inputDisplay)) {
        str = inputDisplay.replace(/(\.|0+|\.0+)$/, "");
        calculator.inputDisplay = str + sign;
      } else if (/\d$/.test(inputDisplay)) {
        calculator.inputDisplay = inputDisplay + sign;
      }
      break;

    case "√":
      if (inputDisplay == null) {
        calculator.inputDisplay = sign;
      } else if (evaluated) {
        calculator.inputDisplay = sign;
        calculator.resultDisplay = `"Ans = ${inputDisplay}"`;
        calculator.evaluated = false;
      } else if (/(\+ |− |−|× |÷ )$/.test(inputDisplay)) {
        calculator.inputDisplay = inputDisplay + sign;
      }
      break;

    default:
      if (inputDisplay == null && sign == "−") {
        calculator.inputDisplay = sign;
      } else if (evaluated) {
        calculator.inputDisplay = `${inputDisplay} ${sign} `;
        calculator.resultDisplay = `"Ans = ${inputDisplay}"`;
        calculator.evaluated = false;
      } else if (/(\.|\.\d+0+|\.0+)$/.test(inputDisplay)) {
        str = inputDisplay.replace(/(\.|0+|\.0+)$/, "");

        calculator.inputDisplay = `${str} ${sign} `;
        calculator.operandHasDecimal = false;
      } else if (/(\d|%)$/.test(inputDisplay)) {
        calculator.inputDisplay = `${inputDisplay} ${sign} `;
        calculator.operandHasDecimal = false;
      } else if (/(× |÷ )$/.test(inputDisplay) && sign == "−") {
        calculator.inputDisplay = `${inputDisplay}${sign}`;
      } else if (/( \+ | − | × | ÷ )$/.test(inputDisplay)) {
        str = inputDisplay.replace(/( \+ | − | × | ÷ )$/, ` ${sign} `);
        calculator.inputDisplay = str;
      }
  }
};

export default operators;
