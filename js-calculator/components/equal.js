import calculator from "./calculator.js";

const equal = () => {
  const { inputDisplay, evaluated } = calculator;
  let str = inputDisplay;
  let newStr, strArrOne, strArrTwo, result;

  if (inputDisplay != null) {
    if (evaluated || /(\+ |− |× |÷ |√)$/.test(inputDisplay)) {
      return;
    } else {
      if (/(\.|0+|\.0+)$/.test(inputDisplay)) {
        newStr = inputDisplay.replace(/(\.|0+|\.0+)$/, "");
      }

      if (str.includes("%")) {
        strArrOne = str.match(/\d+\.?\d*%/g);
        strArrTwo = strArrOne
          .map(item => {
            return `${parseFloat(item.replace("%", "")) / 100}`;
          })
          .forEach(item => (str = str.replace(/\d+\.?\d*%/, item)));
      }

      if (str.includes("√")) {
        strArrOne = str.match(/√\d+\.?\d*/g);
        strArrTwo = strArrOne
          .map(item => {
            return `${Math.sqrt(parseFloat(item.replace("√", "")))}`;
          })
          .forEach(item => (str = str.replace(/√\d+\.?\d*/, item)));
      }

      if (/[−×÷]/.test(str)) {
        str = str.replace(/−/g, "-").replace(/×/g, "*").replace(/÷/g, "/");
      }

      result = `${eval(str)}`
      result = result.includes("-") ? result.replace("-", "−") : result;

      calculator.inputDisplay = result;
      calculator.resultDisplay = newStr ? `${newStr} = ` : `${inputDisplay} = `;
      calculator.operandHasDecimal = false;
      calculator.evaluated = true;
    }
  }
};

export default equal;
