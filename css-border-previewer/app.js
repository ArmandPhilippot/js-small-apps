function getBorderColorProperty(direction) {
  let borderColorProperty;

  switch (direction) {
    case "top":
      borderColorProperty = "borderTopColor";
      break;
    case "right":
      borderColorProperty = "borderRightColor";
      break;
    case "bottom":
      borderColorProperty = "borderBottomColor";
      break;
    case "left":
      borderColorProperty = "borderLeftColor";
      break;
    default:
      borderColorProperty = "borderColor";
      break;
  }

  return borderColorProperty;
}

function getBorderStyleProperty(direction) {
  let borderStyleProperty;

  switch (direction) {
    case "top":
      borderStyleProperty = "borderTopStyle";
      break;
    case "right":
      borderStyleProperty = "borderRightStyle";
      break;
    case "bottom":
      borderStyleProperty = "borderBottomStyle";
      break;
    case "left":
      borderStyleProperty = "borderLeftStyle";
      break;
    default:
      borderStyleProperty = "borderStyle";
      break;
  }

  return borderStyleProperty;
}

function getBorderWidthProperty(direction) {
  let borderWidthProperty;

  switch (direction) {
    case "top":
      borderWidthProperty = "borderTopWidth";
      break;
    case "right":
      borderWidthProperty = "borderRightWidth";
      break;
    case "bottom":
      borderWidthProperty = "borderBottomWidth";
      break;
    case "left":
      borderWidthProperty = "borderLeftWidth";
      break;
    default:
      borderWidthProperty = "borderWidth";
      break;
  }

  return borderWidthProperty;
}

function setBorder(el, property, value, direction = null) {
  let borderProperty;

  switch (property) {
    case "color":
      borderProperty = getBorderColorProperty(direction);
      break;
    case "style":
      borderProperty = getBorderStyleProperty(direction);
      break;
    case "width":
      borderProperty = getBorderWidthProperty(direction);
    default:
      break;
  }

  el.style[borderProperty] = value;
}

function setBorderRadius(el, firstRadius, secondRadius, x = null, y = null) {
  const direction = `${x}-${y}`;
  const value = `${firstRadius}${secondRadius ? ` / ${secondRadius}` : ""}`;
  let borderRadiusProperty;

  switch (direction) {
    case "left-top":
      borderRadiusProperty = "borderTopLeftRadius";
      break;
    case "right-top":
      borderRadiusProperty = "borderTopRightRadius";
      break;
    case "left-bottom":
      borderRadiusProperty = "borderBottomLeftRadius";
      break;
    case "right-bottom":
      borderRadiusProperty = "borderBottomRightRadius";
      break;
    default:
      borderRadiusProperty = "borderRadius";
      break;
  }

  el.style[borderRadiusProperty] = value;
}

function toggleBorderSettingsDisplay(string) {
  const allBordersFieldset = document.getElementById("fieldset-borders");
  const topBorderFieldset = document.getElementById("fieldset-border-top");
  const rightBorderFieldset = document.getElementById("fieldset-border-right");
  const bottomBorderFieldset = document.getElementById(
    "fieldset-border-bottom"
  );
  const leftBorderFieldset = document.getElementById("fieldset-border-left");

  if (string === "common") {
    allBordersFieldset.style.display = "";
    topBorderFieldset.style.display = "none";
    rightBorderFieldset.style.display = "none";
    bottomBorderFieldset.style.display = "none";
    leftBorderFieldset.style.display = "none";
  } else {
    allBordersFieldset.style.display = "none";
    topBorderFieldset.style.display = "";
    rightBorderFieldset.style.display = "";
    bottomBorderFieldset.style.display = "";
    leftBorderFieldset.style.display = "";
  }
}

function toggleBorderRadiusSettingsDisplay(string) {
  const allBordersRadiusFieldset = document.getElementById(
    "fieldset-borders-radius"
  );
  const topLeftBorderRadiusFieldset = document.getElementById(
    "fieldset-border-top-left-radius"
  );
  const topRightBorderRadiusFieldset = document.getElementById(
    "fieldset-border-top-right-radius"
  );
  const bottomLeftBorderRadiusFieldset = document.getElementById(
    "fieldset-border-bottom-left-radius"
  );
  const bottomRightBorderRadiusFieldset = document.getElementById(
    "fieldset-border-bottom-right-radius"
  );

  if (string === "common") {
    allBordersRadiusFieldset.style.display = "";
    topLeftBorderRadiusFieldset.style.display = "none";
    topRightBorderRadiusFieldset.style.display = "none";
    bottomLeftBorderRadiusFieldset.style.display = "none";
    bottomRightBorderRadiusFieldset.style.display = "none";
  } else {
    allBordersRadiusFieldset.style.display = "none";
    topLeftBorderRadiusFieldset.style.display = "";
    topRightBorderRadiusFieldset.style.display = "";
    bottomLeftBorderRadiusFieldset.style.display = "";
    bottomRightBorderRadiusFieldset.style.display = "";
  }
}

function printCode(el) {
  const code = document.querySelector(".result__code");
  let codeOutput = `
.box {\n`;

  for (const property of el.style) {
    codeOutput += `\t${property}: ${el.style[property]};\n`;
  }

  codeOutput += "}";
  code.textContent = codeOutput;
}

function isIndividualSettings(radioValue) {
  return radioValue === "true" ? true : false;
}

function setCommonBorder(el) {
  const allBordersColorInput = document.getElementById("borders-color");
  const allBordersStyleSelect = document.getElementById("borders-style");
  const allBordersUnitSelect = document.getElementById("borders-unit");
  const allBordersWidthInput = document.getElementById("borders-width");

  setBorder(el, "color", allBordersColorInput.value);
  setBorder(el, "style", allBordersStyleSelect.value);
  setBorder(
    el,
    "width",
    `${allBordersWidthInput.value}${allBordersUnitSelect.value}`
  );

  allBordersColorInput.addEventListener("input", () => {
    setBorder(el, "color", allBordersColorInput.value);
    printCode(el);
  });

  allBordersStyleSelect.addEventListener("input", () => {
    setBorder(el, "style", allBordersStyleSelect.value);
    printCode(el);
  });

  allBordersUnitSelect.addEventListener("input", () => {
    setBorder(
      el,
      "width",
      `${allBordersWidthInput.value}${allBordersUnitSelect.value}`
    );
    printCode(el);
  });

  allBordersWidthInput.addEventListener("input", () => {
    setBorder(
      el,
      "width",
      `${allBordersWidthInput.value}${allBordersUnitSelect.value}`
    );
    printCode(el);
  });
}

function setTopBorder(el) {
  const topBorderColorInput = document.getElementById("border-top-color");
  const topBorderStyleSelect = document.getElementById("border-top-style");
  const topBorderUnitSelect = document.getElementById("border-top-unit");
  const topBorderWidthInput = document.getElementById("border-top-width");

  setBorder(el, "color", topBorderColorInput.value, "top");
  setBorder(el, "style", topBorderStyleSelect.value, "top");
  setBorder(
    el,
    "width",
    `${topBorderWidthInput.value}${topBorderUnitSelect.value}`,
    "top"
  );

  topBorderColorInput.addEventListener("input", () => {
    setBorder(el, "color", topBorderColorInput.value, "top");
    printCode(el);
  });

  topBorderStyleSelect.addEventListener("input", () => {
    setBorder(el, "style", topBorderStyleSelect.value, "top");
    printCode(el);
  });

  topBorderUnitSelect.addEventListener("input", () => {
    setBorder(
      el,
      "width",
      `${topBorderWidthInput.value}${topBorderUnitSelect.value}`,
      "top"
    );
    printCode(el);
  });

  topBorderWidthInput.addEventListener("input", () => {
    setBorder(
      el,
      "width",
      `${topBorderWidthInput.value}${topBorderUnitSelect.value}`,
      "top"
    );
    printCode(el);
  });
}

function setRightBorder(el) {
  const rightBorderWidthInput = document.getElementById("border-right-width");
  const rightBorderUnitSelect = document.getElementById("border-right-unit");
  const rightBorderStyleSelect = document.getElementById("border-right-style");
  const rightBorderColorInput = document.getElementById("border-right-color");

  setBorder(el, "color", rightBorderColorInput.value, "right");
  setBorder(el, "style", rightBorderStyleSelect.value, "right");
  setBorder(
    el,
    "width",
    `${rightBorderWidthInput.value}${rightBorderUnitSelect.value}`,
    "right"
  );

  rightBorderColorInput.addEventListener("input", () => {
    setBorder(el, "color", rightBorderColorInput.value, "right");
    printCode(el);
  });

  rightBorderStyleSelect.addEventListener("input", () => {
    setBorder(el, "style", rightBorderStyleSelect.value, "right");
    printCode(el);
  });

  rightBorderUnitSelect.addEventListener("input", () => {
    setBorder(
      el,
      "width",
      `${rightBorderWidthInput.value}${rightBorderUnitSelect.value}`,
      "right"
    );
    printCode(el);
  });

  rightBorderWidthInput.addEventListener("input", () => {
    setBorder(
      el,
      "width",
      `${rightBorderWidthInput.value}${rightBorderUnitSelect.value}`,
      "right"
    );
    printCode(el);
  });
}

function setBottomBorder(el) {
  const bottomBorderWidthInput = document.getElementById("border-bottom-width");
  const bottomBorderUnitSelect = document.getElementById("border-bottom-unit");
  const bottomBorderStyleSelect = document.getElementById(
    "border-bottom-style"
  );
  const bottomBorderColorInput = document.getElementById("border-bottom-color");

  setBorder(el, "color", bottomBorderColorInput.value, "bottom");
  setBorder(el, "style", bottomBorderStyleSelect.value, "bottom");
  setBorder(
    el,
    "width",
    `${bottomBorderWidthInput.value}${bottomBorderUnitSelect.value}`,
    "bottom"
  );

  bottomBorderColorInput.addEventListener("input", () => {
    setBorder(el, "color", bottomBorderColorInput.value, "bottom");
    printCode(el);
  });

  bottomBorderStyleSelect.addEventListener("input", () => {
    setBorder(el, "style", bottomBorderStyleSelect.value, "bottom");
    printCode(el);
  });

  bottomBorderUnitSelect.addEventListener("input", () => {
    setBorder(
      el,
      "width",
      `${bottomBorderWidthInput.value}${bottomBorderUnitSelect.value}`,
      "bottom"
    );
    printCode(el);
  });

  bottomBorderWidthInput.addEventListener("input", () => {
    setBorder(
      el,
      "width",
      `${bottomBorderWidthInput.value}${bottomBorderUnitSelect.value}`,
      "bottom"
    );
    printCode(el);
  });
}

function setLeftBorder(el) {
  const leftBorderWidthInput = document.getElementById("border-left-width");
  const leftBorderUnitSelect = document.getElementById("border-left-unit");
  const leftBorderStyleSelect = document.getElementById("border-left-style");
  const leftBorderColorInput = document.getElementById("border-left-color");

  setBorder(el, "color", leftBorderColorInput.value, "left");
  setBorder(el, "style", leftBorderStyleSelect.value, "left");
  setBorder(
    el,
    "width",
    `${leftBorderWidthInput.value}${leftBorderUnitSelect.value}`,
    "left"
  );

  leftBorderColorInput.addEventListener("input", () => {
    setBorder(el, "color", leftBorderColorInput.value, "left");
    printCode(el);
  });

  leftBorderStyleSelect.addEventListener("input", () => {
    setBorder(el, "style", leftBorderStyleSelect.value, "left");
    printCode(el);
  });

  leftBorderUnitSelect.addEventListener("input", () => {
    setBorder(
      el,
      "width",
      `${leftBorderWidthInput.value}${leftBorderUnitSelect.value}`,
      "left"
    );
    printCode(el);
  });

  leftBorderWidthInput.addEventListener("input", () => {
    setBorder(
      el,
      "width",
      `${leftBorderWidthInput.value}${leftBorderUnitSelect.value}`,
      "left"
    );
    printCode(el);
  });
}

function setCommonBorderRadius(el) {
  const borderCommonFirstRadius = document.getElementById(
    "borders-first-radius"
  );
  const borderCommonFirstRadiusUnit = document.getElementById(
    "borders-first-radius-unit"
  );
  const borderCommonSecondRadius = document.getElementById(
    "borders-second-radius"
  );
  const borderCommonSecondRadiusUnit = document.getElementById(
    "borders-second-radius-unit"
  );
  let firstRadius = `${borderCommonFirstRadius.value}${borderCommonFirstRadiusUnit.value}`;
  let secondRadius = borderCommonSecondRadius.value
    ? `${borderCommonSecondRadius.value}${borderCommonSecondRadiusUnit.value}`
    : null;

  setBorderRadius(el, firstRadius, secondRadius);

  borderCommonFirstRadius.addEventListener("input", () => {
    firstRadius = `${borderCommonFirstRadius.value}${borderCommonFirstRadiusUnit.value}`;
    setBorderRadius(el, firstRadius, secondRadius);
    printCode(el);
  });

  borderCommonFirstRadiusUnit.addEventListener("input", () => {
    firstRadius = `${borderCommonFirstRadius.value}${borderCommonFirstRadiusUnit.value}`;
    setBorderRadius(el, firstRadius, secondRadius);
    printCode(el);
  });

  borderCommonSecondRadius.addEventListener("input", () => {
    secondRadius = borderCommonSecondRadius.value
      ? `${borderCommonSecondRadius.value}${borderCommonSecondRadiusUnit.value}`
      : null;
    setBorderRadius(el, firstRadius, secondRadius);
    printCode(el);
  });

  borderCommonSecondRadiusUnit.addEventListener("input", () => {
    secondRadius = borderCommonSecondRadius.value
      ? `${borderCommonSecondRadius.value}${borderCommonSecondRadiusUnit.value}`
      : null;
    setBorderRadius(el, firstRadius, secondRadius);
    printCode(el);
  });
}

function setTopLeftBorderRadius(el) {
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
  let firstRadius = `${borderTopLeftFirstRadius.value}${borderTopLeftFirstRadiusUnit.value}`;
  let secondRadius = borderTopLeftSecondRadius.value
    ? `${borderTopLeftSecondRadius.value}${borderTopLeftSecondRadiusUnit.value}`
    : null;

  setBorderRadius(el, firstRadius, secondRadius, "left", "top");

  borderTopLeftFirstRadius.addEventListener("input", () => {
    firstRadius = `${borderTopLeftFirstRadius.value}${borderTopLeftFirstRadiusUnit.value}`;
    setBorderRadius(el, firstRadius, secondRadius, "left", "top");
    printCode(el);
  });

  borderTopLeftFirstRadiusUnit.addEventListener("input", () => {
    firstRadius = `${borderTopLeftFirstRadius.value}${borderTopLeftFirstRadiusUnit.value}`;
    setBorderRadius(el, firstRadius, secondRadius, "left", "top");
    printCode(el);
  });

  borderTopLeftSecondRadius.addEventListener("input", () => {
    secondRadius = borderTopLeftSecondRadius.value
      ? `${borderTopLeftSecondRadius.value}${borderTopLeftSecondRadiusUnit.value}`
      : null;
    setBorderRadius(el, firstRadius, secondRadius, "left", "top");
    printCode(el);
  });

  borderTopLeftSecondRadiusUnit.addEventListener("input", () => {
    secondRadius = borderTopLeftSecondRadius.value
      ? `${borderTopLeftSecondRadius.value}${borderTopLeftSecondRadiusUnit.value}`
      : null;
    setBorderRadius(el, firstRadius, secondRadius, "left", "top");
    printCode(el);
  });
}

function setTopRightBorderRadius(el) {
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
  const firstRadius = `${borderTopRightFirstRadius.value}${borderTopRightFirstRadiusUnit.value}`;
  const secondRadius = borderTopRightSecondRadius.value
    ? `${borderTopRightSecondRadius.value}${borderTopRightSecondRadiusUnit.value}`
    : null;

  setBorderRadius(el, firstRadius, secondRadius, "right", "top");

  borderTopRightFirstRadius.addEventListener("input", () => {
    firstRadius = `${borderTopRightFirstRadius.value}${borderTopRightFirstRadiusUnit.value}`;
    setBorderRadius(el, firstRadius, secondRadius, "right", "top");
    printCode(el);
  });

  borderTopRightFirstRadiusUnit.addEventListener("input", () => {
    firstRadius = `${borderTopRightFirstRadius.value}${borderTopRightFirstRadiusUnit.value}`;
    setBorderRadius(el, firstRadius, secondRadius, "right", "top");
    printCode(el);
  });

  borderTopRightSecondRadius.addEventListener("input", () => {
    secondRadius = borderTopRightSecondRadius.value
      ? `${borderTopRightSecondRadius.value}${borderTopRightSecondRadiusUnit.value}`
      : null;
    setBorderRadius(el, firstRadius, secondRadius, "right", "top");
    printCode(el);
  });

  borderTopRightSecondRadiusUnit.addEventListener("input", () => {
    secondRadius = borderTopRightSecondRadius.value
      ? `${borderTopRightSecondRadius.value}${borderTopRightSecondRadiusUnit.value}`
      : null;
    setBorderRadius(el, firstRadius, secondRadius, "right", "top");
    printCode(el);
  });
}

function setBottomLeftBorderRadius(el) {
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
  const firstRadius = `${borderBottomLeftFirstRadius.value}${borderBottomLeftFirstRadiusUnit.value}`;
  const secondRadius = borderBottomLeftSecondRadius.value
    ? `${borderBottomLeftSecondRadius.value}${borderBottomLeftSecondRadiusUnit.value}`
    : null;

  setBorderRadius(el, firstRadius, secondRadius, "left", "bottom");

  borderBottomLeftFirstRadius.addEventListener("input", () => {
    firstRadius = `${borderBottomLeftFirstRadius.value}${borderBottomLeftFirstRadiusUnit.value}`;
    setBorderRadius(el, firstRadius, secondRadius, "left", "bottom");
    printCode(el);
  });

  borderBottomLeftFirstRadiusUnit.addEventListener("input", () => {
    firstRadius = `${borderBottomLeftFirstRadius.value}${borderBottomLeftFirstRadiusUnit.value}`;
    setBorderRadius(el, firstRadius, secondRadius, "left", "bottom");
    printCode(el);
  });

  borderBottomLeftSecondRadius.addEventListener("input", () => {
    secondRadius = borderBottomLeftSecondRadius.value
      ? `${borderBottomLeftSecondRadius.value}${borderBottomLeftSecondRadiusUnit.value}`
      : null;
    setBorderRadius(el, firstRadius, secondRadius, "left", "bottom");
    printCode(el);
  });

  borderBottomLeftSecondRadiusUnit.addEventListener("input", () => {
    secondRadius = borderBottomLeftSecondRadius.value
      ? `${borderBottomLeftSecondRadius.value}${borderBottomLeftSecondRadiusUnit.value}`
      : null;
    setBorderRadius(el, firstRadius, secondRadius, "left", "bottom");
    printCode(el);
  });
}

function setBottomRightBorderRadius(el) {
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
  const firstRadius = `${borderBottomRightFirstRadius.value}${borderBottomRightFirstRadiusUnit.value}`;
  const secondRadius = borderBottomRightSecondRadius.value
    ? `${borderBottomRightSecondRadius.value}${borderBottomRightSecondRadiusUnit.value}`
    : null;

  setBorderRadius(el, firstRadius, secondRadius, "right", "bottom");

  borderBottomRightFirstRadius.addEventListener("input", () => {
    firstRadius = `${borderBottomRightFirstRadius.value}${borderBottomRightFirstRadiusUnit.value}`;
    setBorderRadius(el, firstRadius, secondRadius, "right", "bottom");
    printCode(el);
  });

  borderBottomRightFirstRadiusUnit.addEventListener("input", () => {
    firstRadius = `${borderBottomRightFirstRadius.value}${borderBottomRightFirstRadiusUnit.value}`;
    setBorderRadius(el, firstRadius, secondRadius, "right", "bottom");
    printCode(el);
  });

  borderBottomRightSecondRadius.addEventListener("input", () => {
    secondRadius = borderBottomRightSecondRadius.value
      ? `${borderBottomRightSecondRadius.value}${borderBottomRightSecondRadiusUnit.value}`
      : null;
    setBorderRadius(el, firstRadius, secondRadius, "right", "bottom");
    printCode(el);
  });

  borderBottomRightSecondRadiusUnit.addEventListener("input", () => {
    secondRadius = borderBottomRightSecondRadius.value
      ? `${borderBottomRightSecondRadius.value}${borderBottomRightSecondRadiusUnit.value}`
      : null;
    setBorderRadius(el, firstRadius, secondRadius, "right", "bottom");
    printCode(el);
  });
}

function initBorders(radioValue, el) {
  if (isIndividualSettings(radioValue)) {
    toggleBorderSettingsDisplay("individual");
    setTopBorder(el);
    setRightBorder(el);
    setBottomBorder(el);
    setLeftBorder(el);
  } else {
    toggleBorderSettingsDisplay("common");
    setCommonBorder(el);
  }
}

function initBordersRadius(radioValue, el) {
  if (isIndividualSettings(radioValue)) {
    toggleBorderRadiusSettingsDisplay("individual");
    setTopLeftBorderRadius(el);
    setTopRightBorderRadius(el);
    setBottomLeftBorderRadius(el);
    setBottomRightBorderRadius(el);
  } else {
    toggleBorderRadiusSettingsDisplay("common");
    setCommonBorderRadius(el);
  }
}

function init() {
  const box = document.querySelector(".box");
  const borderPropertyRadio = document.querySelectorAll(
    'input[name="border-property"]'
  );
  const borderRadiusPropertyRadio = document.querySelectorAll(
    'input[name="border-radius-property"]'
  );

  for (const radio of borderPropertyRadio) {
    if (radio.checked) initBorders(radio.value, box);
    radio.addEventListener("change", () => initBorders(radio.value, box));
  }

  for (const radio of borderRadiusPropertyRadio) {
    if (radio.checked) initBordersRadius(radio.value, box);
    radio.addEventListener("change", () => initBordersRadius(radio.value, box));
  }

  printCode(box);
}

init();
