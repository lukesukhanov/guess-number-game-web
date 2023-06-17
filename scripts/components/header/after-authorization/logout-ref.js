import { AuthorizationService } from "/scripts/services/authorization-service.js";

export class LogOutRef {
  constructor(element) {
    element.addEventListener("click", LogOutRef.handleClick);
  }

  static handleClick(event) {
    event.preventDefault();
    AuthorizationService.logout();
  }
}
