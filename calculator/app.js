let numberStr = "";
let lastNumber = "";
let operation = "";

function updateDisplay(value) {
  const display = document.querySelector(".calculator__display");
  display.textContent = value;
}

function handleDigits(target) {
  if (numberStr.length < 8) numberStr += target.textContent.trim();
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
  lastNumber = "";
  numberStr.toString().length >= 8
    ? updateDisplay("ERR")
    : updateDisplay(numberStr);
}

function handleOperation(target) {
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
  operation = "";
  updateDisplay(0);
}

function handleClear(target) {
  if (target.id === "clear-all") clearAll();
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
