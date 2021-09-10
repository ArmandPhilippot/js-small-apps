import Budget from "./class-budget.js";
import Category from "./class-category.js";
import Income from "./class-income.js";
import Purchase from "./class-purchase.js";

/**
 * Budget App class
 *
 * Create a new budget app with id, title, budget, categories, purchases and
 * earnings.
 */
export default class Budget_App {
  #id = 0;
  #title = "Budget App";
  #budget = 0;
  #categories = [new Category("Undefined")];
  #purchases = [];
  #earnings = [];

  constructor(title, budget) {
    this.#id++;
    this.#title = title;
    this.#budget = new Budget(budget);
  }

  get id() {
    return this.#id;
  }

  set title(string) {
    this.#title = string;
  }

  get title() {
    return this.#title;
  }

  set budget(number) {
    this.#budget = number;
  }

  get budget() {
    return this.#budget;
  }

  set categories(category) {
    this.#categories.push(new Category(category));
  }

  get categories() {
    return this.#categories;
  }

  set purchases(purchase) {
    this.#purchases.push(new Purchase(purchase));
  }

  get purchases() {
    return this.#purchases;
  }

  set earnings(income) {
    this.#earnings.push(new Income(income));
  }

  get earnings() {
    return this.#earnings;
  }

  updateBudget(amount) {
    console.log(this.#budget);
  }

  removeCategory(id) {
    this.#categories.filter((category) => {
      console.log(category);
    });
  }

  renameCategory(oldName, newName) {
    this.#categories.filter((category) => {
      console.log(category);
    });
  }

  editPurchase(id) {
    this.#purchases.filter((purchase) => {
      console.log(purchase);
    });
  }

  removePurchase(id) {
    this.#purchases.filter((purchase) => {
      console.log(purchase);
    });
  }

  editEarning(id) {
    this.#earnings.filter((earning) => {
      console.log(earning);
    });
  }

  removeEarning(id) {
    this.#earnings.filter((earning) => {
      console.log(earning);
    });
  }
}
