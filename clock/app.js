function setDate(day, month, year) {
  const div = document.getElementById("date");
  div.textContent = `${day} ${month} ${year}`;
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

function updateAll() {
  const now = new Date();
  const [month, day, year] = [now.getMonth(), now.getDay(), now.getFullYear()];
  const [hours, minutes, seconds] = [
    now.getHours(),
    now.getMinutes(),
    now.getSeconds(),
  ];

  setDate(day, month, year);
  setSvgClockHours(hours);
  setSvgClockMinutes(minutes);
  setSvgClockSeconds(seconds);
}

updateAll();
setInterval(updateAll, 1000);
