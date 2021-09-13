import Category from "./class-category.js";
import Transaction from "./class-transaction.js";
import User from "./class-user.js";

class BudgetApp {
  #title = "Budget App";
  #categoryId = 1;
  #categories = [];
  #transactionId = 1;
  #incomes = [];
  #expenses = [];
  #userId = 1;
  #user = {};

  constructor(title, username) {
    this.#title = title;
    this.#user = new User(this.#userId++, username);
  }

  set title(string) {
    this.#title = string;
  }

  get title() {
    return this.#title;
  }

  set categories(array) {
    this.#categories = array;
  }

  get categories() {
    return this.#categories;
  }

  set incomes(array) {
    this.#incomes = array;
  }

  get incomes() {
    return this.#incomes;
  }

  set expenses(array) {
    this.#expenses = array;
  }

  get expenses() {
    return this.#expenses;
  }

  set user(username) {
    this.#user = new User(this.#userId++, username);
  }

  get user() {
    return this.#user;
  }

  remove(id, from) {
    const index = from.findIndex((object) => object.id === id);
    from.splice(index, 1);
  }

  addCategory(name) {
    this.#categories.push(new Category(this.#categoryId++, name));
  }

  renameCategory(id, newName) {
    const index = this.categories.findIndex((object) => object.id === id);
    this.categories[index].name = newName;
  }

  addTransaction(transaction) {
    const array =
      transaction.type === "income" ? this.#incomes : this.#expenses;
    array.push(
      new Transaction(
        this.#transactionId++,
        transaction.date,
        transaction.name,
        transaction.type,
        transaction.category,
        transaction.amount
      )
    );
  }

  editTransaction(transaction) {
    const array = transaction.type === "income" ? this.incomes : this.expenses;
    const index = array.findIndex((object) => {
      return object.id === Number(transaction.id);
    });
    if (index !== -1) {
      array[index] = new Transaction(...Object.values(transaction));
    } else {
      const oldArray = array === this.incomes ? this.expenses : this.incomes;
      array.push(new Transaction(...Object.values(transaction)));
      this.remove(transaction.id, oldArray);
    }
  }

  getOrderedTransactions(order) {
    const transactions = [...this.expenses, ...this.incomes];

    switch (order) {
      case "newest":
        transactions.sort((a, b) => b.date - a.date);
        break;
      case "oldest":
        transactions.sort((a, b) => a.date - b.date);
        break;
      default:
        break;
    }

    return transactions;
  }

  total(transaction) {
    const array = transaction === "expense" ? this.#expenses : this.#incomes;
    let total = 0;
    array.forEach((item) => {
      total += item.amount;
    });
    return total;
  }

  updateUserBudget() {
    this.user.budget.spent = this.total("expense");
    this.user.budget.profit = this.total("income");
  }

  reset() {
    this.#categoryId = 1;
    this.#transactionId = 1;
    this.#categories = [];
    this.#incomes = [];
    this.#expenses = [];
    this.updateUserBudget();
  }
}

export default BudgetApp;
