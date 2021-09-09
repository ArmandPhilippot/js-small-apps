import RPS_Instance from "./lib/rps-instance.js";

function getButtons() {
  const rock = document.querySelector('.btn--rock');
  const paper = document.querySelector('.btn--paper');
  const scissors = document.querySelector('.btn--scissors');
  const reset = document.querySelector('.btn--reset');
  const buttons = {
    rock,
    paper,
    scissors,
    reset
  };

  return buttons;
}

function getScoring() {
  const player1Box = document.querySelector('.scoring__body--user');
  const player1Score = player1Box.querySelector('.scoring__value');
  const player2Box = document.querySelector('.scoring__body--computer');
  const player2Score = player2Box.querySelector('.scoring__value');
  const scoring = {
    player1: player1Score,
    player2: player2Score,
  }

  return scoring;
}

function getResultMsg() {
  const result = document.querySelector('.scoring__result');
  return result;
}

const myGame = new RPS_Instance('Armand', 'Computer', getButtons(), getScoring(), getResultMsg());
myGame.init();
