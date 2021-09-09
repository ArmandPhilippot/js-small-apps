export default class Player {
  #name = 'Anonymous';
  #choice = '';
  #score = 0;

  constructor(name) {
    this.#name = name;
  }

  set choice(choice) {
    this.#choice = choice;
  }

  set score(score) {
    this.#score = score;
  }

  get name() {
    return this.#name;
  }

  get choice() {
    return this.#choice;
  }

  get score() {
    return this.#score;
  }
}
