export { PopUpRegisterButton };

import { AuthorizationService } from "/scripts/services/authorization-service.js";
import {
  POP_UP_FORM_DEFAULT_BORDER_COLOR,
  POP_UP_FORM_ERROR_BORDER_COLOR,
} from "/scripts/properties.js";
class PopUpRegisterButton {
  constructor(element) {
    element.addEventListener("click", PopUpRegisterButton.handleClick);
  }

  static handleClick(event) {
    event.preventDefault();
    const popupBg = document.querySelector(".pop-up-bg");
    const registrationForm = document.querySelector(".registration-form");
    const usernameInput = registrationForm.elements["username"];
    const passwordInput = registrationForm.elements["password"];
    const repeatedPasswordInput =
      registrationForm.elements["repeated-password"];
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    if (
      PopUpRegisterButton.validateInput(
        usernameInput,
        passwordInput,
        repeatedPasswordInput
      )
    ) {
      AuthorizationService.register(username, password);
      popupBg.classList.remove("active");
      registrationForm.classList.remove("active");
    }
  }

  static validateInput(usernameInput, passwordInput, repeatedPasswordInput) {
    let validInput = true;
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    const repeatedPassword = repeatedPasswordInput.value;
    if (username) {
      usernameInput.style.borderColor = POP_UP_FORM_DEFAULT_BORDER_COLOR;
    } else {
      usernameInput.value = null;
      usernameInput.style.borderColor = POP_UP_FORM_ERROR_BORDER_COLOR;
      validInput = false;
    }
    if (password && password === repeatedPassword) {
      passwordInput.style.borderColor = POP_UP_FORM_DEFAULT_BORDER_COLOR;
      repeatedPasswordInput.style.borderColor =
        POP_UP_FORM_DEFAULT_BORDER_COLOR;
    } else {
      passwordInput.style.borderColor = POP_UP_FORM_ERROR_BORDER_COLOR;
      repeatedPasswordInput.style.borderColor = POP_UP_FORM_ERROR_BORDER_COLOR;
      validInput = false;
    }
    passwordInput.value = null;
    repeatedPasswordInput.value = null;
    return validInput;
  }
}
