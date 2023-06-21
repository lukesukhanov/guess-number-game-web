import AuthorizationService from "/scripts/services/authorizationService.js";
import {
  POP_UP_FORM_DEFAULT_BORDER_COLOR,
  POP_UP_FORM_ERROR_BORDER_COLOR,
} from "/scripts/properties.js";
export default class PopupRegisterButton {
  constructor(element) {
    element.addEventListener("click", PopupRegisterButton.handleClick);
  }

  static handleClick(event) {
    event.preventDefault();
    const popupBgEl = document.querySelector(".pop-up-bg");
    const registrationFormEl = document.querySelector(".registration-form");
    const usernameInputEl = registrationFormEl.elements["username"];
    const passwordInputEl = registrationFormEl.elements["password"];
    const repeatedPasswordInputEl = registrationFormEl.elements["repeated-password"];
    const username = usernameInputEl.value.trim();
    const password = passwordInputEl.value;
    if (
      PopupRegisterButton.validateInput(usernameInputEl, passwordInputEl, repeatedPasswordInputEl)
    ) {
      AuthorizationService.register(username, password);
      popupBgEl.classList.remove("active");
      registrationFormEl.classList.remove("active");
    }
  }

  static validateInput(usernameInputEl, passwordInputEl, repeatedPasswordInputEl) {
    let validInput = true;
    const username = usernameInputEl.value.trim();
    const password = passwordInputEl.value;
    const repeatedPassword = repeatedPasswordInputEl.value;
    if (username) {
      usernameInputEl.style.borderColor = POP_UP_FORM_DEFAULT_BORDER_COLOR;
    } else {
      usernameInputEl.value = null;
      usernameInputEl.style.borderColor = POP_UP_FORM_ERROR_BORDER_COLOR;
      validInput = false;
    }
    if (password && password === repeatedPassword) {
      passwordInputEl.style.borderColor = POP_UP_FORM_DEFAULT_BORDER_COLOR;
      repeatedPasswordInputEl.style.borderColor = POP_UP_FORM_DEFAULT_BORDER_COLOR;
    } else {
      passwordInputEl.style.borderColor = POP_UP_FORM_ERROR_BORDER_COLOR;
      repeatedPasswordInputEl.style.borderColor = POP_UP_FORM_ERROR_BORDER_COLOR;
      validInput = false;
    }
    passwordInputEl.value = null;
    repeatedPasswordInputEl.value = null;
    return validInput;
  }
}
