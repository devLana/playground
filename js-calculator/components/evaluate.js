const evaluate = str => {
  const regexOne = /−?\d+\.?\d*( × | ÷ )−?\d+\.?\d*/;
  const regexTwo = /−?\d+\.?\d*( \+ | − )−?\d+\.?\d*/;
  let result = str;

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
      const operation = evaluation(regexOne, result);

      result = result.replace(regexOne, operation);
    }
  }

  if (regexTwo.test(result)) {
    while (regexTwo.test(result)) {
      const operation = evaluation(regexTwo, result);

      result = result.replace(regexTwo, operation);
    }
  }

  return result;
};

const evaluation = (regex, result) => {
  let expression = result.match(regex)[0];
  let operation;

  if (expression.includes("−")) expression = expression.replace(/−/g, "-");

  const operands = expression.split(/ × | ÷ | \+ | \- /);

  if (expression.includes(" × ")) {
    operation = `${(+operands[0] * 100 * (+operands[1] * 100)) / 10000}`;
  }

  if (expression.includes(" ÷ ")) {
    operation = `${(+operands[0] * 10) / (+operands[1] * 10)}`;
  }

  if (expression.includes(" + ")) {
    operation = `${(+operands[0] * 10 + +operands[1] * 10) / 10}`;
  }

  if (expression.includes(" - ")) {
    operation = `${(+operands[0] * 100 - +operands[1] * 100) / 100}`;
  }

  if (operation.includes("-")) {
    operation = operation.replace(/\-/, "−");
  }

  return operation;
};

export default evaluate;
