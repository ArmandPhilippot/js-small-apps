const box = document.querySelector(".box");

function setBordersWidth(value, unit) {
  const bordersWidth = `${value}${unit}`;
  box.style.borderWidth = bordersWidth;
}

function setBordersStyle(value) {
  box.style.borderStyle = value;
}

function setBordersColor(value) {
  box.style.borderColor = value;
}

function init() {
  const bordersWidthInput = document.getElementById("borders-width");
  const bordersUnitSelect = document.getElementById("borders-unit");
  const bordersStyleSelect = document.getElementById("borders-style");
  const bordersColorInput = document.getElementById("borders-color");

  setBordersColor(bordersColorInput.value);
  setBordersStyle(bordersStyleSelect.value);
  setBordersWidth(bordersWidthInput.value, bordersUnitSelect.value);

  bordersWidthInput.addEventListener("input", (e) =>
    setBordersWidth(e.target.value, bordersUnitSelect.value)
  );
  bordersUnitSelect.addEventListener("input", (e) =>
    setBordersWidth(bordersWidthInput.value, e.target.value)
  );
  bordersStyleSelect.addEventListener("input", (e) =>
    setBordersStyle(e.target.value)
  );
  bordersColorInput.addEventListener("input", (e) =>
    setBordersColor(e.target.value)
  );
}

init();
