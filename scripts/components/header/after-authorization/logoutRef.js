import AuthorizationService from "/scripts/services/authorizationService.js";

export default class LogoutRef {
  constructor(element) {
    element.addEventListener("click", LogoutRef.handleClick);
  }

  static handleClick(event) {
    event.preventDefault();
    AuthorizationService.logout();
  }
}
