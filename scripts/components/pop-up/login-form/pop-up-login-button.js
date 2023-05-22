export { PopUpLoginButton };

import { AuthorizationService } from "/scripts/services/authorization-service.js";
import {
  POP_UP_FORM_DEFAULT_BORDER_COLOR,
  POP_UP_FORM_ERROR_BORDER_COLOR,
} from "/scripts/properties.js";

class PopUpLoginButton {
  constructor(element) {
    element.addEventListener("click", PopUpLoginButton.handleClick);
  }

  static handleClick(event) {
    event.preventDefault();
    const popupBg = document.querySelector(".pop-up-bg");
    const loginForm = document.querySelector(".login-form");
    const usernameInput = loginForm.elements["username"];
    const passwordInput = loginForm.elements["password"];
    const username = usernameInput.value;
    const password = passwordInput.value;
    if (PopUpLoginButton.validateInput(usernameInput, passwordInput)) {
      AuthorizationService.login(username.trim(), password);
      popupBg.classList.remove("active");
      loginForm.classList.remove("active");
    }
  }

  static validateInput(usernameInput, passwordInput) {
    let validInput = true;
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    if (username) {
      usernameInput.style.borderColor = POP_UP_FORM_DEFAULT_BORDER_COLOR;
    } else {
      usernameInput.value = null;
      usernameInput.style.borderColor = POP_UP_FORM_ERROR_BORDER_COLOR;
      validInput = false;
    }
    if (password) {
      passwordInput.style.borderColor = POP_UP_FORM_DEFAULT_BORDER_COLOR;
    } else {
      passwordInput.style.borderColor = POP_UP_FORM_ERROR_BORDER_COLOR;
      validInput = false;
    }
    passwordInput.value = null;
    return validInput;
  }
}
