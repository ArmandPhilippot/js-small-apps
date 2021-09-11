/**
 * Convert a number to fr_FR locale.
 * @param {Number} number A number to format.
 * @returns A number formatted with fr_FR locale.
 */
const getCurrencyFR = (number) => {
  const formatted =
    Number.parseFloat(number)
      .toFixed(2)
      .replace(".", ",")
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ") + " €";
  return formatted;
};

/**
 * Convert a number to en_US locale.
 * @param {Number} number A number to format.
 * @returns A number formatted with en_US locale.
 */
const getCurrencyUS = (number) => {
  const formatted =
    "$" +
    Number.parseFloat(number)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  return formatted;
};

/**
 * Get a number formatted based on a locale.
 * @param {Number} number A number to format.
 * @param {String} format A language code.
 * @returns A formatted number.
 */
const getCurrencyFormat = (number, format) => {
  switch (format) {
    case "fr-FR":
      return getCurrencyFR(number);
    case "en-US":
      return getCurrencyUS(number);
    default:
      console.log("Not supported!");
      break;
  }
};

export default getCurrencyFormat;
