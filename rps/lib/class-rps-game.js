import Game from "./class-game.js";

/**
 * RPSGame class.
 */
class RPSGame extends Game {
  #choices = ["rock", "paper", "scissors"];
  #buttons = { rock: "", paper: "", scissors: "", newGame: "" };
  #p1Scoring = { name: "", value: "" };
  #p2Scoring = { name: "", value: "" };
  #messages = "";

  /**
   * Initialize a new RPSGame instance.
   * @param {Object[]} players - An array of player object.
   * @param {String} players[].username - The player username.
   * @param {Boolean} players[].ia - True to set the player as an IA.
   * @param {Object} buttons - The buttons HTMLElement.
   * @param {HTMLElement} buttons.rock - Button Element for rock choice.
   * @param {HTMLElement} buttons.paper - Button Element for paper choice.
   * @param {HTMLElement} buttons.scissors - Button Element for scissors choice.
   * @param {HTMLElement} buttons.newGame - Button Element to start new game.
   * @param {Object} p1Scoring - The player 1 scoring display.
   * @param {HTMLElement} p1Scoring.name - Element to display player 1 name.
   * @param {HTMLElement} p1Scoring.value - Element to display player 1 score.
   * @param {Object} p2Scoring - The player 2 scoring display.
   * @param {HTMLElement} p2Scoring.name - Element to display player 2 name.
   * @param {HTMLElement} p2Scoring.value - Element to display player 2 score.
   * @param {HTMLElement} messages - Element to display turn/game results.
   */
  constructor(
    players,
    buttons = { rock: "", paper: "", scissors: "", newGame: "" },
    p1Scoring = { name: "", value: "" },
    p2Scoring = { name: "", value: "" },
    messages
  ) {
    super("Rock Paper Scissors", players);
    this.#buttons = buttons;
    this.#p1Scoring = p1Scoring;
    this.#p2Scoring = p2Scoring;
    this.#messages = messages;
  }

  #updatePlayers() {
    this.#p1Scoring.name.textContent = this.getPlayer(1).username;
    this.#p2Scoring.name.textContent = this.getPlayer(2).username;
  }

  #updateScore() {
    this.#p1Scoring.value.textContent = this.getPlayer(1).score;
    this.#p2Scoring.value.textContent = this.getPlayer(2).score;
  }

  #updateMessage(msg) {
    this.#messages.textContent = msg;
  }

  #setTurnIssue() {
    const choices = `${this.getPlayer(1).choice}-${this.getPlayer(2).choice}`;
    let turnWinner;
    let turnLoser;
    let even = false;
    let msg;

    switch (choices) {
      case "rock-paper":
      case "paper-scissors":
      case "scissors-rock":
        turnWinner = this.getPlayer(2);
        turnLoser = this.getPlayer(1);
        break;
      case "paper-rock":
      case "rock-scissors":
      case "scissors-paper":
        turnWinner = this.getPlayer(1);
        turnLoser = this.getPlayer(2);
        break;
      default:
        even = true;
        break;
    }

    if (!even) {
      this.winners = [turnWinner];
      this.losers = [turnLoser];
      turnWinner.score++;
      this.#updateScore();
      msg = `${turnWinner.username} wins! ${turnWinner.choice} beats ${turnLoser.choice}.`;
    } else {
      msg = `No winner. ${this.getPlayer(1).choice} equals to ${
        this.getPlayer(2).choice
      }.`;
    }
    this.#updateMessage(msg);
  }

  #getIAAction() {
    if (this.currentTurn % 2 === 0) {
      this.#setTurnIssue();
      this.turn.next();
      if (!this.isGameOver()) {
        this.getCurrentPlayer().choice = this.getRandomChoice(this.#choices);
      }
    } else {
      this.turn.next();
      this.getCurrentPlayer().choice = this.getRandomChoice(this.#choices);
      this.#setTurnIssue();
    }
    this.turn.next();
  }

  listen() {
    if (this.getCurrentPlayer().ia) {
      this.getCurrentPlayer().choice = this.getRandomChoice(this.#choices);
      this.turn.next();
    }

    for (const [name, element] of Object.entries(this.#buttons)) {
      element.addEventListener("click", (event) => {
        event.preventDefault();
        switch (name) {
          case "rock":
          case "paper":
          case "scissors":
            if (this.state === "running") {
              this.setPlayerChoice(name);
              if (this.getNextPlayer().ia) {
                this.#getIAAction();
              }
            }
            break;
          case "newGame":
            this.launch();
          default:
            break;
        }
      });
    }
  }

  launch() {
    super.launch();
    this.#updatePlayers();
    this.#updateScore();
    this.#updateMessage(`New game, let's play!`);
  }

  init() {
    this.launch();
    this.listen();
  }
}

export default RPSGame;
