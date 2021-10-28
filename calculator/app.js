const appHistory = ["0"];

/**
 * Check if a value is numeric.
 * @param {String} value - A value to test.
 * @returns {Boolean} True if value is numeric; false otherwise.
 */
function isNumeric(value) {
  return !isNaN(value);
}

/**
 * Check if a value is an operation (+, -, *, /, =).
 * @param {String} value - A value to test.
 * @returns {Boolean} True if value is an operation; false otherwise.
 */
function isOperation(value) {
  return "+-*/=".includes(value);
}

/**
 * Check if the value exceeds the limit of 8 characters.
 * @param {String} value - The value to test.
 * @returns True if the length is greater than 8; false otherwise.
 */
function isDigitsLimitReached(value) {
  const digitsPart = value.split(".")[0];
  return digitsPart?.length > 8 ? true : false;
}

/**
 * Check if the decimal part exceeds the limit of 3 characters.
 * @param {String} value - The value to test.
 * @returns True if the decimal part is greater than 3; false otherwise.
 */
function isDecimalLimitReached(value) {
  const decimalPart = value.split(".")[1];
  return decimalPart?.length > 3 ? true : false;
}

/**
 * Retrieve the last history value.
 * @returns {String} The last history input.
 */
function getLastHistoryInput() {
  return appHistory.slice(-1)[0];
}

/**
 * Update the calculator display.
 * @param {String} value - The value to print.
 */
function updateDisplay(value) {
  const display = document.querySelector(".calculator__display");

  if (isDigitsLimitReached(value) || isDecimalLimitReached(value)) {
    display.textContent = "ERR";
  } else {
    display.textContent = value;
  }
}

/**
 * Calculate the result of an operation.
 * @param {Number} number1 - The left number of operation.
 * @param {Number} number2 - The right number of operation.
 * @param {String} operation - An operation (+, -, *, /).
 * @returns {Number} The operation result.
 */
function calculate(number1, number2, operation) {
  let result;

  switch (operation) {
    case "+":
      result = number1 + number2;
      break;
    case "-":
      result = number1 - number2;
      break;
    case "*":
      result = number1 * number2;
      break;
    case "/":
      result = number1 / number2;
    default:
      break;
  }

  return result;
}

/**
 * Get the result of an operation.
 * @returns {Number} The operation result.
 */
function getResult() {
  const historyCopy = appHistory.slice(0);
  const number2 = Number(historyCopy.pop());
  const operation = historyCopy.pop();
  const number1 = Number(historyCopy.pop());
  const result = calculate(number1, number2, operation);

  return result;
}

/**
 * Handle digit input.
 * @param {String} value - The digit value.
 */
function handleDigits(value) {
  const lastInput = getLastHistoryInput();
  const beforeLastInput = appHistory.slice(-2)[0];
  let newInput;

  if (isNaN(lastInput) || beforeLastInput === "=") {
    newInput = value;
  } else {
    appHistory.pop();
    newInput = lastInput === "0" ? value : `${lastInput}${value}`;
  }

  if (isDigitsLimitReached(newInput) || isDecimalLimitReached(newInput)) {
    newInput = newInput.slice(0, -1);
  }

  appHistory.push(newInput);
  updateDisplay(newInput);
}

/**
 * Handle operation input.
 * @param {String} value - The operation.
 * @returns {void}
 */
function handleOperation(value) {
  const lastInput = getLastHistoryInput();

  if (isOperation(lastInput)) return;

  const result = getResult();

  if (result) {
    appHistory.push("=");
    appHistory.push(`${result}`);
    updateDisplay(`${result}`);
  }

  if (value !== "=") appHistory.push(value);
}

/**
 * Handle number sign.
 * @returns {void}
 */
function handleNumberSign() {
  const lastInput = getLastHistoryInput();
  if (isNaN(lastInput)) return;

  const sign = Math.sign(lastInput);
  if (sign === 0) return;

  appHistory.pop();
  let newInput;

  if (sign === 1) {
    newInput = -Math.abs(lastInput);
  } else if (sign === -1) {
    newInput = Math.abs(lastInput);
  }

  appHistory.push(`${newInput}`);
  updateDisplay(`${newInput}`);
}

/**
 * Handle decimal.
 */
function handleDecimal() {
  const lastInput = getLastHistoryInput();

  if (lastInput.indexOf(".") === -1) {
    appHistory.pop();
    const newInput = `${lastInput}.`;
    appHistory.push(newInput);
    updateDisplay(newInput);
  }
}

/**
 * Clear the last input.
 */
function clear() {
  appHistory.pop();

  if (appHistory.length === 0) {
    appHistory.push("0");
    updateDisplay("0");
  } else {
    const reversedHistory = appHistory.slice(0).reverse();
    const lastNumericInput = reversedHistory.find((input) => isNumeric(input));
    updateDisplay(lastNumericInput);

    let lastInput = getLastHistoryInput();

    while (lastNumericInput !== lastInput) {
      appHistory.pop();
      lastInput = getLastHistoryInput();
    }
  }
}

/**
 * Reset the calculator.
 */
function clearAll() {
  appHistory.length = 0;
  appHistory.push("0");
  updateDisplay("0");
}

/**
 * Dispatch the event to the right function.
 * @param {MouseEvent} e - The click event.
 */
function dispatch(e) {
  const id = e.target.id;
  const type = id.split("-")[0];
  const value = e.target.textContent.trim();

  switch (type) {
    case "digit":
      handleDigits(value);
      break;
    case "operation":
      handleOperation(value);
      break;
    case "sign":
      handleNumberSign();
      break;
    case "dot":
      handleDecimal();
      break;
    case "clear":
      clear();
      break;
    case "clearall":
      clearAll();
      break;
    default:
      break;
  }
}

/**
 * Listen all calculator buttons.
 */
function listen() {
  const buttons = document.getElementsByClassName("btn");
  const buttonsArray = Array.from(buttons);
  buttonsArray.forEach((btn) => {
    btn.addEventListener("click", dispatch);
  });
}

listen();
