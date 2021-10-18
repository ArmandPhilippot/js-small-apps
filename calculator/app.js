let numberStr = "";

function updateDisplay(value) {
  const display = document.querySelector(".calculator__display");
  display.textContent = value;
}

function handleDigits(target) {
  if (numberStr.length < 8) numberStr += target.textContent;
  updateDisplay(numberStr);
}

function handleClick(e) {
  if (e.target.classList.contains("btn--digits")) handleDigits(e.target);
}

function listenButtons() {
  const buttons = document.querySelectorAll(".btn");

  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    button.addEventListener("click", handleClick);
  }
}

listenButtons();
