let numberStr = "";
let lastNumber = "";
let operation = "";

function updateDisplay(value) {
  const display = document.querySelector(".calculator__display");
  display.textContent = value;
}

function handleDigits(target) {
  numberStr.length < 8
    ? (numberStr += target.textContent.trim())
    : (lastNumber = numberStr);
  updateDisplay(numberStr);
}

function getResult(number1, number2, operation) {
  let result = 0;

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

function handleOperation(target) {
  if (target.id === "operation-equal") {
    const number1 = Number(lastNumber);
    const number2 = Number(numberStr);
    numberStr = getResult(number1, number2, operation);
    updateDisplay(numberStr);
  } else {
    operation = target.textContent.trim();
    lastNumber = numberStr;
    numberStr = "";
  }
}

function handleClick(e) {
  const targetClasses = e.target.classList;
  if (targetClasses.contains("btn--digits")) handleDigits(e.target);
  if (targetClasses.contains("btn--operation")) handleOperation(e.target);
}

function listenButtons() {
  const buttons = document.querySelectorAll(".btn");

  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    button.addEventListener("click", handleClick);
  }
}

listenButtons();
