/**
 * Category class.
 *
 * Create a new category with id, name and attachments.
 */
class Category {
  #id = 0;
  #name = "";
  #attachments = [];

  constructor(id, name) {
    this.#id = Number(id);
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
    this.#attachments.push(Number(attachment));
  }

  get attachments() {
    return this.#attachments;
  }
}

export default Category;
