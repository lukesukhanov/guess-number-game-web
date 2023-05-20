export { PopUpRegisterButton };

import { REGISTER_API_URL, ORIGIN_URL } from "/scripts/properties.js";

class PopUpRegisterButton {
  constructor(element) {
    element.addEventListener("click", PopUpRegisterButton.handleClick);
  }

  static handleClick(event) {
    event.preventDefault();
    const popupBg = document.querySelector(".pop-up-bg");
    const registrationForm = document.querySelector(".registration-form");
    const elements = registrationForm.elements;
    const username = elements["username"].value.trim();
    const password = elements["password"].value;
    PopUpRegisterButton.register(username, password);
    popupBg.classList.remove("active");
    registrationForm.classList.remove("active");
  }

  static async register(username, password) {
    const requestBody = {
      username: username,
      password: password,
    };
    const response = await fetch(REGISTER_API_URL, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "omit",
      headers: {
        "Content-Type": "application/json",
        Origin: ORIGIN_URL,
      },
      redirect: "manual",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(requestBody),
    });
    switch (response.status) {
      case 201:
        document.querySelector(".authorization").style.display = "none";
        document.querySelector(".after-authorization__username").textContent =
          username;
        document.querySelector(".after-authorization").style.display = "flex";
        break;
      case 400:
        const responseBody = await response.json();
        if (responseBody.error === "Duplicate") {
          alert(`The username '${username}' can't be used`);
        }
        break;
    }
  }
}
