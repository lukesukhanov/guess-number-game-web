import {
  PLAYERS_API_LOGIN_URL,
  PLAYERS_API_CSRF_TOKEN_URL,
  PLAYERS_API_LOGOUT_URL,
  PLAYERS_API_REGISTRATION_URL,
} from "../properties.js";

class AuthorizationService {
  async loginWithSessionCookie() {
    const response = await fetch(PLAYERS_API_LOGIN_URL, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    if (response.status !== 200) {
      return null;
    }
    const responseBody = await response.json();
    return responseBody.username;
  }

  async loginWithPassword(username, password) {
    const response = await fetch(PLAYERS_API_LOGIN_URL, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        Authorization: "Basic " + btoa(username + ":" + password),
      },
    });
    if (response.status === 401) throw new Error(`Invalid credentials`);
  }

  async getCsrfToken() {
    const response = await fetch(PLAYERS_API_CSRF_TOKEN_URL, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      cache: "no-store",
    });
    return response.headers.get("X-CSRF-TOKEN");
  }

  async logout(csrfToken) {
    await fetch(PLAYERS_API_LOGOUT_URL, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      cache: "no-store",
      headers: { "X-CSRF-TOKEN": csrfToken },
    });
  }

  async register(username, password) {
    const response = await fetch(PLAYERS_API_REGISTRATION_URL, {
      method: "POST",
      mode: "cors",
      credentials: "omit",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        Registration: btoa(username + ":" + password),
      },
    });
    if (response.status !== 201) {
      const responseBody = await response.json();
      if (responseBody.error === "Duplicating username") {
        throw new Error(`The user with username '${username}' already exists`);
      }
      throw new Error(`Registration failed`);
    }
  }
}

export default new AuthorizationService();
