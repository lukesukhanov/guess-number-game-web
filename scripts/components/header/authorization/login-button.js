export class LoginButton {
  constructor(element) {
    element.addEventListener("click", LoginButton.handleClick);
  }

  static handleClick(event) {
    event.preventDefault();
    const popupBgEl = document.querySelector(".pop-up-bg");
    const loginFormEl = document.querySelector(".login-form");
    popupBgEl.classList.add("active");
    loginFormEl.classList.add("active");
  }
}
