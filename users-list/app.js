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
 * Create a description term element.
 * @param {String} body - The description term body.
 * @returns {HTMLElement} The description term element.
 */
function createUserInfoDt(body) {
  const dt = document.createElement("dt");
  dt.classList.add("user-info__label");
  dt.textContent = body;
  return dt;
}

/**
 * Create a description details element.
 * @param {String} body - The description details body.
 * @param {Boolean} [hasHTML] - True if body contains HTML; false otherwise.
 * @returns {HTMLElement} The description details element.
 */
function createUserInfoDd(body, hasHTML = false) {
  const dd = document.createElement("dd");
  dd.classList.add("user-info__content");
  hasHTML ? (dd.innerHTML = body) : (dd.textContent = body);
  return dd;
}

/**
 * Get the markup to display info for a given user.
 * @param {Object} user - An user with fullname, email address, phone & website.
 * @returns {Object} Two HTMLElement: title and body.
 */
function getUserInfoTemplate(user) {
  const userAddress = `${user.address.suite}<br />${user.address.street}<br />${user.address.zipcode} ${user.address.city}`;

  const fullName = document.createElement("h2");
  const userDetails = document.createElement("dl");
  const emailLabel = createUserInfoDt("Email");
  const email = createUserInfoDd(user.email);
  const addressLabel = createUserInfoDt("Address");
  const address = createUserInfoDd(userAddress, true);
  const phoneLabel = createUserInfoDt("Phone");
  const phone = createUserInfoDd(user.phone);
  const websiteLabel = createUserInfoDt("Website");
  const website = createUserInfoDd(user.website);

  fullName.textContent = user.name;
  fullName.classList.add("user-info__title");
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
 * Add a class "active" to a link.
 * @param {Integer} linkId - The link id.
 */
function addActiveClassTo(linkId) {
  const link = document.getElementById(linkId);
  link.classList.add("active");
}

/**
 * Print the user info on click.
 * @param {MouseEvent} e - The click event.
 * @param {NodeList} links - The users links.
 */
function handleClick(e, links) {
  e.preventDefault();
  const userId = e.target.id.split("user-")[1];
  const linkId = `user-${userId}`;
  history.pushState({ userId }, e.target.textContent, e.target.href);
  printUserInfo(userId);

  for (let i = 0; i < links.length; i++) {
    links[i].classList.remove("active");
  }

  addActiveClassTo(linkId);
}

/**
 * Listen all users links.
 */
function listenUsersLinks() {
  const usersLinks = document.querySelectorAll(".users-list__link");
  for (let i = 0; i < usersLinks.length; i++) {
    const link = usersLinks[i];
    link.addEventListener("click", (e) => handleClick(e, usersLinks));
  }
}

/**
 * Load user info when URL refers to an user page.
 */
function listenURL() {
  const currentURL = window.location.href;
  const isUserPage = currentURL.includes("user=");
  if (isUserPage) {
    const userId = currentURL.split("?user=")[1];
    const linkId = `user-${userId}`;
    printUserInfo(userId);
    addActiveClassTo(linkId);
  }
}

/**
 * Init the app.
 */
async function init() {
  const api = "https://jsonplaceholder.typicode.com/users";
  const users = await fetchData(api).then((data) => data);
  printUsersList(users);
  listenUsersLinks();
  listenURL();
}

init();
