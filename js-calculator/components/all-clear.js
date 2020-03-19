import { calculator } from "./calculator.js";

const allClear = () => {
  calculator.inputDisplay = null;
  calculator.resultDisplay = null;
  calculator.operandHasDecimal = false;
  calculator.evaluated = false;
};

export {allClear as default};