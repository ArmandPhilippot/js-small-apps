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

function convertBinToDec(bin) {
  let result = 0;

  for (const char of bin) {
    result = result * 2 + Number(char);
  }

  return result;
}

function handleSubmit(e) {
  e.preventDefault();
  const input = document.querySelector(".form__input");
  const result = document.getElementById("result");
  result.textContent = convertBinToDec(input.value);
}

function init() {
  const form = document.querySelector(".form");
  const input = document.querySelector(".form__input");
  handleInput(input.value);
  form.addEventListener("submit", handleSubmit);
  input.addEventListener("keyup", (e) => handleInput(e.target.value));
}

init();
