import { calculator } from "./calculator.js";

const equal = () => {
  const { inputDisplay, evaluated } = calculator;
  let str = inputDisplay;
  let newStr, strArrOne, strArrTwo, result;

  if (inputDisplay != null) {
    if (evaluated) {
      return;
    } else if (/[+−×÷√]$/.test(inputDisplay)) {
      return;
    } else {
      if (/(\d+\.|\d+\.\d*0+|\d+\.0+)$/.test(inputDisplay)) {
        newStr = inputDisplay.replace(/(\.|0+|\.0+)$/, "");
      }

      if (str.includes("%")) {
        strArrOne = str.match(/\d+\.?\d*%/g);
        strArrTwo = strArrOne.map(item => {
          return (parseFloat(item.replace("%", "")) / 100).toString();
        });
        strArrTwo.forEach(num => (str = str.replace(/\d+\.?\d*%/, num)));
      }

      if (str.includes("√")) {
        strArrOne = str.match(/√\d+\.?\d*/g);
        strArrTwo = strArrOne.map(item => {
          return Math.sqrt(parseFloat(item.replace("√", ""))).toString();
        });
        strArrTwo.forEach(num => (str = str.replace(/√\d+\.?\d*/, num)));
      }

      if (/[−×÷]/.test(str)) {
        str = str.replace(/−/g, "-").replace(/×/g, "*").replace(/÷/g, "/");
      }

      result = eval(str).toString();
      result = result.includes("-") ? result.replace("-", "−") : result;

      calculator.inputDisplay = result;
      calculator.resultDisplay = newStr ? `${newStr} = ` : `${inputDisplay} = `;
      calculator.operandHasDecimal = false;
      calculator.evaluated = true;
    }
  }
};

export { equal };
