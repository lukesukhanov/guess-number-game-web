export { AuthorizationService };

import { PlayerService } from "/scripts/services/player-service.js";
import {
  REGISTER_API_URL,
  LOGIN_API_URL,
  LOGOUT_API_URL,
} from "/scripts/properties.js";

class AuthorizationService {
  static async login(username, password) {
    const headers = {
      "Content-Type": "application/json",
    };
    if (username && password) {
      headers.Authorization = "Basic " + btoa(username + ":" + password);
    }
    const response = await fetch(LOGIN_API_URL, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      cache: "no-store",
      headers: headers,
    });
    switch (response.status) {
      case 200:
        const responseBody = await response.json();
        const fetchedUsername = responseBody.username;
        if (fetchedUsername === "anonymousUser") {
          return;
        }
        window.player = await PlayerService.getByUsername(fetchedUsername);
        document.querySelector(".authorization").style.display = "none";
        document.querySelector(
          ".after-authorization__username"
        ).textContent = `(${fetchedUsername})`;
        document.querySelector(".after-authorization").style.display = "flex";
        break;
      case 401:
        if (username) {
          alert(`Wrong login or password`);
        }
        break;
    }
  }

  static async logout() {
    const response = await fetch(LOGOUT_API_URL, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });
    switch (response.status) {
      case 200:
        document.querySelector(".after-authorization").style.display = "none";
        document.querySelector(".after-authorization__username").textContent =
          null;
        document.querySelector(".authorization").style.display = "block";
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
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
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
