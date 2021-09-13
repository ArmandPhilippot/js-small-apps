import BudgetApp from "./lib/class-budget-app.js";
import Notification from "./lib/class-notification.js";
import getCurrencyFormat from "./lib/utils/currency.js";

const app = new BudgetApp("Budget", "Armand");
const ui = {
  budget: {
    remaining: document.getElementById("budget-remaining"),
    spent: document.getElementById("budget-spent"),
  },
  buttons: {
    categories: {
      add: document.querySelector(".manage-categories .btn--add"),
      delete: document.querySelector(".manage-categories .btn--delete"),
      rename: document.querySelector(".manage-categories .btn--rename"),
    },
    reset: document.querySelector(".footer .btn--reset"),
    transactions: {
      update: document.querySelector(".manage-transactions .btn--update"),
    },
  },
  form: {
    categories: {
      add: document.getElementById("add-category"),
      rename: document.getElementById("rename-category"),
      select: document.getElementById("select-category"),
    },
    transactions: {
      amount: document.getElementById("transaction-amount"),
      category: document.getElementById("transaction-category"),
      date: document.getElementById("transaction-date"),
      id: document.getElementById("transaction-id"),
      name: document.getElementById("transaction-name"),
      type: document.getElementById("transaction-type"),
    },
  },
  history: {
    body: document.querySelector(".app__history .table__body"),
  },
  title: document.querySelector(".branding__title"),
};

function initApp(app) {
  app.user.budget = 3000;
  app.user.locale = "fr-FR";
}

function notify(message, type, duration, position = "bottom") {
  const notification = new Notification(message, type);
  notification.duration = duration;
  notification.position = position;
  return notification.notify();
}

function getSelectOptions(select, options) {
  select.innerHTML = "";
  options.forEach((option) => {
    select.add(new Option(option.name, option.id));
  });

  return select;
}

function findName(id, array) {
  const object = array.find((item) => item.id === Number(id));

  return object.name;
}

function resetTransactionForm() {
  ui.form.transactions.amount.value = "";
  ui.form.transactions.category.value = "";
  ui.form.transactions.date.value = "";
  ui.form.transactions.id.value = "";
  ui.form.transactions.name.value = "";
  ui.form.transactions.type.value = "";
}

function setTransactionForm(transaction) {
  ui.form.transactions.amount.value = transaction.amount;
  ui.form.transactions.category.value = transaction.category;
  ui.form.transactions.date.valueAsDate = transaction.date;
  ui.form.transactions.id.value = transaction.id;
  ui.form.transactions.name.value = transaction.name;
  ui.form.transactions.type.value = transaction.type;
}

function manageHistory(target) {
  const tr = target.parentElement.parentElement;
  const transactionId = Number(tr.id.replace("transaction-", ""));
  const array = tr.classList.contains("table__row--expense")
    ? app.expenses
    : app.incomes;
  if (target.classList.contains("btn--delete")) {
    const tbody = tr.parentElement;
    app.remove(transactionId, array);
    updateBudget();
    updateHistory(tbody);
  } else if (target.classList.contains("btn--edit")) {
    const index = array.findIndex(
      (transaction) => transaction.id === transactionId
    );
    setTransactionForm(array[index]);
  }
}

function getTransactionButton(type) {
  const btn = document.createElement("button");
  let text = "";

  switch (type) {
    case "delete":
      text = "Delete";
      break;
    case "edit":
      text = "Edit";
      break;
    default:
      break;
  }

  btn.textContent = text;
  btn.classList.add("btn", `btn--${type}`);
  btn.addEventListener("click", (event) => manageHistory(event.target));

  return btn;
}

function getTransactionCell(data = "") {
  const td = document.createElement("td");
  td.classList.add("table__item");
  td.textContent = data;

  return td;
}

function getTransactionRow(transaction) {
  const tr = document.createElement("tr");
  const amount =
    transaction.type === "expense"
      ? transaction.amount * -1
      : transaction.amount;
  const localizedAmount = getCurrencyFormat(amount, app.user.locale);
  const categoryName = findName(transaction.category, app.categories);
  const date = transaction.date.toLocaleDateString(app.user.locale);

  const dateCell = getTransactionCell(date);
  const nameCell = getTransactionCell(transaction.name);
  const categoryCell = getTransactionCell(categoryName);
  const typeCell = getTransactionCell(transaction.type);
  const amountCell = getTransactionCell(localizedAmount);
  const manageCell = getTransactionCell();
  const editButton = getTransactionButton("edit");
  const deleteButton = getTransactionButton("delete");

  manageCell.append(editButton, deleteButton);
  tr.classList.add("table__row", `table__row--${transaction.type}`);
  tr.id = `transaction-${transaction.id}`;
  tr.append(dateCell, nameCell, categoryCell, typeCell, amountCell, manageCell);

  return tr;
}

function getHistory(tbody) {
  const transactions = app.getOrderedTransactions("oldest");
  transactions.forEach((transaction) => {
    tbody.appendChild(getTransactionRow(transaction));
  });
}

function updateBudget() {
  app.updateUserBudget();
  ui.budget.remaining.textContent = getCurrencyFormat(
    app.user.budget.remaining(),
    app.user.locale
  );
  ui.budget.spent.textContent = getCurrencyFormat(
    app.user.budget.spent,
    app.user.locale
  );
}

function updateCategories() {
  getSelectOptions(ui.form.categories.select, app.categories);
  getSelectOptions(ui.form.transactions.category, app.categories);
}

function updateHistory() {
  ui.history.body.innerHTML = "";
  getHistory(ui.history.body, app);
}

function updateAll() {
  ui.title.textContent = `${app.user.username} ${app.title}`;
  updateBudget();
  updateCategories();
  updateHistory();
}

function listen() {
  for (const [name, element] of Object.entries(ui.buttons.categories)) {
    element.addEventListener("click", (event) => {
      event.preventDefault();
      const id = Number(ui.form.categories.select.value);

      switch (name) {
        case "add":
          if (ui.form.categories.add.value) {
            app.addCategory(ui.form.categories.add.value);
            ui.form.categories.add.value = "";
          } else {
            notify("Category name must be filled!", "error", 3000);
          }
          break;
        case "delete":
          id
            ? app.remove(id, app.categories)
            : notify("A category must be selected!", "error", 3000);
          break;
        case "rename":
          const newName = ui.form.categories.rename.value;
          if (newName && id) {
            app.renameCategory(id, newName);
            ui.form.categories.rename.value = "";
          } else {
            notify(
              "You need to select a category and enter a new name first!",
              "error",
              3000
            );
          }
          break;
        default:
          break;
      }

      updateCategories();
    });
  }

  ui.buttons.transactions.update.addEventListener("click", (event) => {
    event.preventDefault();
    const transactionId = Number(ui.form.transactions.id.value);
    const transaction = {
      date: ui.form.transactions.date.value,
      name: ui.form.transactions.name.value,
      type: ui.form.transactions.type.value,
      category: ui.form.transactions.category.value,
      amount: ui.form.transactions.amount.value,
    };
    const error = [];
    for (const value in transaction) {
      const element = transaction[value];
      !element ? error.push(value) : "";
    }
    if (error.length === 0) {
      transactionId
        ? app.editTransaction({ id: transactionId, ...transaction })
        : app.addTransaction(transaction);
      updateBudget();
      updateHistory();
      resetTransactionForm();
    } else {
      const errorMsg = `These fields (${error.join(", ")}) must be filled!`;
      notify(errorMsg, "error", 3000);
    }
  });

  ui.buttons.reset.addEventListener("click", (event) => {
    event.preventDefault();
    if (confirm("Are you sure?")) {
      notify("Reset!", "warning", 2000);
      app.reset();
    }
    updateAll();
  });

  window.addEventListener("DOMContentLoaded", () => {
    initApp(app);
    updateAll();
  });
}

listen();
