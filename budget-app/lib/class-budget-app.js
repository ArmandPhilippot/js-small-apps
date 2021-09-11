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
  #title = "Budget App";
  #budget = 0;
  #catID = 1;
  #categories = [new Category(this.#catID, "Undefined")];
  #purchaseID = 0;
  #purchases = [];
  #earningID = 0;
  #earnings = [];

  constructor(title, budget) {
    this.#title = title;
    this.#budget = new Budget(budget);
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

  set categories(array) {
    this.#categories = array;
  }

  get categories() {
    return this.#categories;
  }

  set purchases(purchase) {
    this.#purchaseID++;
    this.#purchases.push(
      new Purchase(
        this.#purchaseID,
        new Date(purchase.date),
        purchase.name,
        purchase.category,
        purchase.amount
      )
    );
  }

  get purchases() {
    return this.#purchases;
  }

  set earnings(income) {
    this.#earningID++;
    this.#earnings.push(
      new Income(
        this.#earningID,
        new Date(income.date),
        income.name,
        income.amount
      )
    );
  }

  get earnings() {
    return this.#earnings;
  }

  addCategory(name) {
    this.#catID++;
    this.#categories.push(new Category(this.#catID, name));
  }

  removeCategory(id) {
    const index = this.#categories.findIndex((object) => object.id === id);
    this.#categories.splice(index, 1);
  }

  renameCategory(id, newName) {
    const index = this.#categories.findIndex((object) => object.id === id);
    this.#categories[index].name = newName;
  }

  editPurchase(id) {
    this.#purchases.filter((purchase) => {
      console.log(purchase);
    });
  }

  removePurchase(id) {
    const index = this.#purchases.findIndex((object) => object.id === id);
    this.#purchases.splice(index, 1);
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

  getTotalEarnings() {
    let total = 0;
    this.#earnings.forEach((earning) => {
      total += earning.amount;
    });
    return total;
  }

  getTotalExpenses() {
    let total = 0;
    this.#purchases.forEach((purchase) => {
      total += purchase.amount;
    });
    return total;
  }

  getRemaining() {
    const incomes = this.getTotalEarnings();
    const spending = this.getTotalExpenses();
    const initial = this.#budget.amount;
    const remaining = initial + incomes - spending;
    return Number.parseFloat(remaining).toFixed(2);
  }
}
