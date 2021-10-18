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

function isDecimal(string) {
  const dotIndex = string.indexOf(".");
  return dotIndex === -1 ? false : true;
}

function updateDisplay(value) {
  const display = document.querySelector(".calculator__display");
  display.textContent = value;
}

function isDigitsLimitReached(string) {
  const digitsPart = string.split(".")[0];
  return digitsPart?.length > 8 ? true : false;
}

function isDecimalLimitReached(string) {
  const decimalPart = string.split(".")[1];
  return decimalPart?.length > 3 ? true : false;
}

function handleDigits(target) {
  const isDecimalInput = target.textContent.trim() === ".";
  if (isDecimalInput && isDecimal(numberStr)) return;
  if (!numberStr && isDecimalInput) numberStr = 0;
  numberStr += target.textContent.trim();
  if (isDigitsLimitReached(numberStr) || isDecimalLimitReached(numberStr)) {
    numberStr = numberStr.slice(0, -1);
  }
  inputHistory.push(numberStr);
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
  numberStr = calculate(number1, number2, operation).toString();
  lastResult = numberStr;
  lastNumber = "";
  isDigitsLimitReached(numberStr) || isDecimalLimitReached(numberStr)
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
  }
  numberStr = "";
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
