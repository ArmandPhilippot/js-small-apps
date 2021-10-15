function setErrorBox() {
  const main = document.querySelector(".main");
  const resultBox = document.querySelector(".result-box");
  const errorBox = document.createElement("div");
  errorBox.classList.add("error-box");
  main.insertBefore(errorBox, resultBox);
}

function getErrorBox() {
  let errorBox = document.querySelector(".error-box");

  if (!errorBox) {
    setErrorBox();
    errorBox = document.querySelector(".error-box");
  }

  return errorBox;
}

function removeErrorBox() {
  const errorBox = getErrorBox();
  errorBox.remove();
}

function printError(error) {
  const errorBox = getErrorBox();
  errorBox.textContent = error;
}

function isValidInput(key) {
  return key === "0" || key === "1";
}

function hasInvalidChar(string) {
  const regex = /(?![01])./g;
  const invalid = string.search(regex);
  return invalid === -1 ? false : true;
}

function handleInput(value) {
  if (hasInvalidChar(value)) {
    const error = "Error: valid characters are 0 or 1.";
    printError(error);
  } else {
    removeErrorBox();
  }
}

function init() {
  const input = document.querySelector(".form__input");
  handleInput(input.value);
  input.addEventListener("keyup", (e) => handleInput(e.target.value));
}

init();
