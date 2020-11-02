import calculator from "../components/calculator.js";
import inputNumber from "../components/numbers.js";
import operators from "../components/operators.js";
import allClear from "../components/all-clear.js";
import evaluate from "../components/evaluate.js";
import period from "../components/period.js";
import clear from "../components/clear.js";
import equal from "../components/equal.js";

describe("Calculator Tests", () => {
  beforeEach(() => {
    calculator.inputDisplay = null;
    calculator.resultDisplay = null;
    calculator.operandHasDecimal = false;
    calculator.evaluated = false;
  });

  describe("1 - calculator state", () => {
    it("1:- should be of type object", () => {
      assert.isObject(calculator, "calculator state should be type object");
    });

    it("2:- has properties 'inputDisplay', 'resultDisplay', 'operandHasDecimal' and 'evaluated'", () => {
      assert.hasAllKeys(
        calculator,
        ["inputDisplay", "resultDisplay", "operandHasDecimal", "evaluated"],
        "calculator should have keys 'inputDisplay', 'resultDisplay', 'operandHasDecimal' and 'evaluated'"
      );
    });
  });

  describe("2 - reset calculator", () => {
    it("1:- resets calculator state to default", () => {
      calculator.inputDisplay = "10";
      calculator.resultDisplay = "5 + 5 =";
      calculator.operandHasDecimal = false;
      calculator.evaluated = true;

      allClear();

      assert.propertyVal(
        calculator,
        "inputDisplay",
        null,
        "inputDisplay property should equal null"
      );

      assert.propertyVal(
        calculator,
        "resultDisplay",
        null,
        "resultDisplay property should equal null"
      );

      assert.propertyVal(
        calculator,
        "operandHasDecimal",
        false,
        "operandHasDecimal property should equal false"
      );

      assert.propertyVal(
        calculator,
        "evaluated",
        false,
        "evaluated property should equal false"
      );
    });
  });

  describe("3 - clear inputDisplay", () => {
    describe("- clear characters from inputDisplay", () => {
      it("1:- clear last character", () => {
        calculator.inputDisplay = "954644.78";

        clear();

        assert.strictEqual(
          calculator.inputDisplay,
          "954644.7",
          "inputDisplay should be '954644.7'"
        );
      });

      it("2:- clear last character", () => {
        calculator.inputDisplay = "954644.7";

        clear();

        assert.strictEqual(
          calculator.inputDisplay,
          "954644.",
          "inputDisplay should be '954644.'"
        );
      });

      it("3:- clear last character", () => {
        calculator.inputDisplay = "954644.";

        clear();

        assert.strictEqual(
          calculator.inputDisplay,
          "954644",
          "inputDisplay should be '954644'"
        );

        assert.strictEqual(
          calculator.operandHasDecimal,
          false,
          "operandHasDecimal should be false"
        );
      });
    });

    it("1:- inputDisplay ends with '× −'", () => {
      calculator.inputDisplay = "684 × −";

      clear();

      assert.strictEqual(
        calculator.inputDisplay,
        "684 × ",
        "inputDisplay should be '684 × '"
      );
    });

    it("2:- inputDisplay ends with a number and an arithmetic operator", () => {
      calculator.inputDisplay = "684 + ";

      clear();

      assert.strictEqual(
        calculator.inputDisplay,
        "684",
        "inputDisplay should be '684'"
      );
    });

    it("3:- inputDisplay ends with a floating point number and an arithmetic operator", () => {
      calculator.inputDisplay = "684.684% ÷ ";

      clear();

      assert.strictEqual(
        calculator.inputDisplay,
        "684.684%",
        "inputDisplay should be '684.684%'"
      );

      assert.strictEqual(
        calculator.operandHasDecimal,
        true,
        "operandHasDecimal should be true"
      );
    });

    it("4:- inputDisplay has only one character", () => {
      calculator.inputDisplay = "9";

      clear();

      assert.strictEqual(
        calculator.inputDisplay,
        null,
        "inputDisplay should be null"
      );
    });
  });

  describe("4 - insert numbers", () => {
    it("1:- inserts a digit", () => {
      inputNumber("1");

      assert.strictEqual(
        calculator.inputDisplay,
        "1",
        "inputDisplay should be '1'"
      );
    });

    it("2:- no octal numbers", () => {
      calculator.inputDisplay = "0";

      inputNumber("2");

      assert.strictEqual(
        calculator.inputDisplay,
        "2",
        "no numbers should start with '0'"
      );
    });

    it("3:- append digits to numbers", () => {
      calculator.inputDisplay = "12345";

      inputNumber("6");

      assert.strictEqual(
        calculator.inputDisplay,
        "123456",
        "should append '6' to the end."
      );
    });

    it("4:- cannot add a digit after '%' sign", () => {
      calculator.inputDisplay = "595366%";

      inputNumber("0");

      assert.strictEqual(
        calculator.inputDisplay,
        "595366%",
        "cannot add a digit after '%' sign"
      );
    });

    it("5:- insert a digit after an evaluation", () => {
      calculator.inputDisplay = "20";
      calculator.resultDisplay = "10 * 2 =";
      calculator.evaluated = true;

      inputNumber("9");

      assert.strictEqual(
        calculator.inputDisplay,
        "9",
        "inputDisplay should be '9'"
      );

      assert.strictEqual(
        calculator.resultDisplay,
        `"Ans = 20"`,
        'resultDisplay should be "Ans = 20"'
      );

      assert.strictEqual(
        calculator.evaluated,
        false,
        "evaluated should be false"
      );
    });
  });

  describe("5 - insert operators", () => {
    describe("- percent sign [%]", () => {
      it("1:- append '%' to a number", () => {
        calculator.inputDisplay = "76783678";

        operators("%");

        assert.strictEqual(
          calculator.inputDisplay,
          "76783678%",
          "inputDisplay should end with '%'"
        );
      });

      it("2:- append '%' to an evaluated number", () => {
        calculator.inputDisplay = "11.04";
        calculator.resultDisplay = "4.6 × 2.4 =";
        calculator.evaluated = true;

        operators("%");

        assert.strictEqual(
          calculator.inputDisplay,
          "11.04%",
          "inputDisplay should end with '%'"
        );

        assert.strictEqual(
          calculator.resultDisplay,
          '"Ans = 11.04"',
          'resultDisplay should be "Ans = 11.04"'
        );

        assert.strictEqual(
          calculator.evaluated,
          false,
          "evaluated should be false"
        );
      });
    });

    describe("- square root sign [√]", () => {
      it("1:- prepend '√' to inputDisplay", () => {
        operators("√");

        assert.strictEqual(
          calculator.inputDisplay,
          "√",
          "inputDisplay should be '√'"
        );
      });

      it("2:- append '√' to any operator not '%'", () => {
        calculator.inputDisplay = "657 ÷ ";

        operators("√");

        assert.strictEqual(
          calculator.inputDisplay,
          "657 ÷ √",
          "inputDisplay should be '657 ÷ √'"
        );
      });

      it("3:- prepend '√' to inputDisplay after an evaluation", () => {
        calculator.inputDisplay = "11.04";
        calculator.resultDisplay = "4.6 × 2.4 =";
        calculator.evaluated = true;

        operators("√");

        assert.strictEqual(
          calculator.inputDisplay,
          "√",
          "inputDisplay should be '√'"
        );

        assert.strictEqual(
          calculator.resultDisplay,
          `"Ans = 11.04"`,
          'resultDisplay should be "Ans = 11.04"'
        );

        assert.strictEqual(
          calculator.evaluated,
          false,
          "evaluated should be false"
        );
      });

      it("4:- append '√' to the minus (÷ −) operator", () => {
        calculator.inputDisplay = "657 ÷ −";

        operators("√");

        assert.strictEqual(
          calculator.inputDisplay,
          "657 ÷ −√",
          "inputDisplay should be '657 ÷ −√'"
        );
      });
    });

    describe("- arithmetic operators [×÷+−]", () => {
      describe("i - append operator to numbers that end with '.' or multiple zeros", () => {
        it("1:- remove '.' and append operator", () => {
          calculator.inputDisplay = "56.";
          calculator.operandHasDecimal = true;

          operators("+");

          assert.strictEqual(
            calculator.inputDisplay,
            "56 + ",
            "inputDisplay should be '56 + '"
          );

          assert.strictEqual(
            calculator.operandHasDecimal,
            false,
            "operandHasDecimal should be false"
          );
        });

        it("2:- remove '.0000' and append operator", () => {
          calculator.inputDisplay = "56.0000000";
          calculator.operandHasDecimal = true;

          operators("÷");

          assert.strictEqual(
            calculator.inputDisplay,
            "56 ÷ ",
            "inputDisplay should be '56 ÷ '"
          );

          assert.strictEqual(
            calculator.operandHasDecimal,
            false,
            "operandHasDecimal should be false"
          );
        });

        it("3:- remove multiple zeros and append operator", () => {
          calculator.inputDisplay = "56.5600000000";
          calculator.operandHasDecimal = true;

          operators("−");

          assert.strictEqual(
            calculator.inputDisplay,
            "56.56 − ",
            "inputDisplay should be '56.56 − '"
          );

          assert.strictEqual(
            calculator.operandHasDecimal,
            false,
            "operandHasDecimal should be false"
          );
        });
      });

      it("1:- prepend minus for negative number", () => {
        operators("−");

        assert.strictEqual(
          calculator.inputDisplay,
          "−",
          "inputDisplay should be '−'"
        );
      });

      it("2:- append operator to an evaluated number", () => {
        calculator.inputDisplay = "11.04";
        calculator.resultDisplay = "4.6 × 2.4 =";
        calculator.evaluated = true;

        operators("×");

        assert.strictEqual(
          calculator.inputDisplay,
          "11.04 × ",
          "inputDisplay should be '11.04 × '"
        );

        assert.strictEqual(
          calculator.resultDisplay,
          `"Ans = 11.04"`,
          'resultDisplay should be "Ans = 11.04"'
        );

        assert.strictEqual(
          calculator.evaluated,
          false,
          "evaluated should be false"
        );
      });

      it("3:- append '−' to '×' or '÷'", () => {
        calculator.inputDisplay = "78 × ";

        operators("−");

        assert.strictEqual(
          calculator.inputDisplay,
          "78 × −",
          "inputDisplay should be '56 + '"
        );
      });

      it("4:- append operator", () => {
        calculator.inputDisplay = "68.26%";
        calculator.operandHasDecimal = true;

        operators("÷");

        assert.strictEqual(
          calculator.inputDisplay,
          "68.26% ÷ ",
          "inputDisplay should be '68.26% ÷ '"
        );

        assert.strictEqual(
          calculator.operandHasDecimal,
          false,
          "operandHasDecimal should be false"
        );
      });

      it("5:- replace current operator", () => {
        calculator.inputDisplay = "5672 + ";

        operators("×");

        assert.strictEqual(
          calculator.inputDisplay,
          "5672 × ",
          "inputDisplay should be '5672 × '"
        );
      });
    });
  });

  describe("6 - insert decimal point", () => {
    describe("- operand is already a floating point number", () => {
      it("1:- append '.' after an operator not '%'", () => {
        calculator.inputDisplay = "25.27 × ";

        period(".");

        assert.strictEqual(
          calculator.inputDisplay,
          "25.27 × 0.",
          "inputDisplay should be '25.27 × 0.'"
        );

        assert.strictEqual(
          calculator.operandHasDecimal,
          true,
          "operandHasDecimal should be true"
        );
      });

      it("2:- append '.' to a number", () => {
        calculator.inputDisplay = "6793";

        period(".");

        assert.strictEqual(
          calculator.inputDisplay,
          "6793.",
          "inputDisplay should be '6793.'"
        );

        assert.strictEqual(
          calculator.operandHasDecimal,
          true,
          "operandHasDecimal should be true"
        );
      });
    });

    it("1:- append '.'", () => {
      period(".");

      assert.strictEqual(
        calculator.inputDisplay,
        "0.",
        "inputDisplay should be '0.'"
      );

      assert.strictEqual(
        calculator.operandHasDecimal,
        true,
        "operandHasDecimal should be true"
      );
    });

    it("2:- prepend '.' to inputDisplay after an evaluation", () => {
      calculator.inputDisplay = "25";
      calculator.resultDisplay = "5 × 5 =";
      calculator.evaluated = true;

      period(".");

      assert.strictEqual(
        calculator.inputDisplay,
        "0.",
        "inputDisplay should be '0.'"
      );

      assert.strictEqual(
        calculator.resultDisplay,
        '"Ans = 25"',
        'resultDisplay should be "Ans = 25"'
      );

      assert.strictEqual(
        calculator.operandHasDecimal,
        true,
        "operandHasDecimal should be true"
      );

      assert.strictEqual(
        calculator.evaluated,
        false,
        "evaluated should be false"
      );
    });

    it("3:- do not append '.' after '%' sign", () => {
      calculator.inputDisplay = "100%";

      period(".");

      assert.strictEqual(
        calculator.inputDisplay,
        "100%",
        "inputDisplay should be '100%'"
      );
    });
  });

  describe("7 - evaluate an expression", () => {
    describe("- the equal to sign is clicked", () => {
      it("1:- inputDisplay ends with an operator not '%'", () => {
        calculator.inputDisplay = "60 ÷ ";

        equal();

        assert.strictEqual(
          calculator.inputDisplay,
          "60 ÷ ",
          "inputDisplay should be '60 ÷ '"
        );
      });

      it("2:- an expression is evaluated", () => {
        const str = "60 × 82.576 − √654% + 7878.000";
        const result = "12830.002657629491";

        calculator.inputDisplay = str;
        calculator.operandHasDecimal = true;

        equal();

        assert.strictEqual(
          calculator.inputDisplay,
          result,
          `inputDisplay should be approximately '${result}'`
        );

        assert.strictEqual(
          calculator.resultDisplay,
          "60 × 82.576 − √654% + 7878 =",
          "resultDisplay should be '60 × 82.576 − √654% + 7878 ='"
        );

        assert.strictEqual(
          calculator.operandHasDecimal,
          false,
          "operandHasDecimal should be false"
        );

        assert.strictEqual(
          calculator.evaluated,
          true,
          "evaluated should be true"
        );
      });
    });

    it("1:- should evaluate a string of expressions", () => {
      const str = "5% + √100.635 − 82.5 × −57.6356% + √64 ÷ 0.0006735";
      const regex = /−?\d+\.?\d*/;
      const output = evaluate(str);
      const result = "11935.879028182404";

      assert.isString(output, "output should be of type string");

      assert.match(output, regex, `output should match '${regex}'`);

      assert.approximately(
        +output,
        +result,
        0.5,
        `result should be approximately '${result}'`
      );
    });
  });
});
