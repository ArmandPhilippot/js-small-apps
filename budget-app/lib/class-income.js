/**
 * Income class
 *
 * Create a new income with id, date, name and amount.
 */
export default class Income {
  #id = 0;
  #date;
  #name;
  #amount;

  constructor(id, date, name, amount) {
    this.#id = id;
    this.#date = date;
    this.#name = name;
    this.#amount = Number.parseFloat(amount).toFixed(2);
  }

  get id() {
    return this.#id;
  }

  set date(datetime) {
    this.#date = datetime;
  }

  get date() {
    return this.#date;
  }

  set name(string) {
    this.#name = string;
  }

  get name() {
    return this.#name;
  }

  set amount(number) {
    this.#amount = number;
  }

  get amount() {
    return this.#amount;
  }

  update(date, name, amount) {
    this.#date = date;
    this.#name = name;
    this.#amount = amount;
  }
}
