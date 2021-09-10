/**
 * Purchase class
 *
 * Create a new purchase with id, date, name, category and amount.
 */
export default class Purchase {
  #id = 0;
  #date;
  #name;
  #category;
  #amount;

  constructor(date, name, category, amount) {
    this.#id++;
    this.#date = date;
    this.#name = name;
    this.#category = category;
    this.#amount = amount;
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

  set category(string) {
    this.#category = string;
  }

  get category() {
    return this.#category;
  }

  set amount(number) {
    this.#amount = number;
  }

  get amount() {
    return this.#amount;
  }

  update(date, name, category, amount) {
    this.#date = date;
    this.#name = name;
    this.#category = category;
    this.#amount = amount;
  }
}
