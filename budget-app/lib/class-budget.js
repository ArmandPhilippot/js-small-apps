/**
 * Budget class
 *
 * Create a new budget by specifying an amount that can be updated.
 */
export default class Budget {
  #amount;

  constructor(amount) {
    this.#amount = amount;
  }

  set amount(number) {
    this.#amount = number;
  }

  get amount() {
    return this.#amount;
  }

  update(amount) {
    this.#amount = this.#amount + amount;
  }
}
