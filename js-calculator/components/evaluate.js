const evaluate = str => {
  const regexOne = /−?\d+\.?\d*( × | ÷ )−?\d+\.?\d*/;
  const regexTwo = /−?\d+\.?\d*( \+ | − )−?\d+\.?\d*/;
  let result = str;
  let operation, expression;

  if (result.includes("%")) {
    result
      .match(/\d+\.?\d*%/g)
      .map(item => {
        return `${parseFloat(item.replace("%", "")) / 100}`;
      })
      .forEach(item => (result = result.replace(/\d+\.?\d*%/, item)));
  }

  if (result.includes("√")) {
    result
      .match(/√\d+\.?\d*/g)
      .map(item => {
        return `${Math.sqrt(parseFloat(item.replace("√", "")))}`;
      })
      .forEach(item => (result = result.replace(/√\d+\.?\d*/, item)));
  }

  if (regexOne.test(result)) {
    while (regexOne.test(result)) {
      expression = result.match(regexOne)[0];
      if (expression.includes("−")) expression = expression.replace(/−/g, "-");

      const operands = expression.split(/ × | ÷ /);

      if (expression.includes(" × ")) {
        operation = `${+operands[0] * +operands[1]}`;
      }

      if (expression.includes(" ÷ ")) {
        operation = `${+operands[0] / +operands[1]}`;
      }

      if (operation.includes("-")) {
        operation = operation.replace(/\-/, "−");
      }

      result = result.replace(regexOne, operation);
    }
  }

  if (regexTwo.test(result)) {
    while (regexTwo.test(result)) {
      expression = result.match(regexTwo)[0];
      if (expression.includes("−")) expression = expression.replace(/−/g, "-");

      const operands = expression.split(/ \+ | \- /);

      if (expression.includes(" + ")) {
        operation = `${(+operands[0] * 10 + +operands[1] * 10) / 10}`;
      }

      if (expression.includes(" - ")) {
        operation = `${+operands[0] - +operands[1]}`;
      }

      if (operation.includes("-")) {
        operation = operation.replace(/\-/, "−");
      }

      result = result.replace(regexTwo, operation);
    }
  }

  return result;
};

export default evaluate;
