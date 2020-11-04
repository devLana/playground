const calculator = {
  inputDisplay: null,
  resultDisplay: null,
  operandHasDecimal: false,
  evaluated: false,
};

export const updateDisplay = () => {
  document.getElementById("calculator__input").innerHTML = calculator.inputDisplay;
  document.getElementById("calculator__result").innerHTML = calculator.resultDisplay;
};

export const addActiveClass = (elem, key = null) => {
  const iterable = !!Array.from(elem).length;

  if (!iterable) {
    elem.setAttribute("class", "active");

    setTimeout(() => {
      elem.removeAttribute("class");
    }, 150);

    return;
  }

  elem.forEach(btn => {
    if (btn.value == key) {
      btn.classList.add("active");

      setTimeout(() => {
        btn.classList.remove("active");
      }, 150);
    }
  });
};

export const operatorSigns = {
  "*": "×",
  "/": "÷",
  "+": "+",
  "-": "−",
  "%": "%",
};

export default calculator;
