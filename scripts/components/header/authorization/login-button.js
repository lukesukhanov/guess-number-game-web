export { LoginButton };

class LoginButton {
  constructor(element) {
    element.addEventListener("click", LoginButton.handleClick);
  }

  static handleClick(event) {
    event.preventDefault();
    const popUpBg = document.querySelector(".pop-up-bg");
    const logInForm = document.querySelector(".login-form");
    popUpBg.classList.add("active");
    logInForm.classList.add("active");
  }
}
