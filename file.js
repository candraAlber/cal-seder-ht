const calculator = {
  displayNumber: "0",
  operator: null,
  firstNumber: null,
  waitingForSecondNumber: false,
};

const updateDisplay = () => {
  document.querySelector(".your-display-element-selector").innerText =
    calculator.displayNumber;
};

const clearDisplay = () => {
  calculator.displayNumber = "0";
  calculator.operator = null;
  calculator.firstNumber = null;
  calculator.waitingForSecondNumber = false;
  updateDisplay();
};

const inputDigit = (digit) => {
  if (calculator.displayNumber === "0" || calculator.waitingForSecondNumber) {
    calculator.displayNumber = digit;
    calculator.waitingForSecondNumber = false;
  } else {
    calculator.displayNumber += digit;
  }
  updateDisplay();
};

const invertNumber = () => {
  if (calculator.displayNumber === "0") {
    return;
  }
  calculator.displayNumber = (
    parseFloat(calculator.displayNumber) * -1
  ).toString();
  updateDisplay();
};

const equalsNumber = () => {
  if (calculator.firstNumber === null || calculator.operator === null) {
    alert("Anda belum menetapkan operator");
    return;
  }

  let result = 0;
  const secondNumber = parseFloat(calculator.displayNumber);

  if (calculator.operator === "+") {
    result = parseFloat(calculator.firstNumber) + secondNumber;
  } else {
    result = parseFloat(calculator.firstNumber) - secondNumber;
  }

  calculator.displayNumber = result.toString();
  calculator.operator = null;
  calculator.firstNumber = null;
  calculator.waitingForSecondNumber = false;
  updateDisplay();
};

const handleOperator = (operator) => {
  if (calculator.waitingForSecondNumber) {
    alert("Operator sudah ditetapkan");
    return;
  }

  if (calculator.firstNumber !== null) {
    equalsNumber();
  }

  calculator.operator = operator;
  calculator.waitingForSecondNumber = true;
  calculator.firstNumber = calculator.displayNumber;
  calculator.displayNumber = "0";
};

const performCalculator = () => {
  if (calculator.firstNumber === null || calculator.operator === null) {
    alert("Anda belum menetapkan operator");
    return;
  }

  equalsNumber();
  renderHistory();
};

const buttons = document.querySelectorAll(".button");
for (const button of buttons) {
  button.addEventListener("click", function (event) {
    const target = event.target;

    if (target.classList.contains("clear")) {
      clearDisplay();
    } else if (target.classList.contains("invert")) {
      invertNumber();
    } else if (target.classList.contains("operator")) {
      handleOperator(target.innerText);
    } else if (target.classList.contains("equals")) {
      performCalculator();
    } else {
      inputDigit(target.innerText);
    }
  });
}
