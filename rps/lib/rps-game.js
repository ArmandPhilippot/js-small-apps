import Player from "./player.js";

export default class RPS_Game {
  #choices = ['rock', 'paper', 'scissors'];
  #player1;
  #player2;

  constructor(player1, player2) {
    this.#player1 = new Player(player1);
    this.#player2 = new Player(player2);
  }

  set player1Choice(choice) {
    this.#player1._choice = choice;
  }

  get player1Choice() {
    return this.#player1._choice;
  }

  set player1Score(score) {
    this.#player1._score = score;
  }

  get player1Score() {
    return this.#player1._score;
  }

  set player2Choice(choice) {
    this.#player2._choice = choice;
  }

  get player2Choice() {
    return this.#player2._choice;
  }

  set player2Score(score) {
    this.#player2._score = score;
  }

  get player2Score() {
    return this.#player2._score;
  }

  randomChoice() {
    const random = Math.round(Math.random() * 2);
    const choice = this.#choices[random];
    return choice;
  }

  setScore(result) {
    switch (result) {
      case 'player1':
        this.player1Score++;
        break;
      case 'player2':
        this.player2Score++;
        break;
      case 'error':
        console.log('Unexpected error!');
      default:
        break;
    }
  }

  calculateScore() {
    const computerChoice = this.randomChoice();
    this.player2Choice = computerChoice;

    let result;

    if (computerChoice === this.player1Choice) {
      result = 'even';
    } else {
      switch (this.player1Choice) {
        case this.#choices[0]:
          if ( computerChoice === 'paper' ) {
            result = 'player2';
          } else {
            result = 'player1';
          }
          break;
        case this.#choices[1]:
          if ( computerChoice === 'rock' ) {
            result = 'player1';
          } else {
            result = 'player2';
          }
          break;
        case this.#choices[2]:
          if ( computerChoice === 'paper' ) {
            result = 'player1';
          } else {
            result = 'player2';
          }
          break;
        default:
          result = 'error';
          break;
      }
    }

    return result;
  }

  reset() {
    this.player1Choice = '';
    this.player2Choice = '';
    this.player1Score = 0;
    this.player2Score = 0;
  }
}
