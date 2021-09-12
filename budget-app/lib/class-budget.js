/**
 * Budget class
 *
 * Create a new budget.
 */
class Budget {
  #initial = 0;
  #spent = 0;
  #profit = 0;

  constructor(initial) {
    this.#initial = Number.parseFloat(initial);
  }

  set initial(number) {
    this.#initial = Number.parseFloat(number);
  }

  get initial() {
    return this.#initial;
  }

  set spent(number) {
    this.#spent = Number.parseFloat(number);
  }

  get spent() {
    return this.#spent;
  }

  set profit(number) {
    this.#profit = Number.parseFloat(number);
  }

  get profit() {
    return this.#profit;
  }

  remaining() {
    return this.initial + this.profit - this.spent;
  }
}

export default Budget;
