const calculator = {
  inputDisplay: null,
  resultDisplay: null,
  operandHasDecimal: false,
  evaluated: false,
};

const updateDisplay = () => {
  document.getElementById("input").innerHTML = calculator.inputDisplay;
  console.log(calculator);
};

const inputNumber = (num) => {
  const { inputDisplay } = calculator;

  if (inputDisplay == null) {
    calculator.inputDisplay = num;
  } else if (inputDisplay == "0") {
    calculator.inputDisplay = (num == 0) ? "0" : num;
  } else if (/√0$/.test(inputDisplay)) {
    calculator.inputDisplay = (num != 0) ? `√${num}` : "√0";
  } else if (/%$/.test(inputDisplay)) {
    return;
  } else {
    calculator.inputDisplay = inputDisplay + num;
  }
};

const allClear = () => {
  calculator.inputDisplay = null;
  calculator.resultDisplay = null;
  calculator.operandHasDecimal = false;
  calculator.evaluated = false;
};

const clear = () => {
  const { inputDisplay } = calculator;
  let str, regex;

  if (inputDisplay != null) {

    if (/( ×− | ÷− )$/.test(inputDisplay)) {
      str = inputDisplay.replace(/(− )$/, " ");
      calculator.inputDisplay = str;
    } else if (/( \+ | − | × | ÷ )$/.test(inputDisplay)) {
      str = inputDisplay.replace(/( \+ | − | × | ÷ )$/, "");
      regex = /\d+\.\d+( \+ | − | × | ÷ )$/;

      calculator.inputDisplay = str;
      calculator.operandHasDecimal = (regex.test(inputDisplay)) ? true : false;
    } else if (/%$/.test(inputDisplay)) {
      str = inputDisplay.replace(/%$/, "");

      calculator.inputDisplay = str;
      calculator.operandHasDecimal = (/\d+\.\d+%$/.test(inputDisplay)) ? true : false;
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
};

const period = (dot) => {
  const { inputDisplay, operandHasDecimal } = calculator;

  if (inputDisplay == null) {
    calculator.inputDisplay = `0${dot}`;
    calculator.operandHasDecimal = true;
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

const operators = (sign) => {
  const { inputDisplay } = calculator;
  let str;

  switch (sign) {
    case "%":
      if (/(\.|\.0+)$/.test(inputDisplay)) {
        str = inputDisplay.replace(/(\.|\.0+)$/, "");

        calculator.inputDisplay = str + sign;
      } else if (/\d$/.test(inputDisplay)) {
        calculator.inputDisplay = inputDisplay + sign;
      } else {
        return;
      }
      break;

    case "√":
      if (inputDisplay == null) {
        calculator.inputDisplay = sign;
      } else if (/(\+ |− |× |÷ )$/.test(inputDisplay)) {
        calculator.inputDisplay = inputDisplay + sign;
      } else {
        return;
      }
      break;

    default:
      if (/(\.|\.0+)$/.test(inputDisplay)) {
        str = inputDisplay.replace(/(\.|\.0+)$/, "");

        calculator.inputDisplay = `${str} ${sign} `;
        calculator.operandHasDecimal = false;
      } else if (/(\d|%)$/.test(inputDisplay)) {
        calculator.inputDisplay = `${inputDisplay} ${sign} `;
        calculator.operandHasDecimal = false;
      } else if (/(× |÷ )$/.test(inputDisplay) && sign == "−") {
        str = inputDisplay.replace(/ $/, "");

        calculator.inputDisplay = `${str}${sign} `;
        calculator.operandHasDecimal = false;
      } else if (/( \+ | − | × | ÷ )$/.test(inputDisplay)) {
        str = inputDisplay.replace(/( \+ | − | × | ÷ )$/, ` ${sign} `);

        calculator.inputDisplay = str;
        calculator.operandHasDecimal = false;
      } else {
        return;
      }
  }
};

const equal = (sign) => {

};

// [+−×÷%√]

const keys = document.getElementById("calculator__buttons");
keys.addEventListener("click", (e) => {
  const btn = e.target;

  if (btn.className == "number") {
    inputNumber(btn.value);
    updateDisplay();
  }

  if (btn.id == "calculator--all-clear") {
    allClear();
    updateDisplay();
  }

  if (btn.id == "calculator--clear") {
    clear()
    updateDisplay();
  }

  if (btn.id == "calculator--period") {
    period(btn.value);
    updateDisplay();
  }

  if (btn.className == "operator") {
    operators(btn.value);
    updateDisplay();
  }

  if (btn.id == "calculator--equals") {
    equal(btn.value);
    updateDisplay();
  }
});
