/**
 * Transaction class
 *
 * Create a new transaction with id, date, name, type, category and amount.
 */
class Transaction {
  #id = 0;
  #date = new Date();
  #name = "";
  #type = "";
  #category = 0;
  #amount = 0;

  constructor(id, date, name, type, category, amount) {
    this.#id = Number(id);
    this.#date = new Date(date);
    this.#name = name;
    this.#type = type;
    this.#category = Number(category);
    this.#amount = Number.parseFloat(amount);
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

  set type(string) {
    this.#type = string;
  }

  get type() {
    return this.#type;
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

  update(date, name, type, category, amount) {
    this.date = date;
    this.name = name;
    this.type = type;
    this.category = category;
    this.amount = amount;
  }
}

export default Transaction;
