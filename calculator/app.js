let numberStr = "";
let lastNumber = "";
let operation = "";
let lastResult;
let lastInput = [];
const inputHistory = [];
const operators = ["+", "-", "/", "*"];

function isOperator(string) {
  const operatorIndex = operators.findIndex((operator) => operator === string);
  return operatorIndex === -1 ? false : true;
}

function updateDisplay(value) {
  const display = document.querySelector(".calculator__display");
  display.textContent = value;
}

function handleDigits(target) {
  if (numberStr.length < 8) {
    numberStr += target.textContent.trim();
    inputHistory.push(numberStr);
  }
  updateDisplay(numberStr);
}

function calculate(number1, number2, operation) {
  let result = 0;

  if (!operation) return number2;

  switch (operation) {
    case "+":
      result = number1 + number2;
      break;
    case "-":
      result = number1 - number2;
      break;
    case "/":
      result = number1 / number2;
      break;
    case "*":
      result = number1 * number2;
      break;
    default:
      break;
  }

  return result;
}

function printResult() {
  const number1 = Number(lastNumber);
  const number2 = Number(numberStr);
  numberStr = calculate(number1, number2, operation);
  lastResult = numberStr;
  lastNumber = "";
  numberStr.toString().length >= 8
    ? updateDisplay("ERR")
    : updateDisplay(numberStr);
}

function handleOperation(target) {
  inputHistory.push(target.textContent.trim());
  if (target.id === "operation-equal") {
    printResult();
  } else {
    if (lastNumber && numberStr) printResult();
    operation = target.textContent.trim();
    lastNumber = numberStr;
    numberStr = "";
  }
}

function clearAll() {
  numberStr = "";
  lastNumber = "";
  lastResult = undefined;
  operation = "";
  inputHistory.length = 0;
  updateDisplay(0);
}

function clear() {
  const lastInput = inputHistory.pop();
  if (isOperator(lastInput)) {
    operation = "";
    numberStr = lastResult ?? lastNumber;
    lastNumber = "";
    updateDisplay(numberStr);
  } else if (lastInput === "=") {
    clearAll();
  } else {
    if (lastNumber) {
      numberStr = "";
      updateDisplay(lastNumber);
    } else if (lastResult) {
      numberStr = lastResult;
      lastResult = undefined;
      updateDisplay(numberStr);
    } else {
      numberStr = "";
      updateDisplay(0);
    }
  }
}

function handleClear(target) {
  if (target.id === "clear-all") clearAll();
  if (target.id === "clear") clear();
}

function handleClick(e) {
  const targetClasses = e.target.classList;
  if (targetClasses.contains("btn--digits")) handleDigits(e.target);
  if (targetClasses.contains("btn--operation")) handleOperation(e.target);
  if (targetClasses.contains("btn--clear")) handleClear(e.target);
}

function listenButtons() {
  const buttons = document.querySelectorAll(".btn");

  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    button.addEventListener("click", handleClick);
  }
}

listenButtons();
