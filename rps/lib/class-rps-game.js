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
  #messageIterator;
  #timeoutId;

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

  get messages() {
    return this.#messages;
  }

  set messageIterator(generator) {
    this.#messageIterator = generator;
  }

  get messageIterator() {
    return this.#messageIterator;
  }

  #updatePlayers() {
    this.#p1Scoring.name.textContent = this.getPlayer(1).username;
    this.#p2Scoring.name.textContent = this.getPlayer(2).username;
  }

  #updateScore() {
    this.#p1Scoring.value.textContent = this.getPlayer(1).score;
    this.#p2Scoring.value.textContent = this.getPlayer(2).score;
  }

  async #createMessage(msg, delay = 0) {
    return new Promise(
      (resolve) =>
        (this.#timeoutId = setTimeout(() => {
          resolve(msg);
        }, delay))
    );
  }

  async *#generateMessages() {
    let msg;
    msg = yield await this.#createMessage("New game, let's play!");

    while (this.state === "running") {
      for (let index = 0; index < this.getPlayersNumber(); index++) {
        if (this.getCurrentPlayer().ia) {
          msg = yield this.#createMessage(
            `${this.getCurrentPlayer().username} is playing...`,
            this.isFirstTurn() ? 1200 : 200
          );
        } else {
          msg = yield this.#createMessage(
            `${this.getCurrentPlayer().username}'s turn...`,
            this.isFirstTurn() ? 1200 : 900
          );
        }
      }
      msg = yield this.#createMessage(
        msg,
        this.getCurrentPlayer().ia ? 1000 : 500
      );
      if (!this.isGameOver()) {
        msg = yield this.#createMessage("New round...", 1500);
      }
    }
    const winnersList = this.gameWinners.map((winner) => winner.username);
    const losersList = this.gameLosers.map((loser) => loser.username);
    msg = yield this.#createMessage(
      `Winner: ${winnersList.join(", ")} / Loser: ${losersList.join(", ")}`
    );
  }

  async printNextMessage(msg = null) {
    if (!this.messageIterator) {
      this.messageIterator = this.#generateMessages();
    }
    this.messages.textContent = await this.messageIterator
      .next(msg)
      .then((object) => object.value);
  }

  async #setTurnIssue() {
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
      this.turnWinners = [turnWinner];
      this.turnLosers = [turnLoser];
      turnWinner.score++;
      msg = `${turnWinner.username} wins! ${turnWinner.choice} beats ${turnLoser.choice}.`;
    } else {
      msg = `No winner. ${this.getPlayer(1).choice} equals to ${
        this.getPlayer(2).choice
      }.`;
    }
    await this.printNextMessage(msg);
    this.#updateScore();
    await this.printNextMessage();
  }

  async #getIAAction() {
    if (this.currentTurn % 2 === 0) {
      await this.#setTurnIssue();
      this.turn.next();
      await this.printNextMessage();
      if (!this.isGameOver()) {
        this.getCurrentPlayer().choice = this.getRandomChoice(this.#choices);
      }
    } else {
      this.turn.next();
      await this.printNextMessage();
      this.getCurrentPlayer().choice = this.getRandomChoice(this.#choices);
      await this.#setTurnIssue();
    }
    this.turn.next();
    await this.printNextMessage();
  }

  async listen() {
    for (const [name, element] of Object.entries(this.#buttons)) {
      element.addEventListener("click", async (event) => {
        event.preventDefault();
        switch (name) {
          case "rock":
          case "paper":
          case "scissors":
            if (this.state === "running") {
              this.setPlayerChoice(name);
              if (this.currentTurn % 2 === 0) {
                await this.#setTurnIssue();
              }
              if (this.getNextPlayer().ia) {
                await this.#getIAAction();
              } else {
                this.turn.next();
                await this.printNextMessage();
              }
            }
            break;
          case "newGame":
            this.messageIterator = null;
            clearTimeout(this.#timeoutId);
            await this.launch();
          default:
            break;
        }
      });
    }
  }

  async launch() {
    super.launch();
    this.#updatePlayers();
    this.#updateScore();
    await this.printNextMessage();
    await this.printNextMessage();

    if (this.getCurrentPlayer().ia) {
      this.getCurrentPlayer().choice = this.getRandomChoice(this.#choices);
      this.turn.next();
      await this.printNextMessage();
    }
  }

  async init() {
    await this.launch();
    this.listen();
  }
}

export default RPSGame;
