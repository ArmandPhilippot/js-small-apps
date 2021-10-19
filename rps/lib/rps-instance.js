import RPS_Game from "./rps-game.js";

export default class RPS_Instance extends RPS_Game {
  #buttons = {};
  #scoring = { player1: '', player2: '' };
  #resultBox = '';
  #resultMsg = '';

  constructor(player1, player2, buttons, scoring, result) {
    super(player1, player2);
    this.#buttons = buttons;
    this.#scoring = scoring;
    this.#resultBox = result;
    this.#resultMsg = result.innerHTML;
  }

  updateScoring() {
    for (const [name, element] of Object.entries(this.#scoring)) {
      if ( 'player1' === name ) {
        element.innerHTML = this.player1Score;
      }

      if ( 'player2' === name ) {
        element.innerHTML = this.player2Score;
      }
    }
  }

  updateResult(result = '') {
    let txt;
    if ( result === 'player1' ) {
      txt = this.player1Choice + ' beats ' + this.player2Choice + ".<br>You win!"
      this.#resultBox.style.color = 'green';
    } else if ( result === 'player2' ) {
      txt = this.player1Choice + ' loses to ' + this.player2Choice +  ".<br>You lose..."
      this.#resultBox.style.color = 'red';
    } else if ( result === 'even' ) {
      txt = this.player1Choice + ' equals to ' + this.player2Choice +  ".<br>No winner.";
      this.#resultBox.style.color = 'black';
    } else {
      txt = this.#resultMsg;
      this.#resultBox.style.color = '';
    }

    this.#resultBox.innerHTML = txt;
  }

  listen() {
    for (const [name, element] of Object.entries(this.#buttons)) {
      element.addEventListener('click', () => {
        if ( 'reset' === name ) {
          this.reset();
          this.updateResult();
          this.updateScoring();
        } else {
          this.player1Choice = name;
          const result = this.calculateScore();
          this.setScore(result);
          this.updateResult(result);
          this.updateScoring();
        }
      })
    }
  }

  init() {
    this.reset();
    this.listen();
  }
}
