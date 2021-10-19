import Budget from "./class-budget.js";

class User {
  #id = 0;
  #username = "Anonymous";
  #firstName = "John";
  #lastName = "Doe";
  #role = "admin";
  #locale = "en-US";
  #accountCreation = new Date();
  #budget = 0;

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

  set firstName(name) {
    this.#firstName = name;
  }

  get firstName() {
    return this.#firstName;
  }

  set lastName(name) {
    this.#lastName = name;
  }

  get lastName() {
    return this.#lastName;
  }

  set role(string) {
    this.#role = string;
  }

  get role() {
    return this.#role;
  }

  set locale(code) {
    this.#locale = code;
  }

  get locale() {
    return this.#locale;
  }

  get accountCreation() {
    return this.#accountCreation;
  }

  set budget(number) {
    this.#budget = new Budget(number);
  }

  get budget() {
    return this.#budget;
  }

  name() {
    return `${this.#firstName} ${this.#lastName}`;
  }
}

export default User;
