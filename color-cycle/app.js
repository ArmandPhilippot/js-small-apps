let isRunning = false;
let intervalId;

function isHexFormat(value) {
  const hexSymbols = "0123456789ABCDEF";
  const hexArray = value.split("");
  if (hexArray.length !== 2) return false;
  if (!hexSymbols.includes(hexArray[0].toUpperCase())) return false;
  if (!hexSymbols.includes(hexArray[1].toUpperCase())) return false;
  return true;
}

function notify(msg) {
  const body = document.querySelector(".body");
  const notification = document.createElement("div");
  notification.classList.add("notification");
  notification.textContent = msg;
  body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

function areColorsReady(red, green, blue) {
  if (!red || !green || !blue) return false;

  if (!isHexFormat(red)) {
    notify("Red is not hexadecimal.");
    return false;
  }

  if (!isHexFormat(green)) {
    notify("Green is not hexadecimal.");
    return false;
  }

  if (!isHexFormat(blue)) {
    notify("Blue is not hexadecimal.");
    return false;
  }

  return true;
}

function updatePreviewColor(color) {
  const preview = document.querySelector(".preview");
  preview.style.backgroundColor = color;
}

function setPreview(ui) {
  const red = ui.colors.red.value;
  const green = ui.colors.green.value;
  const blue = ui.colors.blue.value;

  if (areColorsReady(red, green, blue)) {
    const currentColor = `#${red}${green}${blue}`;
    updatePreviewColor(currentColor);
  }
}

function* getColor(color, increment) {
  let nextColor = color;
  yield nextColor;

  while (true) {
    if (nextColor + increment > 255) {
      nextColor = nextColor - 255 + increment;
    } else {
      nextColor = nextColor + increment;
    }

    yield nextColor;
  }
}

function getNewColor(red, green, blue) {
  return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
}

function start(ui) {
  const red = ui.colors.red.value;
  const green = ui.colors.green.value;
  const blue = ui.colors.blue.value;

  if (areColorsReady(red, green, blue)) {
    isRunning = !isRunning;
    ui.button.textContent = isRunning ? "Stop" : "Start";
  } else {
    notify("Colors are not correctly set.");
  }

  const redGenerator = getColor(parseInt(red, 16), 5);
  const greenGenerator = getColor(parseInt(green, 16), 5);
  const blueGenerator = getColor(parseInt(blue, 16), 5);

  if (isRunning) {
    intervalId = setInterval(() => {
      const nextRed = redGenerator.next().value;
      const nextGreen = greenGenerator.next().value;
      const nextBlue = blueGenerator.next().value;
      const newColor = getNewColor(nextRed, nextGreen, nextBlue);
      updatePreviewColor(newColor);
    }, 250);
  } else {
    clearInterval(intervalId);
  }
}

function listen(ui) {
  ui.form.addEventListener("submit", (e) => {
    e.preventDefault();
  });
  ui.button.addEventListener("click", () => start(ui));
  ui.colors.red.addEventListener("change", () => setPreview(ui));
  ui.colors.green.addEventListener("change", () => setPreview(ui));
  ui.colors.blue.addEventListener("change", () => setPreview(ui));
}

function init() {
  const ui = {
    button: document.querySelector(".btn"),
    form: document.querySelector(".form"),
    colors: {
      red: document.getElementById("color-red"),
      green: document.getElementById("color-green"),
      blue: document.getElementById("color-blue"),
    },
    increments: {
      red: document.getElementById("color-red"),
      green: document.getElementById("color-green"),
      blue: document.getElementById("color-blue"),
    },
  };

  setPreview(ui);
  listen(ui);
}

init();