/**
 * Retrieve data from an API.
 * @param {String} api - The API url.
 * @returns {Promise} The result from api fetching.
 */
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

/**
 * Create a list item with a link.
 * @param {Object} data - An object containing an id and an username.
 * @returns {HTMLElement} A list item containing a link.
 */
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

/**
 * Print the users list.
 * @param {Object[]} users - An array of user object.
 */
function printUsersList(users) {
  const list = document.querySelector(".users-list");
  users.map((user) => list.appendChild(getListItem(user)));
}

/**
 * Get the markup to display info for a given user.
 * @param {Object} user - An user with fullname, email address, phone & website.
 * @returns {Object} Two HTMLElement: title and body.
 */
function getUserInfoTemplate(user) {
  const fullName = document.createElement("h2");
  const userDetails = document.createElement("dl");
  const emailLabel = document.createElement("dt");
  const email = document.createElement("dd");
  const addressLabel = document.createElement("dt");
  const address = document.createElement("dd");
  const phoneLabel = document.createElement("dt");
  const phone = document.createElement("dd");
  const websiteLabel = document.createElement("dt");
  const website = document.createElement("dd");

  fullName.textContent = user.name;
  emailLabel.textContent = "Email";
  email.textContent = user.email;
  addressLabel.textContent = "Address";
  address.innerHTML = `${user.address.suite}<br />${user.address.street}<br />${user.address.zipcode} ${user.address.city}`;
  phoneLabel.textContent = "Phone";
  phone.textContent = user.phone;
  websiteLabel.textContent = "Website";
  website.textContent = user.website;

  fullName.classList.add("user-info__title");
  emailLabel.classList.add("user-info__label");
  email.classList.add("user-info__content");
  addressLabel.classList.add("user-info__label");
  address.classList.add("user-info__content");
  phoneLabel.classList.add("user-info__label");
  phone.classList.add("user-info__content");
  websiteLabel.classList.add("user-info__label");
  website.classList.add("user-info__content");
  userDetails.classList.add("user-info__body");
  userDetails.append(
    emailLabel,
    email,
    addressLabel,
    address,
    phoneLabel,
    phone,
    websiteLabel,
    website
  );

  return {
    title: fullName,
    body: userDetails,
  };
}

/**
 * Print the info for a given user.
 * @param {Integer} userId - The user id.
 */
async function printUserInfo(userId) {
  const api = `https://jsonplaceholder.typicode.com/users/${userId}`;
  const user = await fetchData(api).then((data) => data);
  const userInfo = document.querySelector(".user-info");
  const userInfoTemplate = getUserInfoTemplate(user);
  userInfo.hasChildNodes()
    ? userInfo.replaceChildren(userInfoTemplate.title, userInfoTemplate.body)
    : userInfo.append(userInfoTemplate.title, userInfoTemplate.body);
}

/**
 * Print the user info on click.
 * @param {MouseEvent} e - The click event.
 * @param {NodeList} links - The users links.
 */
function handleClick(e, links) {
  e.preventDefault();
  const userId = e.target.id.split("user-")[1];
  printUserInfo(userId);

  for (let i = 0; i < links.length; i++) {
    links[i].classList.remove("active");
  }

  e.target.classList.add("active");
}

/**
 * Listen all users links.
 */
function listen() {
  const usersLinks = document.querySelectorAll(".users-list__link");
  for (let i = 0; i < usersLinks.length; i++) {
    const link = usersLinks[i];
    link.addEventListener("click", (e) => handleClick(e, usersLinks));
  }
}

/**
 * Init the app.
 */
async function init() {
  const api = "https://jsonplaceholder.typicode.com/users";
  const users = await fetchData(api).then((data) => data);
  printUsersList(users);
  listen();
}

init();
