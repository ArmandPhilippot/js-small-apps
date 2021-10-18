let numberStr = "";
let lastNumber = "";
let operation = "";
let lastResult;
let lastInput = [];
const inputHistory = [];
const operators = ["+", "-", "/", "*"];

/**
 * Check if the provided string is an operator.
 * @param {String} string - The string to test.
 * @returns True if it is an operator; false otherwise.
 */
function isOperator(string) {
  const operatorIndex = operators.findIndex((operator) => operator === string);
  return operatorIndex === -1 ? false : true;
}

/**
 * Check if the provided string represents a decimal number.
 * @param {String} string - The string to test.
 * @returns True if the string represents a decimal number.
 */
function isDecimal(string) {
  const dotIndex = string.indexOf(".");
  return dotIndex === -1 ? false : true;
}

/**
 * Display a value in calculator display.
 * @param {String} value - The value to display in the DOM.
 */
function updateDisplay(value) {
  const display = document.querySelector(".calculator__display");
  display.textContent = value;
}

/**
 * Check if the string exceeds the limit of 8 characters.
 * @param {String} string - The string to test.
 * @returns True if the length is greater than 8; false otherwise.
 */
function isDigitsLimitReached(string) {
  const digitsPart = string.split(".")[0];
  return digitsPart?.length > 8 ? true : false;
}

/**
 * Check if the decimal part exceeds the limit of 3 characters.
 * @param {String} string - The string to test.
 * @returns True if the decimal part is greater than 3; false otherwise.
 */
function isDecimalLimitReached(string) {
  const decimalPart = string.split(".")[1];
  return decimalPart?.length > 3 ? true : false;
}

/**
 * Check if the clicked button represents the plus/minus sign.
 * @param {String} id - The button id.
 * @returns True if the clicked button represents plus/minus sign.
 */
function isNegativePositive(id) {
  return id === "sign" ? true : false;
}

/**
 * Check if the string represents a negative number.
 * @param {String} string - The string to test.
 * @returns True if the string starts with a minus sign; false otherwise.
 */
function isNegativeNumber(string) {
  return string.startsWith("-");
}

/**
 * Check if the represented number starts with a 0.
 * @param {String} string The string to test.
 * @returns True if the string starts with a 0; false otherwise.
 */
function hasLeadingZero(string) {
  if (isNegativeNumber(string) && string.charAt(1) === "0") return true;
  if (string.startsWith("0")) return true;
  return false;
}

/**
 * Compute the provided number.
 * @param {Object} target - The button target.
 * @returns {void}
 */
function handleDigits(target) {
  const isDecimalInput = target.textContent.trim() === ".";

  if (isNegativeNumber(numberStr) && hasLeadingZero(numberStr)) {
    numberStr = numberStr.replace("0", "");
  }
  if (isDecimalInput && isDecimal(numberStr)) return;
  if (!numberStr && isDecimalInput) numberStr = 0;
  if (isNegativePositive(target.id)) {
    if (isNegativeNumber(numberStr)) {
      numberStr = numberStr.replace("-", "");
    } else {
      numberStr = numberStr ? `-${numberStr}` : "-0";
    }
  } else {
    numberStr += target.textContent.trim();
  }
  if (isDigitsLimitReached(numberStr) || isDecimalLimitReached(numberStr)) {
    numberStr = numberStr.slice(0, -1);
  }
  inputHistory.push(numberStr);
  updateDisplay(numberStr);
}

/**
 * Calculate the operation between two numbers.
 * @param {Number} number1 - The left part of the operation.
 * @param {Number} number2 - The second part of the operation.
 * @param {String} operation - The current operation.
 * @returns {Number} The result.
 */
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

/**
 * Print the operation result.
 */
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

/**
 * Handle the different operations.
 * @param {Object} target - The button target.
 */
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

/**
 * Reset the calculator.
 */
function clearAll() {
  numberStr = "";
  lastNumber = "";
  lastResult = undefined;
  operation = "";
  inputHistory.length = 0;
  updateDisplay(0);
}

/**
 * Undo the previous input.
 */
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

/**
 * Determine wether clear all or clear is needed.
 * @param {Object} target - The button target.
 */
function handleClear(target) {
  if (target.id === "clear-all") clearAll();
  if (target.id === "clear") clear();
}

/**
 * Determine which function to call on click.
 * @param {Object} e - The button event.
 */
function handleClick(e) {
  const targetClasses = e.target.classList;
  if (targetClasses.contains("btn--digits")) handleDigits(e.target);
  if (targetClasses.contains("btn--operation")) handleOperation(e.target);
  if (targetClasses.contains("btn--clear")) handleClear(e.target);
}

/**
 * Listen the calculator buttons.
 */
function listenButtons() {
  const buttons = document.querySelectorAll(".btn");

  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    button.addEventListener("click", handleClick);
  }
}

listenButtons();
