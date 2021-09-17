import RPSGame from "./lib/class-rps-game.js";

const inputP1Name = document.getElementById("player1-name");
const inputP2Name = document.getElementById("player2-name");
const checkboxP1IA = document.getElementById("player1-ia");
const checkboxP2IA = document.getElementById("player2-ia");
const maxRound = document.getElementById("round-number");
const registerBtn = document.querySelector(".form__submit");
const players = [];

function createPreview() {
  const preview = document.querySelector(".preview__content");
  const player1Wrapper = document.createElement("div");
  const player2Wrapper = document.createElement("div");
  const vsWrapper = document.createElement("div");
  player1Wrapper.id = "player1Wrapper";
  player2Wrapper.id = "player2Wrapper";
  vsWrapper.textContent = "vs";
  vsWrapper.style.fontWeight = 600;
  preview.append(player1Wrapper, vsWrapper, player2Wrapper);
}

function getDestId(id) {
  let destID;
  if (id === "player1-name" || id === "player1-ia") {
    destID = "player1Wrapper";
  } else if (id === "player2-name" || id === "player2-ia") {
    destID = "player2Wrapper";
  }
  return destID;
}

function fillPreview(event) {
  const destID = getDestId(event.target.id);
  if (destID) {
    const dest = document.getElementById(destID);
    dest.textContent = event.target.value;
  }
}

function handleIABadge(target) {
  const destID = getDestId(target.id);
  if (destID) {
    const dest = document.getElementById(destID);
    target.checked
      ? dest.classList.add("ia-badge")
      : dest.classList.remove("ia-badge");
  }
}

createPreview();
inputP1Name.addEventListener("change", fillPreview);
inputP2Name.addEventListener("change", fillPreview);
checkboxP1IA.addEventListener("change", (event) => {
  handleIABadge(event.target);
  if (checkboxP2IA.checked && event.target.checked) {
    checkboxP2IA.checked = false;
    handleIABadge(checkboxP2IA);
  }
});
checkboxP2IA.addEventListener("change", (event) => {
  handleIABadge(event.target);
  if (checkboxP1IA.checked && event.target.checked) {
    checkboxP1IA.checked = false;
    handleIABadge(checkboxP1IA);
  }
});

function initApp() {
  const register = document.querySelector(".register");
  const game = document.querySelector(".game");
  const buttons = {
    rock: document.querySelector(".btn--rock"),
    paper: document.querySelector(".btn--paper"),
    scissors: document.querySelector(".btn--scissors"),
    newGame: document.querySelector(".btn--new-game"),
  };
  const p1Scoring = {
    name: document.getElementById("player1username"),
    value: document.getElementById("player1score"),
  };
  const p2Scoring = {
    name: document.getElementById("player2username"),
    value: document.getElementById("player2score"),
  };
  const messages = document.querySelector(".message-board");
  const maxRoundValue = maxRound.value;
  const player1 = { username: inputP1Name.value, ia: checkboxP1IA };
  const player2 = { username: inputP2Name.value, ia: checkboxP2IA };
  players.push(player1);
  players.push(player2);

  const app = new RPSGame(players, buttons, p1Scoring, p2Scoring, messages);
  app.init();
  app.maxRound = maxRoundValue ? maxRoundValue : "";
  app.getPlayer(1).ia = checkboxP1IA.checked ? true : false;
  app.getPlayer(2).ia = checkboxP2IA.checked ? true : false;
  register.style.display = "none";
  game.style.display = "flex";
}

registerBtn.addEventListener("click", (event) => {
  event.preventDefault();
  initApp();
});
