/**
 * Player class.
 */
class Player {
  #id;
  #username = "Anonymous";
  #choice = "";
  #score = 0;

  /**
   * Initialize a new Player instance.
   * @param {Integer} id - The player id.
   * @param {String} username - The player username.
   */
  constructor(id, username) {
    this.#id = id;
    this.#username = username;
  }

  get id() {
    return this.#id;
  }

  set username(name) {
    this.#username = name;
  }

  get username() {
    return this.#username;
  }

  set choice(choice) {
    this.#choice = choice;
  }

  set score(score) {
    this.#score = score;
  }

  get choice() {
    return this.#choice;
  }

  get score() {
    return this.#score;
  }
}

export default Player;
