import {
  updateDisplay,
  addActiveClass,
  operatorSigns,
} from "./components/calculator.js";

import inputNumber from "./components/numbers.js";
import operators from "./components/operators.js";
import allClear from "./components/all-clear.js";
import period from "./components/period.js";
import clear from "./components/clear.js";
import equal from "./components/equal.js";

const doc = document.documentElement;
const keys = document.getElementById("calculator__buttons");

const operatorBtns = document.querySelectorAll(".calculator--operator");
const numberBtns = document.querySelectorAll(".calculator--number");
const allClearBtn = document.getElementById("calculator--all-clear");
const periodBtn = document.getElementById("calculator--period");
const equalsBtn = document.getElementById("calculator--equals");
const clearBtn = document.getElementById("calculator--clear");

keys.addEventListener("click", e => {
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
    clear();
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

keys.addEventListener("mouseup", e => {
  e.target.blur();
})

doc.addEventListener("keydown", e => {
  const { key } = e;

  if (!isNaN(key)) {
    inputNumber(key);
    updateDisplay();
    addActiveClass(numberBtns, key);
  }

  if (key == "Escape") {
    allClear();
    updateDisplay();
    addActiveClass(allClearBtn);
  }

  if (key == ".") {
    period(key);
    updateDisplay();
    addActiveClass(periodBtn);
  }

  if (/[\+\-\*\/%]/.test(key)) {
    switch (key) {
      case "*":
      case "/":
      case "+":
      case "-":
      case "%":
        operators(operatorSigns[key]);
        updateDisplay();
        addActiveClass(operatorBtns, operatorSigns[key]);
    }
  }

  if (key == "Enter" || key == "=") {
    equal();
    updateDisplay();
    addActiveClass(equalsBtn);
  }

  if (e.key == "Backspace") {
    clear();
    updateDisplay();
    addActiveClass(clearBtn);
  }
});
