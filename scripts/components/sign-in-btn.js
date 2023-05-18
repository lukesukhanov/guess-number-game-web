export { SignInBtn };

import {
  LOGIN_API_URL,
  ORIGIN_URL,
  SIGN_IN_FORM_SELECTOR,
  SIGN_IN_SECTION_SELECTOR,
  LOGIN_FORM_DEFAULT_BORDER_COLOR,
  LOGIN_FORM_ERROR_BORDER_COLOR,
} from "/scripts/properties.js";

class SignInBtn {
  constructor(element) {
    element.addEventListener("click", SignInBtn.handleClick);
  }

  static handleClick(event) {
    event.preventDefault();
    const inputs = document.querySelector(SIGN_IN_FORM_SELECTOR).elements;
    const usernameElement = inputs["username"];
    const passwordElement = inputs["password"];
    if (SignInBtn.validateInput(usernameElement, passwordElement)) {
      SignInBtn.login(usernameElement.value.trim(), passwordElement.value);
    }
  }

  static validateInput(usernameElement, passwordElement) {
    let validInput = true;
    const username = usernameElement.value.trim();
    const password = passwordElement.value;
    if (username) {
      usernameElement.style.borderColor = LOGIN_FORM_DEFAULT_BORDER_COLOR;
    } else {
      usernameElement.value = null;
      usernameElement.style.borderColor = LOGIN_FORM_ERROR_BORDER_COLOR;
      validInput = false;
    }
    if (password) {
      passwordElement.style.borderColor = LOGIN_FORM_DEFAULT_BORDER_COLOR;
    } else {
      passwordElement.value = null;
      passwordElement.style.borderColor = LOGIN_FORM_ERROR_BORDER_COLOR;
      validInput = false;
    }
    return validInput;
  }

  static async login(username, password) {
    const response = await fetch(LOGIN_API_URL, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(username + ":" + password),
        Origin: ORIGIN_URL,
      },
      redirect: "manual",
      referrerPolicy: "no-referrer",
    });
    if (response.status === 200) {
      document.querySelector(SIGN_IN_SECTION_SELECTOR).style.display = "none";
    } else {
    }
  }
}
