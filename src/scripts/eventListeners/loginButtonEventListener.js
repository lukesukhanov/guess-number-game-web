import popupLoginFormView from "../views/popupLoginFormView.js";

const logoutReferenceEl = document.querySelector(".authorization-frame__login-button");
logoutReferenceEl.addEventListener("click", event => {
  event.preventDefault();
  popupLoginFormView.render();
});
