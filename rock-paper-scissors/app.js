import RPSGame from "./lib/class-rps-game.js";

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

function getUserPreviewId(id) {
  let userId;
  if (id === "player1-name" || id === "player1-ia") {
    userId = "player1Wrapper";
  } else if (id === "player2-name" || id === "player2-ia") {
    userId = "player2Wrapper";
  }
  return userId;
}

function fillPreview(target) {
  const userId = getUserPreviewId(target.id);
  if (userId) {
    const dest = document.getElementById(userId);
    dest.textContent = target.value;
  }
}

function toggleIABadge(target) {
  const userId = getUserPreviewId(target.id);
  if (userId) {
    const dest = document.getElementById(userId);
    target.checked
      ? dest.classList.add("ia-badge")
      : dest.classList.remove("ia-badge");
  }
}

function startGame(player1, player2, maxRound) {
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
  const players = [];
  players.push(player1);
  players.push(player2);

  const app = new RPSGame(players, buttons, p1Scoring, p2Scoring, messages);
  app.init();
  app.maxRound = maxRound && maxRound !== "0" ? maxRound : "";
  register.style.display = "none";
  game.style.display = "flex";
}

function listen() {
  const inputP1Name = document.getElementById("player1-name");
  const inputP2Name = document.getElementById("player2-name");
  const checkboxP1IA = document.getElementById("player1-ia");
  const checkboxP2IA = document.getElementById("player2-ia");
  const inputMaxRound = document.getElementById("round-number");
  const registerBtn = document.querySelector(".form__submit");

  if (inputP1Name.value) fillPreview(inputP1Name);
  if (inputP2Name.value) fillPreview(inputP2Name);
  if (checkboxP1IA.checked) toggleIABadge(checkboxP1IA);
  if (checkboxP2IA.checked) toggleIABadge(checkboxP2IA);

  inputP1Name.addEventListener("keyup", (e) => fillPreview(e.target));
  inputP2Name.addEventListener("keyup", (e) => fillPreview(e.target));
  checkboxP1IA.addEventListener("change", (event) => {
    toggleIABadge(event.target);
    if (checkboxP2IA.checked && event.target.checked) {
      checkboxP2IA.checked = false;
      toggleIABadge(checkboxP2IA);
    }
  });
  checkboxP2IA.addEventListener("change", (event) => {
    toggleIABadge(event.target);
    if (checkboxP1IA.checked && event.target.checked) {
      checkboxP1IA.checked = false;
      toggleIABadge(checkboxP1IA);
    }
  });
  registerBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const player1 = { username: inputP1Name.value, ia: checkboxP1IA.checked };
    const player2 = { username: inputP2Name.value, ia: checkboxP2IA.checked };
    const maxRound = inputMaxRound.value;
    startGame(player1, player2, maxRound);
  });
}

function init() {
  createPreview();
  listen();
}

init();
