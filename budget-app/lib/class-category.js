/**
 * Category class.
 *
 * Create a new category with id, name and attachments.
 */
export default class Category {
  #id = 0;
  #name;
  #attachments = [];

  constructor(id, name) {
    this.#id = id;
    this.#name = name;
  }

  set name(name) {
    this.#name = name;
  }

  get name() {
    return this.#name;
  }

  get id() {
    return this.#id;
  }

  set attachments(attachment) {
    this.#attachments.push(attachment);
  }

  get attachments() {
    return this.#attachments;
  }
}
