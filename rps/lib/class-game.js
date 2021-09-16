import Player from "./class-player.js";

/**
 * Game class.
 */
class Game {
  #name = "My Game";
  #language = "en-US";
  #playerId = 0;
  #players = [];
  #winners = [];
  #losers = [];
  #state = "paused";
  #turn;
  #currentTurn = 1;
  #maxTurn = 0;
  #currentRound = 1;
  #maxRound = 0;

  /**
   * Initialize a new Game instance.
   * @param {String} name - The game name.
   * @param {Array} players - The players username.
   */
  constructor(name, players) {
    this.#name = name;
    players.forEach((username) => {
      this.#players.push(new Player(++this.#playerId, username));
    });
  }

  set name(string) {
    this.#name = string;
  }

  get name() {
    return this.#name;
  }

  set language(languageCode) {
    this.#language = languageCode;
  }

  get language() {
    return this.#language;
  }

  set players(array) {
    array.forEach((username) =>
      this.#players.push(new Player(++this.#playerId, username))
    );
  }

  get players() {
    return this.#players;
  }

  set winners(array) {
    array.forEach((player) => this.#winners.push(player));
  }

  get winners() {
    return this.#winners;
  }

  set losers(array) {
    array.forEach((player) => this.#losers.push(player));
  }

  get losers() {
    return this.#losers;
  }

  set state(string) {
    this.#state = string;
  }

  get state() {
    return this.#state;
  }

  set turn(generator) {
    this.#turn = generator;
  }

  get turn() {
    return this.#turn;
  }

  set currentTurn(int) {
    this.#currentTurn = int;
  }

  get currentTurn() {
    return this.#currentTurn;
  }

  set maxTurn(int = this.getPlayersNumber()) {
    this.#maxTurn = int;
  }

  get maxTurn() {
    return this.#maxTurn;
  }

  set currentRound(int) {
    this.#currentRound = int;
  }

  get currentRound() {
    return this.#currentRound;
  }

  set maxRound(int) {
    this.#maxRound = int;
  }

  get maxRound() {
    return this.#maxRound;
  }

  newPlayer(username) {
    this.players.push(new Player(++this.#playerId, username));
  }

  getPlayersNumber() {
    return this.players.length;
  }

  getPlayer(number) {
    return this.players[number - 1];
  }

  getCurrentPlayer() {
    return this.getPlayer(this.currentTurn);
  }

  getNextPlayer() {
    return this.getPlayer(this.currentTurn + 1);
  }

  isNewRound() {
    return this.currentRound > 1 && this.currentTurn === 1;
  }

  isGameOver() {
    return this.state === "ended";
  }

  resetScore() {
    this.players.forEach((player) => {
      player.score = 0;
    });
  }

  newGame() {
    this.winners = [];
    this.losers = [];
    this.state = "paused";
    this.turn = this.#generateTurns();
    this.currentTurn = 1;
    this.currentRound = 1;
    this.maxTurn = this.getPlayersNumber();
    this.resetScore();
  }

  setPlayerChoice(choice) {
    if (this.state === "running") {
      this.getCurrentPlayer().choice = choice;
    }
  }

  *#generateTurns() {
    this.currentRound = 1;
    while (this.maxRound ? this.currentRound <= this.maxRound : true) {
      this.currentTurn = 1;
      while (this.currentTurn <= this.maxTurn) {
        yield this.currentTurn;
        this.currentTurn++;
      }
      this.currentRound++;
    }
    this.stop();
    this.winners = this.getGameWinners();
    this.losers = this.getGameLosers();
    return;
  }

  getOrderedScores() {
    let scores = [];
    this.players.forEach((player) => {
      scores.push(player.score);
    });
    scores.sort((a, b) => a - b);

    return scores;
  }

  getGameWinners() {
    const scores = this.getOrderedScores();
    const highestScore = scores.pop();
    const winners = this.players.filter(
      (player) => player.score === highestScore
    );

    return winners;
  }

  getGameLosers() {
    const scores = this.getOrderedScores();
    const lowestScore = scores.shift();
    const losers = this.players.filter(
      (player) => player.score === lowestScore
    );

    return losers;
  }

  resume() {
    this.state = "running";
  }

  pause() {
    this.state = "paused";
  }

  stop() {
    this.state = "ended";
  }

  launch() {
    this.newGame();
    this.resume();
    this.turn.next();
  }
}

export default Game;
