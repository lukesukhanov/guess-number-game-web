export class LoginButton {
  constructor(element) {
    element.addEventListener("click", LoginButton.handleClick);
  }

  static handleClick(event) {
    event.preventDefault();
    const popUpBgEl = document.querySelector(".pop-up-bg");
    const logInFormEl = document.querySelector(".login-form");
    popUpBgEl.classList.add("active");
    logInFormEl.classList.add("active");
  }
}
