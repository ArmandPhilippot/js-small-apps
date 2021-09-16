/**
 * Player class.
 */
class Player {
  #id;
  #username = "Anonymous";
  #choice = "";
  #score = 0;
  #ia = false;

  /**
   * Initialize a new Player instance.
   * @param {Integer} id - The player id.
   * @param {String} username - The player username.
   * @param {Boolean} ia - True to set player as an IA.
   */
  constructor(id, username, ia) {
    this.#id = id;
    this.#username = username;
    this.#ia = ia;
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

  set ia(boolean) {
    this.#ia = boolean;
  }

  get ia() {
    return this.#ia;
  }
}

export default Player;
