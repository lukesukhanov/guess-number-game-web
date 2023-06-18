import { AuthorizationService } from "/scripts/services/authorization-service.js";
import {
  POP_UP_FORM_DEFAULT_BORDER_COLOR,
  POP_UP_FORM_ERROR_BORDER_COLOR,
} from "/scripts/properties.js";

export class PopUpLoginButton {
  constructor(element) {
    element.addEventListener("click", PopUpLoginButton.handleClick);
  }

  static handleClick(event) {
    event.preventDefault();
    const popupBgEl = document.querySelector(".pop-up-bg");
    const loginFormEl = document.querySelector(".login-form");
    const usernameInputEl = loginFormEl.elements["username"];
    const passwordInputEl = loginFormEl.elements["password"];
    const username = usernameInputEl.value.trim();
    const password = passwordInputEl.value;
    if (PopUpLoginButton.validateInput(usernameInputEl, passwordInputEl)) {
      AuthorizationService.loginWithPassword(username, password).then();
      popupBgEl.classList.remove("active");
      loginFormEl.classList.remove("active");
    }
  }

  static validateInput(usernameInputEl, passwordInputEl) {
    let validInput = true;
    const username = usernameInputEl.value.trim();
    const password = passwordInputEl.value;
    if (username) {
      usernameInputEl.style.borderColor = POP_UP_FORM_DEFAULT_BORDER_COLOR;
    } else {
      usernameInputEl.value = null;
      usernameInputEl.style.borderColor = POP_UP_FORM_ERROR_BORDER_COLOR;
      validInput = false;
    }
    if (password) {
      passwordInputEl.style.borderColor = POP_UP_FORM_DEFAULT_BORDER_COLOR;
    } else {
      passwordInputEl.style.borderColor = POP_UP_FORM_ERROR_BORDER_COLOR;
      validInput = false;
    }
    passwordInputEl.value = null;
    return validInput;
  }
}
