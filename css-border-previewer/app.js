const box = document.querySelector(".box");

function setCommonBorderWidth(value, unit) {
  const bordersWidth = `${value}${unit}`;
  box.style.borderWidth = bordersWidth;
}

function setCommonBorderStyle(value) {
  box.style.borderStyle = value;
}

function setCommonBorderColor(value) {
  box.style.borderColor = value;
}

function setCommonBorderRadius(
  firstRadius,
  firstRadiusUnit,
  secondRadius = "",
  secondRadiusUnit = ""
) {
  const bordersRadius = `${firstRadius}${firstRadiusUnit}${
    secondRadius ? ` / ${secondRadius}${secondRadiusUnit}` : ""
  }`;
  box.style.borderRadius = bordersRadius;
}

function initCommonBorder() {
  const bordersWidthInput = document.getElementById("borders-width");
  const bordersUnitSelect = document.getElementById("borders-unit");
  const bordersStyleSelect = document.getElementById("borders-style");
  const bordersColorInput = document.getElementById("borders-color");

  setCommonBorderColor(bordersColorInput.value);
  setCommonBorderStyle(bordersStyleSelect.value);
  setCommonBorderWidth(bordersWidthInput.value, bordersUnitSelect.value);

  bordersWidthInput.addEventListener("input", (e) =>
    setCommonBorderWidth(e.target.value, bordersUnitSelect.value)
  );
  bordersUnitSelect.addEventListener("input", (e) =>
    setCommonBorderWidth(bordersWidthInput.value, e.target.value)
  );
  bordersStyleSelect.addEventListener("input", (e) =>
    setCommonBorderStyle(e.target.value)
  );
  bordersColorInput.addEventListener("input", (e) =>
    setCommonBorderColor(e.target.value)
  );
}

function initCommonBorderRadius() {
  const bordersFirstRadius = document.getElementById("borders-first-radius");
  const bordersFirstRadiusUnit = document.getElementById(
    "borders-first-radius-unit"
  );
  const bordersSecondRadius = document.getElementById("borders-second-radius");
  const bordersSecondRadiusUnit = document.getElementById(
    "borders-second-radius-unit"
  );

  setCommonBorderRadius(
    bordersFirstRadius.value,
    bordersFirstRadiusUnit.value,
    bordersSecondRadius.value,
    bordersSecondRadiusUnit.value
  );

  bordersFirstRadius.addEventListener("input", (e) =>
    setCommonBorderRadius(e.target.value, bordersFirstRadiusUnit.value)
  );
  bordersFirstRadiusUnit.addEventListener("input", (e) =>
    setCommonBorderRadius(bordersFirstRadius.value, e.target.value)
  );
  bordersSecondRadius.addEventListener("input", (e) =>
    setCommonBorderRadius(
      bordersFirstRadius.value,
      bordersFirstRadiusUnit.value,
      e.target.value,
      bordersSecondRadiusUnit.value
    )
  );
  bordersSecondRadiusUnit.addEventListener("input", (e) =>
    setCommonBorderRadius(
      bordersFirstRadius.value,
      bordersFirstRadiusUnit.value,
      bordersSecondRadius.value,
      e.target.value
    )
  );
}

function setBorderTopWidth(value, unit) {
  const borderTopWidth = `${value}${unit}`;
  box.style.borderTopWidth = borderTopWidth;
}

function setBorderRightWidth(value, unit) {
  const borderRightWidth = `${value}${unit}`;
  box.style.borderRightWidth = borderRightWidth;
}

function setBorderBottomWidth(value, unit) {
  const borderBottomWidth = `${value}${unit}`;
  box.style.borderBottomWidth = borderBottomWidth;
}

function setBorderLeftWidth(value, unit) {
  const borderLeftWidth = `${value}${unit}`;
  box.style.borderLeftWidth = borderLeftWidth;
}

function setBorderTopStyle(value) {
  box.style.borderTopStyle = value;
}

function setBorderRightStyle(value) {
  box.style.borderRightStyle = value;
}

function setBorderBottomStyle(value) {
  box.style.borderBottomStyle = value;
}

function setBorderLeftStyle(value) {
  box.style.borderLeftStyle = value;
}

function setBorderTopColor(value) {
  box.style.borderTopColor = value;
}

function setBorderRightColor(value) {
  box.style.borderRightColor = value;
}

function setBorderBottomColor(value) {
  box.style.borderBottomColor = value;
}

function setBorderLeftColor(value) {
  box.style.borderLeftColor = value;
}

function initBorderTop() {
  const borderTopWidthInput = document.getElementById("border-top-width");
  const borderTopUnitSelect = document.getElementById("border-top-unit");
  const borderTopStyleSelect = document.getElementById("border-top-style");
  const borderTopColorInput = document.getElementById("border-top-color");

  setBorderTopColor(borderTopColorInput.value);
  setBorderTopStyle(borderTopStyleSelect.value);
  setBorderTopWidth(borderTopWidthInput.value, borderTopUnitSelect.value);

  borderTopColorInput.addEventListener("input", (e) =>
    setBorderTopColor(e.target.value)
  );
  borderTopStyleSelect.addEventListener("input", (e) =>
    setBorderTopStyle(e.target.value)
  );
  borderTopWidthInput.addEventListener("input", (e) =>
    setBorderTopWidth(e.target.value, borderTopUnitSelect.value)
  );
  borderTopUnitSelect.addEventListener("input", (e) =>
    setBorderTopWidth(borderTopWidthInput.value, e.target.value)
  );
}

function initBorderRight() {
  const borderRightWidthInput = document.getElementById("border-right-width");
  const borderRightUnitSelect = document.getElementById("border-right-unit");
  const borderRightStyleSelect = document.getElementById("border-right-style");
  const borderRightColorInput = document.getElementById("border-right-color");

  setBorderRightColor(borderRightColorInput.value);
  setBorderRightStyle(borderRightStyleSelect.value);
  setBorderRightWidth(borderRightWidthInput.value, borderRightUnitSelect.value);

  borderRightColorInput.addEventListener("input", (e) =>
    setBorderRightColor(e.target.value)
  );
  borderRightStyleSelect.addEventListener("input", (e) =>
    setBorderRightStyle(e.target.value)
  );
  borderRightWidthInput.addEventListener("input", (e) =>
    setBorderRightWidth(e.target.value, borderRightUnitSelect.value)
  );
  borderRightUnitSelect.addEventListener("input", (e) =>
    setBorderRightWidth(borderRightWidthInput.value, e.target.value)
  );
}

function initBorderBottom() {
  const borderBottomWidthInput = document.getElementById("border-bottom-width");
  const borderBottomUnitSelect = document.getElementById("border-bottom-unit");
  const borderBottomStyleSelect = document.getElementById(
    "border-bottom-style"
  );
  const borderBottomColorInput = document.getElementById("border-bottom-color");

  setBorderBottomColor(borderBottomColorInput.value);
  setBorderBottomStyle(borderBottomStyleSelect.value);
  setBorderBottomWidth(
    borderBottomWidthInput.value,
    borderBottomUnitSelect.value
  );

  borderBottomColorInput.addEventListener("input", (e) =>
    setBorderBottomColor(e.target.value)
  );
  borderBottomStyleSelect.addEventListener("input", (e) =>
    setBorderBottomStyle(e.target.value)
  );
  borderBottomWidthInput.addEventListener("input", (e) =>
    setBorderBottomWidth(e.target.value, borderBottomUnitSelect.value)
  );
  borderBottomUnitSelect.addEventListener("input", (e) =>
    setBorderBottomWidth(borderBottomWidthInput.value, e.target.value)
  );
}

function initBorderLeft() {
  const borderLeftWidthInput = document.getElementById("border-left-width");
  const borderLeftUnitSelect = document.getElementById("border-left-unit");
  const borderLeftStyleSelect = document.getElementById("border-left-style");
  const borderLeftColorInput = document.getElementById("border-left-color");

  setBorderLeftColor(borderLeftColorInput.value);
  setBorderLeftStyle(borderLeftStyleSelect.value);
  setBorderLeftWidth(borderLeftWidthInput.value, borderLeftUnitSelect.value);

  borderLeftColorInput.addEventListener("input", (e) =>
    setBorderLeftColor(e.target.value)
  );
  borderLeftStyleSelect.addEventListener("input", (e) =>
    setBorderLeftStyle(e.target.value)
  );
  borderLeftWidthInput.addEventListener("input", (e) =>
    setBorderLeftWidth(e.target.value, borderLeftUnitSelect.value)
  );
  borderLeftUnitSelect.addEventListener("input", (e) =>
    setBorderLeftWidth(borderLeftWidthInput.value, e.target.value)
  );
}

function setBorderTopLeftRadius(
  firstRadius,
  firstRadiusUnit,
  secondRadius = "",
  secondRadiusUnit = ""
) {
  const borderTopLeftRadius = `${firstRadius}${firstRadiusUnit}${
    secondRadius ? ` / ${secondRadius}${secondRadiusUnit}` : ""
  }`;
  box.style.borderTopLeftRadius = borderTopLeftRadius;
}

function setBorderTopRightRadius(
  firstRadius,
  firstRadiusUnit,
  secondRadius = "",
  secondRadiusUnit = ""
) {
  const borderTopRightRadius = `${firstRadius}${firstRadiusUnit}${
    secondRadius ? ` / ${secondRadius}${secondRadiusUnit}` : ""
  }`;
  box.style.borderTopRightRadius = borderTopRightRadius;
}

function setBorderBottomLeftRadius(
  firstRadius,
  firstRadiusUnit,
  secondRadius = "",
  secondRadiusUnit = ""
) {
  const borderBottomLeftRadius = `${firstRadius}${firstRadiusUnit}${
    secondRadius ? ` / ${secondRadius}${secondRadiusUnit}` : ""
  }`;
  box.style.borderBottomLeftRadius = borderBottomLeftRadius;
}

function setBorderBottomRightRadius(
  firstRadius,
  firstRadiusUnit,
  secondRadius = "",
  secondRadiusUnit = ""
) {
  const borderBottomRightRadius = `${firstRadius}${firstRadiusUnit}${
    secondRadius ? ` / ${secondRadius}${secondRadiusUnit}` : ""
  }`;
  box.style.borderBottomRightRadius = borderBottomRightRadius;
}

function initBorderTopLeftRadius() {
  const borderTopLeftFirstRadius = document.getElementById(
    "border-top-left-first-radius"
  );
  const borderTopLeftFirstRadiusUnit = document.getElementById(
    "border-top-left-first-radius-unit"
  );
  const borderTopLeftSecondRadius = document.getElementById(
    "border-top-left-second-radius"
  );
  const borderTopLeftSecondRadiusUnit = document.getElementById(
    "border-top-left-second-radius-unit"
  );

  setBorderTopLeftRadius(
    borderTopLeftFirstRadius.value,
    borderTopLeftFirstRadiusUnit.value,
    borderTopLeftSecondRadius.value,
    borderTopLeftSecondRadiusUnit.value
  );

  borderTopLeftFirstRadius.addEventListener("input", (e) =>
    setBorderTopLeftRadius(e.target.value, borderTopLeftFirstRadiusUnit.value)
  );
  borderTopLeftFirstRadiusUnit.addEventListener("input", (e) =>
    setBorderTopLeftRadius(borderTopLeftFirstRadius.value, e.target.value)
  );
  borderTopLeftSecondRadius.addEventListener("input", (e) =>
    setBorderTopLeftRadius(
      borderTopLeftFirstRadius.value,
      borderTopLeftFirstRadiusUnit.value,
      e.target.value,
      borderTopLeftSecondRadiusUnit.value
    )
  );
  borderTopLeftSecondRadiusUnit.addEventListener("input", (e) =>
    setBorderTopLeftRadius(
      borderTopLeftFirstRadius.value,
      borderTopLeftFirstRadiusUnit.value,
      borderTopLeftSecondRadius.value,
      e.target.value
    )
  );
}

function initBorderTopRightRadius() {
  const borderTopRightFirstRadius = document.getElementById(
    "border-top-right-first-radius"
  );
  const borderTopRightFirstRadiusUnit = document.getElementById(
    "border-top-right-first-radius-unit"
  );
  const borderTopRightSecondRadius = document.getElementById(
    "border-top-right-second-radius"
  );
  const borderTopRightSecondRadiusUnit = document.getElementById(
    "border-top-right-second-radius-unit"
  );

  setBorderTopRightRadius(
    borderTopRightFirstRadius.value,
    borderTopRightFirstRadiusUnit.value,
    borderTopRightSecondRadius.value,
    borderTopRightSecondRadiusUnit.value
  );

  borderTopRightFirstRadius.addEventListener("input", (e) =>
    setBorderTopRightRadius(e.target.value, borderTopRightFirstRadiusUnit.value)
  );
  borderTopRightFirstRadiusUnit.addEventListener("input", (e) =>
    setBorderTopRightRadius(borderTopRightFirstRadius.value, e.target.value)
  );
  borderTopRightSecondRadius.addEventListener("input", (e) =>
    setBorderTopRightRadius(
      borderTopRightFirstRadius.value,
      borderTopRightFirstRadiusUnit.value,
      e.target.value,
      borderTopRightSecondRadiusUnit.value
    )
  );
  borderTopRightSecondRadiusUnit.addEventListener("input", (e) =>
    setBorderTopRightRadius(
      borderTopRightFirstRadius.value,
      borderTopRightFirstRadiusUnit.value,
      borderTopRightSecondRadius.value,
      e.target.value
    )
  );
}

function initBorderBottomLeftRadius() {
  const borderBottomLeftFirstRadius = document.getElementById(
    "border-bottom-left-first-radius"
  );
  const borderBottomLeftFirstRadiusUnit = document.getElementById(
    "border-bottom-left-first-radius-unit"
  );
  const borderBottomLeftSecondRadius = document.getElementById(
    "border-bottom-left-second-radius"
  );
  const borderBottomLeftSecondRadiusUnit = document.getElementById(
    "border-bottom-left-second-radius-unit"
  );

  setBorderBottomLeftRadius(
    borderBottomLeftFirstRadius.value,
    borderBottomLeftFirstRadiusUnit.value,
    borderBottomLeftSecondRadius.value,
    borderBottomLeftSecondRadiusUnit.value
  );

  borderBottomLeftFirstRadius.addEventListener("input", (e) =>
    setBorderBottomLeftRadius(
      e.target.value,
      borderBottomLeftFirstRadiusUnit.value
    )
  );
  borderBottomLeftFirstRadiusUnit.addEventListener("input", (e) =>
    setBorderBottomLeftRadius(borderBottomLeftFirstRadius.value, e.target.value)
  );
  borderBottomLeftSecondRadius.addEventListener("input", (e) =>
    setBorderBottomLeftRadius(
      borderBottomLeftFirstRadius.value,
      borderBottomLeftFirstRadiusUnit.value,
      e.target.value,
      borderBottomLeftSecondRadiusUnit.value
    )
  );
  borderBottomLeftSecondRadiusUnit.addEventListener("input", (e) =>
    setBorderBottomLeftRadius(
      borderBottomLeftFirstRadius.value,
      borderBottomLeftFirstRadiusUnit.value,
      borderBottomLeftSecondRadius.value,
      e.target.value
    )
  );
}

function initBorderBottomRightRadius() {
  const borderBottomRightFirstRadius = document.getElementById(
    "border-bottom-right-first-radius"
  );
  const borderBottomRightFirstRadiusUnit = document.getElementById(
    "border-bottom-right-first-radius-unit"
  );
  const borderBottomRightSecondRadius = document.getElementById(
    "border-bottom-right-second-radius"
  );
  const borderBottomRightSecondRadiusUnit = document.getElementById(
    "border-bottom-right-second-radius-unit"
  );

  setBorderBottomRightRadius(
    borderBottomRightFirstRadius.value,
    borderBottomRightFirstRadiusUnit.value,
    borderBottomRightSecondRadius.value,
    borderBottomRightSecondRadiusUnit.value
  );

  borderBottomRightFirstRadius.addEventListener("input", (e) =>
    setBorderBottomRightRadius(
      e.target.value,
      borderBottomRightFirstRadiusUnit.value
    )
  );
  borderBottomRightFirstRadiusUnit.addEventListener("input", (e) =>
    setBorderBottomRightRadius(
      borderBottomRightFirstRadius.value,
      e.target.value
    )
  );
  borderBottomRightSecondRadius.addEventListener("input", (e) =>
    setBorderBottomRightRadius(
      borderBottomRightFirstRadius.value,
      borderBottomRightFirstRadiusUnit.value,
      e.target.value,
      borderBottomRightSecondRadiusUnit.value
    )
  );
  borderBottomRightSecondRadiusUnit.addEventListener("input", (e) =>
    setBorderBottomRightRadius(
      borderBottomRightFirstRadius.value,
      borderBottomRightFirstRadiusUnit.value,
      borderBottomRightSecondRadius.value,
      e.target.value
    )
  );
}

function isIndividual(value) {
  return value === "true" ? true : false;
}

function initBorder(value) {
  const fieldsetCommon = document.getElementById("fieldset-borders");
  const fieldsetBorderTop = document.getElementById("fieldset-border-top");
  const fieldsetBorderRight = document.getElementById("fieldset-border-right");
  const fieldsetBorderBottom = document.getElementById(
    "fieldset-border-bottom"
  );
  const fieldsetBorderLeft = document.getElementById("fieldset-border-left");

  if (isIndividual(value)) {
    fieldsetCommon.style.display = "none";
    fieldsetBorderTop.style.display = "";
    fieldsetBorderRight.style.display = "";
    fieldsetBorderBottom.style.display = "";
    fieldsetBorderLeft.style.display = "";
    initBorderTop();
    initBorderRight();
    initBorderBottom();
    initBorderLeft();
  } else {
    fieldsetCommon.style.display = "";
    fieldsetBorderTop.style.display = "none";
    fieldsetBorderRight.style.display = "none";
    fieldsetBorderBottom.style.display = "none";
    fieldsetBorderLeft.style.display = "none";
    initCommonBorder();
  }
}

function initBorderRadius(value) {
  const fieldsetCommonRadius = document.getElementById(
    "fieldset-borders-radius"
  );
  const fieldsetBorderTopLeftRadius = document.getElementById(
    "fieldset-border-top-left-radius"
  );
  const fieldsetBorderTopRightRadius = document.getElementById(
    "fieldset-border-top-right-radius"
  );
  const fieldsetBorderBottomLeftRadius = document.getElementById(
    "fieldset-border-bottom-left-radius"
  );
  const fieldsetBorderBottomRightRadius = document.getElementById(
    "fieldset-border-bottom-right-radius"
  );

  if (isIndividual(value)) {
    fieldsetCommonRadius.style.display = "none";
    fieldsetBorderTopLeftRadius.style.display = "";
    fieldsetBorderTopRightRadius.style.display = "";
    fieldsetBorderBottomLeftRadius.style.display = "";
    fieldsetBorderBottomRightRadius.style.display = "";
    initBorderTopLeftRadius();
    initBorderTopRightRadius();
    initBorderBottomLeftRadius();
    initBorderBottomRightRadius();
  } else {
    fieldsetCommonRadius.style.display = "";
    fieldsetBorderTopLeftRadius.style.display = "none";
    fieldsetBorderTopRightRadius.style.display = "none";
    fieldsetBorderBottomLeftRadius.style.display = "none";
    fieldsetBorderBottomRightRadius.style.display = "none";
    initCommonBorderRadius();
  }
}

function init() {
  const borderProperty = document.querySelectorAll(
    'input[name="border-property"]'
  );
  const borderRadiusProperty = document.querySelectorAll(
    'input[name="border-radius-property"]'
  );

  for (const item of borderProperty) {
    item.addEventListener("change", (e) => initBorder(e.target.value));

    if (item.checked) initBorder(item.value);
  }

  for (const item of borderRadiusProperty) {
    item.addEventListener("change", (e) => initBorderRadius(e.target.value));

    if (item.checked) initBorderRadius(item.value);
  }
}

init();
