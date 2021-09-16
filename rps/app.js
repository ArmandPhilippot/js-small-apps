import RPSGame from "./lib/class-rps-game.js";

const players = ["Armand", "Computer"];
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
const app = new RPSGame(players, buttons, p1Scoring, p2Scoring, messages);
app.init();
