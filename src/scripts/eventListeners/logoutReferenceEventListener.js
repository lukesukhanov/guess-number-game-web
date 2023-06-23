import authorizationController from "../controllers/authorizationController.js";

const logoutReferenceEl = document.querySelector(".authorization-frame__logout-reference");
logoutReferenceEl.addEventListener("click", event => {
  event.preventDefault();
  authorizationController.logout();
});
