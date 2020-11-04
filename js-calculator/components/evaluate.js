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
        operation = `${(+operands[0] * 100 * (+operands[1] * 100)) / 10000}`;
      }

      if (expression.includes(" ÷ ")) {
        operation = `${(+operands[0] * 10) / (+operands[1] * 10)}`;
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
        operation = `${(+operands[0] * 100 - +operands[1] * 100) / 100}`;
      }

      if (operation.includes("-")) {
        operation = operation.replace(/\-/, "−");
      }

      result = result.replace(regexTwo, operation);
    }
  }

  if (result.includes(".")) {
    const breakPoint = 11;
    const index = result.indexOf(".") + breakPoint;

    if (result.length < index) {
      result = result.substring(0);
    } else {
      const character = result.charAt(index);

      if (+character >= 5) {
        const num = result.charAt(index - 1);
        const newNum = +num + 1;

        result = `${result.substr(0, index - 1)}${newNum}`;
      } else {
        result = result.substr(0, index);
      }
    }
  }

  return result;
};

export default evaluate;
