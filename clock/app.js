function setDate(day, month, year) {
  const div = document.getElementById("date");
  div.textContent = `${day}/${month}/${year}`;
}

function get12Rotation(int) {
  const hour = int > 12 ? int - 12 : int;
  return (360 / 12) * hour;
}

function get60Rotation(int) {
  return (360 / 60) * int;
}

function setSvgClockHours(hours) {
  const clockHours = document.getElementById("svg-clock_hours");
  clockHours.style.transform = `rotate(${get12Rotation(hours)}deg)`;
  clockHours.style.transformOrigin = "center";
}

function setSvgClockMinutes(minutes) {
  const clockMinutes = document.getElementById("svg-clock_minutes");
  clockMinutes.style.transform = `rotate(${get60Rotation(minutes)}deg)`;
  clockMinutes.style.transformOrigin = "center";
}

function setSvgClockSeconds(seconds) {
  const clockSeconds = document.getElementById("svg-clock_seconds");
  clockSeconds.style.transform = `rotate(${get60Rotation(seconds)}deg)`;
  clockSeconds.style.transformOrigin = "center";
}

function setDigitalClockHours(hours) {
  const clockHours = document.getElementById("digital-clock_hours");
  clockHours.textContent = hours;
}

function setDigitalClockMinutes(minutes) {
  const formatted = minutes < 10 ? `0` + minutes : minutes;
  const clockMinutes = document.getElementById("digital-clock_minutes");
  clockMinutes.textContent = formatted;
}

function getHoursToString(hours) {
  const hoursToText = [
    "noon",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
  ];

  return hoursToText[hours % 12];
}

function getMinutesToString(minutes) {
  const ones = [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  const teens = [
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  const tens = ["", "", "twenty", "thirty", "forty", "fifty"];
  const minutesToArray = minutes.toString().split("");
  let text = "";

  if (minutes < 10) {
    text = ones[minutes];
  } else if (minutes < 20) {
    text = teens[minutesToArray[1]];
  } else {
    text = `${tens[minutesToArray[0]]} ${ones[minutesToArray[1]]}`;
  }

  return text;
}

function setTextClock(hours, minutes) {
  const div = document.getElementById("text-clock");
  const meridiem = hours < 12 ? "am" : "pm";
  div.textContent = `It's ${getHoursToString(hours)} ${getMinutesToString(
    minutes
  )} ${meridiem}.`;
}

function updateAll() {
  const now = new Date();
  const [month, day, year] = [
    now.getMonth() + 1,
    now.getDate(),
    now.getFullYear(),
  ];
  const [hours, minutes, seconds] = [
    now.getHours(),
    now.getMinutes(),
    now.getSeconds(),
  ];

  setDate(day, month, year);
  setSvgClockHours(hours);
  setSvgClockMinutes(minutes);
  setSvgClockSeconds(seconds);
  setDigitalClockHours(hours);
  setDigitalClockMinutes(minutes);
  setTextClock(hours, minutes);
}

updateAll();
setInterval(updateAll, 1000);
