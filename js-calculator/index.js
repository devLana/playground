import { updateDisplay } from "./components/calculator.js";
import { inputNumber } from "./components/numbers.js";
import { operators } from "./components/operators.js";
import allClear from "./components/all-clear.js";
import { period } from "./components/period.js";
import { clear } from "./components/clear.js";
import { equal } from "./components/equal.js";


const doc = document.documentElement;
const keys = document.getElementById("calculator__buttons");

keys.addEventListener("click", (e) => {
  const btn = e.target;

  if (btn.className == "calculator--number") {
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

  if (btn.className == "calculator--operator") {
    operators(btn.value);
    updateDisplay();
  }

  if (btn.id == "calculator--equals") {
    equal();
    updateDisplay();
  }
});


doc.addEventListener("keyup", (e) => {
  const { key } = e;

  if (/^\d/.test(key)) {
    inputNumber(key);
    updateDisplay();
  }

  if (key == "Escape") {
    allClear();
    updateDisplay();
  }

  if (key == ".") {
    period(key);
    updateDisplay();
  }

  if (/[\+\-\*\/%]/.test(key)) {
    (key == "+") ? operators("+")
      : (key == "-") ? operators("−")
      : (key == "*") ? operators("×")
      : (key == "/") ? operators("÷")
      :  operators("%");
    updateDisplay();
  }

  if (key == "Enter" || key == "=" ) {
    equal();
    updateDisplay();
  }
});

doc.addEventListener("keydown", (e) => {
  const { key } = e;
  if (key == "Backspace") {
    clear()
    updateDisplay();
  }
});
