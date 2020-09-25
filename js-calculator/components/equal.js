import calculator from "./calculator.js";
import evaluate from "./evaluate.js";

const equal = () => {
  const { inputDisplay, evaluated } = calculator;

  if (inputDisplay != null) {
    if (evaluated || /(\+ |− |× |÷ |√)$/.test(inputDisplay)) {
      return;
    } else {
      const str = /(\.|\.\d+0+|\.0+)$/.test(inputDisplay)
        ? inputDisplay.replace(/(\.|0+|\.0+)$/, "")
        : inputDisplay;

      const result = evaluate(str);

      calculator.inputDisplay = result;
      calculator.resultDisplay = `${str} =`;
      calculator.operandHasDecimal = false;
      calculator.evaluated = true;
    }
  }
};

export default equal;
