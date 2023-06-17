import { PlayerService } from "/scripts/services/player-service.js";
import {
  LOGIN_API_URL,
  FETCH_CSRF_TOKEN_API_URL,
  LOGOUT_API_URL,
  REGISTER_API_URL,
} from "/scripts/properties.js";

export class AuthorizationService {
  static async loginWithSessionCookie() {
    const response = await AuthorizationService.requestLoginWithSessionCookie();
    await AuthorizationService.handleLoginResponse(response);
  }

  static async requestLoginWithSessionCookie() {
    return await fetch(LOGIN_API_URL, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
  }

  static async loginWithPassword(username, password) {
    const response = await AuthorizationService.requestLoginWithPassword(username, password);
    await AuthorizationService.handleLoginResponse(response);
  }

  static async requestLoginWithPassword(username, password) {
    return await fetch(LOGIN_API_URL, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        Authorization: "Basic " + btoa(username + ":" + password),
      },
    });
  }

  static async handleLoginResponse(response) {
    switch (response.status) {
      case 200:
        const responseBody = await response.json();
        const username = responseBody.username;
        await AuthorizationService.handleSuccessfulLogin(username);
        break;
      case 401:
        alert(`Invalid username or password`);
        break;
    }
  }

  static async handleSuccessfulLogin(username) {
    await AuthorizationService.fetchCsrfToken();
    window.player = await PlayerService.getByUsername(username);
    document.querySelector(".authorization").style.display = "none";
    document.querySelector(".after-authorization__username").textContent = `(${username})`;
    document.querySelector(".after-authorization").style.display = "flex";
  }

  static async fetchCsrfToken() {
    const response = await fetch(FETCH_CSRF_TOKEN_API_URL, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      cache: "no-store",
    });
    const csrfToken = response.headers.get("X-CSRF-TOKEN");
    if (csrfToken) {
      window.localStorage.setItem("csrfToken", csrfToken);
    }
  }

  static async logout() {
    const response = await AuthorizationService.requestLogout();
    AuthorizationService.handleLogoutResponse(response);
  }

  static async requestLogout() {
    const csrfToken = window.localStorage.getItem("csrfToken");
    return await fetch(LOGOUT_API_URL, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      cache: "no-store",
      headers: { "X-CSRF-TOKEN": csrfToken },
    });
  }

  static handleLogoutResponse(response) {
    window.player = null;
    window.localStorage.setItem("csrfToken", null);
    document.querySelector(".after-authorization").style.display = "none";
    document.querySelector(".after-authorization__username").textContent = null;
    document.querySelector(".authorization").style.display = "block";
  }

  static async register(username, password) {
    const response = await AuthorizationService.requestRegister(username, password);
    await AuthorizationService.handleRegisterResponse(response, username, password);
  }

  static async requestRegister(username, password) {
    return await fetch(REGISTER_API_URL, {
      method: "POST",
      mode: "cors",
      credentials: "omit",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        Registration: btoa(username + ":" + password),
      },
    });
  }

  static async handleRegisterResponse(response, username, password) {
    switch (response.status) {
      case 201:
        await AuthorizationService.loginWithPassword(username, password);
        break;
      case 400:
        const responseBody = await response.json();
        if (responseBody.error === "Duplicating username") {
          alert(`The user with username '${username}' already exists`);
        }
        break;
    }
  }
}
