import authorizationService from "../services/authorizationService.js";
import playerController from "./playerController.js";

const beforeAuthorizationFrame = document.querySelector(
  ".authorization-frame--before-authorization"
);
const afterAuthorizationFrame = document.querySelector(".authorization-frame--after-authorization");
const authorizationFrameUsername = document.querySelector(".authorization-frame__username");

class AuthorizationController {
  async loginWithSessionCookie() {
    const username = await authorizationService.loginWithSessionCookie();
    if (!username) {
      this.#handleFailedLoginWithSessionCookie();
      return;
    }
    await this.#fetchCsrfToken();
    await playerController.fetchByUsername(username);
    this.#handleSuccessfulLogin(username);
  }

  async loginWithPassword(username, password) {
    await authorizationService.loginWithPassword(username, password);
    await this.#fetchCsrfToken();
    await playerController.fetchByUsername(username);
    this.#handleSuccessfulLogin(username);
  }

  async #fetchCsrfToken() {
    const csrfToken = await authorizationService.getCsrfToken();
    window.localStorage.setItem("csrfToken", csrfToken);
  }

  #handleSuccessfulLogin(username) {
    beforeAuthorizationFrame.classList.remove("active");
    authorizationFrameUsername.textContent = `(${username})`;
    afterAuthorizationFrame.classList.add("active");
  }

  #handleFailedLoginWithSessionCookie() {
    afterAuthorizationFrame.classList.remove("active");
    authorizationFrameUsername.textContent = null;
    beforeAuthorizationFrame.classList.add("active");
  }

  async logout() {
    try {
      const csrfToken = window.localStorage.getItem("csrfToken");
      await authorizationService.logout(csrfToken);
    } catch (e) {
      console.log(e.message);
    } finally {
      this.#handleLogout();
    }
  }

  #handleLogout() {
    window.localStorage.setItem("player", null);
    window.localStorage.setItem("csrfToken", null);
    afterAuthorizationFrame.classList.remove("active");
    authorizationFrameUsername.textContent = null;
    beforeAuthorizationFrame.classList.add("active");
  }

  async register(username, password) {
    await authorizationService.register(username, password);
    await this.loginWithPassword(username, password);
  }
}

const authorizationController = new AuthorizationController();
authorizationController.loginWithSessionCookie();
export default authorizationController;
