import { updateDisplay } from "./components/calculator.js";
import { inputNumber } from "./components/numbers.js";
import { operators } from "./components/operators.js";
import allClear from "./components/all-clear.js";
import { period } from "./components/period.js";
import { clear } from "./components/clear.js";
import { equal } from "./components/equal.js";


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
    equal();
    updateDisplay();
  }
});
