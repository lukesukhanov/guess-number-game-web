export { AuthorizationService };

import { PlayerService } from "/scripts/services/player-service.js";
import {
  REGISTER_API_URL,
  LOGIN_API_URL,
  ORIGIN_URL,
} from "/scripts/properties.js";

class AuthorizationService {
  static async login(username, password) {
    const response = await fetch(LOGIN_API_URL, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(username + ":" + password),
        Origin: ORIGIN_URL,
      },
      redirect: "manual",
      referrerPolicy: "no-referrer",
    });
    switch (response.status) {
      case 200:
        window.player = await PlayerService.getByUsername(username);
        document.querySelector(".authorization").style.display = "none";
        document.querySelector(
          ".after-authorization__username"
        ).textContent = `(${username})`;
        document.querySelector(".after-authorization").style.display = "flex";
        break;
      case 401:
        alert(`Wrong login or password`);
        break;
    }
  }

  static async register(username, password) {
    const requestBody = {
      username: username,
      password: btoa(password),
    };
    const response = await fetch(REGISTER_API_URL, {
      method: "POST",
      mode: "cors",
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
        AuthorizationService.login(username, password);
        break;
      case 400:
        const responseBody = await response.json();
        if (responseBody.error === "Duplicate") {
          alert(`The user with username '${username}' already exists`);
        }
        break;
    }
  }
}
