let isRunning = false;
let intervalId;

/**
 * Check if the provided value is a valid hexadecimal.
 * @param {String} value - Two hexadecimal symbols.
 * @returns {Boolean} True if value is a valid hexadecimal ; false otherwise.
 */
function isValidHex(value) {
  const hexSymbols = "0123456789ABCDEF";
  const hexArray = value.split("");
  if (hexArray.length !== 2) return false;
  if (!hexSymbols.includes(hexArray[0].toUpperCase())) return false;
  if (!hexSymbols.includes(hexArray[1].toUpperCase())) return false;
  return true;
}

/**
 * Print a message to notify user.
 * @param {String} msg A message to print.
 */
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

/**
 * Check if colors are set and are valid hexadecimal.
 * @param {String} red - Hexadecimal string for red color.
 * @param {String} green - Hexadecimal string for green color.
 * @param {String} blue - Hexadecimal string for blue color.
 * @returns {Boolean} True if colors are ready; false otherwise.
 */
function areColorsReady(red, green, blue) {
  if (!red || !green || !blue) return false;

  if (!isValidHex(red)) {
    notify("Red is not hexadecimal.");
    return false;
  }

  if (!isValidHex(green)) {
    notify("Green is not hexadecimal.");
    return false;
  }

  if (!isValidHex(blue)) {
    notify("Blue is not hexadecimal.");
    return false;
  }

  return true;
}

/**
 * Update the preview color with the provided color.
 * @param {String} color - Hexadecimal string with a leading hash (CSS format).
 */
function updatePreviewColor(color) {
  const preview = document.querySelector(".preview");
  preview.style.backgroundColor = color;
}

/**
 * Initialize the preview with user settings.
 * @param {Object} ui - The different element corresponding to the user interface.
 */
function setPreview(ui) {
  const red = ui.colors.red.value;
  const green = ui.colors.green.value;
  const blue = ui.colors.blue.value;

  if (areColorsReady(red, green, blue)) {
    const currentColor = `#${red}${green}${blue}`;
    updatePreviewColor(currentColor);
  }
}

/**
 * Generate a new color.
 * @param {Integer} color - An integer corresponding to a RGB value.
 * @param {Integer} increment - Add this value to color argument.
 */
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

/**
 * Convert an RGB color to hexadecimal format.
 * @param {Integer} red - An integer representing red color with RGB format.
 * @param {Integer} green - An integer representing green color with RGB format.
 * @param {Integer} blue - A value representing blue color with RGB format.
 * @returns {String} The color in hexadecimal format with a leading hash.
 */
function getNexHexColor(red, green, blue) {
  return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
}

/**
 * Disable or enable inputs.
 * @param {Object} ui - The HTMLElements corresponding to user interface.
 */
function toggleInputs(ui) {
  ui.colors.red.disabled = isRunning;
  ui.colors.green.disabled = isRunning;
  ui.colors.blue.disabled = isRunning;
  ui.increments.red.disabled = isRunning;
  ui.increments.green.disabled = isRunning;
  ui.increments.blue.disabled = isRunning;
  ui.interval.disabled = isRunning;
}

/**
 * Start or stop the preview.
 * @param {Object} ui - The HTMLElements corresponding to user interface.
 */
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

  const redIncrement = Number(ui.increments.red.value);
  const greenIncrement = Number(ui.increments.green.value);
  const blueIncrement = Number(ui.increments.blue.value);
  const redGenerator = getColor(parseInt(red, 16), redIncrement);
  const greenGenerator = getColor(parseInt(green, 16), greenIncrement);
  const blueGenerator = getColor(parseInt(blue, 16), blueIncrement);
  const timing = ui.interval.value;

  if (isRunning) {
    toggleInputs(ui);
    intervalId = setInterval(() => {
      const nextRed = redGenerator.next().value;
      const nextGreen = greenGenerator.next().value;
      const nextBlue = blueGenerator.next().value;
      const newColor = getNexHexColor(nextRed, nextGreen, nextBlue);
      updatePreviewColor(newColor);
    }, timing);
  } else {
    toggleInputs(ui);
    clearInterval(intervalId);
  }
}

/**
 * Listen form, buttons and inputs.
 * @param {Object} ui - The HTMLElements corresponding to user interface.
 */
function listen(ui) {
  ui.form.addEventListener("submit", (e) => {
    e.preventDefault();
  });
  ui.button.addEventListener("click", () => start(ui));
  ui.colors.red.addEventListener("change", () => setPreview(ui));
  ui.colors.green.addEventListener("change", () => setPreview(ui));
  ui.colors.blue.addEventListener("change", () => setPreview(ui));
}

/**
 * Initialize the app.
 */
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
      red: document.getElementById("increment-red"),
      green: document.getElementById("increment-green"),
      blue: document.getElementById("increment-blue"),
    },
    interval: document.getElementById("time-interval"),
  };

  setPreview(ui);
  listen(ui);
}

init();
