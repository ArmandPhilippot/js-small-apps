async function fetchData(api) {
  const headers = new Headers();
  const init = {
    method: "GET",
    headers,
    mode: "cors",
    cache: "default",
  };
  const response = await fetch(api, init);
  const result = await response.json();
  return result;
}

function getListItem(data) {
  const item = document.createElement("li");
  const link = document.createElement("a");
  link.textContent = data.username;
  link.href = `?user=${data.id}`;
  link.id = `user-${data.id}`;
  link.classList.add("users-list__link");
  item.appendChild(link);
  item.classList.add("users-list__item");
  return item;
}

function printUsersList(users) {
  const list = document.querySelector(".users-list");
  users.map((user) => list.appendChild(getListItem(user)));
}

async function init() {
  const api = "https://jsonplaceholder.typicode.com/users";
  const users = await fetchData(api).then((data) => data);
  printUsersList(users);
  listen();
}

init();
