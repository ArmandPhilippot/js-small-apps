class Notification {
  #id = 0;
  #title = "";
  #message = "";
  #type = "";
  #duration = 0;
  #position = "";

  constructor(message, type) {
    this.#message = message;
    this.#type = type;
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

  set message(text) {
    this.#message = text;
  }

  get message() {
    return this.#message;
  }

  set type(string) {
    this.#type = string;
  }

  get type() {
    return this.#type;
  }

  set duration(number) {
    this.#duration = number;
  }

  get duration() {
    return this.#duration;
  }

  set position(string) {
    this.#position = string;
  }

  get position() {
    return this.#position;
  }

  #getWrapper() {
    let wrapper = document.getElementById("notifications-center");

    if (!wrapper) {
      wrapper = document.createElement("div");
      wrapper.id = "notifications-center";
      wrapper.classList = "notifications";
      document.body.appendChild(wrapper);
    }

    return wrapper;
  }

  notify() {
    const notification = document.createElement("div");
    notification.textContent = this.message;
    notification.classList.add("notification", `notification--${this.type}`);

    const wrapper = this.#getWrapper();
    document.body.style.position = "relative";
    wrapper.style.cssText = `position: fixed;${this.position}: 1rem;right: 1rem;display: flex;flex-flow: column wrap;gap: 1rem;`;
    wrapper.appendChild(notification);

    if (this.duration && Number(this.duration) !== 0) {
      setTimeout(() => {
        notification.remove();
      }, this.duration);
    }
  }
}

export default Notification;
