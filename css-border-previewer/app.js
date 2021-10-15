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

function setBordersRadius(
  firstRadius,
  firstRadiusUnit,
  secondRadius = "",
  secondRadiusUnit = ""
) {
  const bordersRadius = `${firstRadius}${firstRadiusUnit}${
    secondRadius ? ` / ${secondRadius}${secondRadiusUnit}` : ""
  }`;
  console.log(bordersRadius);
  box.style.borderRadius = bordersRadius;
}

function init() {
  const bordersWidthInput = document.getElementById("borders-width");
  const bordersUnitSelect = document.getElementById("borders-unit");
  const bordersStyleSelect = document.getElementById("borders-style");
  const bordersColorInput = document.getElementById("borders-color");
  const bordersFirstRadius = document.getElementById("borders-first-radius");
  const bordersFirstRadiusUnit = document.getElementById(
    "borders-first-radius-unit"
  );
  const bordersSecondRadius = document.getElementById("borders-second-radius");
  const bordersSecondRadiusUnit = document.getElementById(
    "borders-second-radius-unit"
  );

  setBordersColor(bordersColorInput.value);
  setBordersStyle(bordersStyleSelect.value);
  setBordersWidth(bordersWidthInput.value, bordersUnitSelect.value);
  setBordersRadius(
    bordersFirstRadius.value,
    bordersFirstRadiusUnit.value,
    bordersSecondRadius.value,
    bordersSecondRadiusUnit.value
  );

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
  bordersFirstRadius.addEventListener("input", (e) =>
    setBordersRadius(e.target.value, bordersFirstRadiusUnit.value)
  );
  bordersFirstRadiusUnit.addEventListener("input", (e) =>
    setBordersRadius(bordersFirstRadius.value, e.target.value)
  );
  bordersSecondRadius.addEventListener("input", (e) =>
    setBordersRadius(
      bordersFirstRadius.value,
      bordersFirstRadiusUnit.value,
      e.target.value,
      bordersSecondRadiusUnit.value
    )
  );
  bordersSecondRadiusUnit.addEventListener("input", (e) =>
    setBordersRadius(
      bordersFirstRadius.value,
      bordersFirstRadiusUnit.value,
      bordersSecondRadius.value,
      e.target.value
    )
  );
}

init();
