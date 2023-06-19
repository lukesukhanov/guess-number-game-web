import { AuthorizationService } from "/scripts/services/authorization-service.js";

export class LogoutRef {
  constructor(element) {
    element.addEventListener("click", LogoutRef.handleClick);
  }

  static handleClick(event) {
    event.preventDefault();
    AuthorizationService.logout();
  }
}
