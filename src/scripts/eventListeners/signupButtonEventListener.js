import popupSignupFormView from "../views/popupSignupFormView.js";

const logoutReferenceEl = document.querySelector(".authorization-frame__signup-button");
logoutReferenceEl.addEventListener("click", event => {
  event.preventDefault();
  popupSignupFormView.render();
});
