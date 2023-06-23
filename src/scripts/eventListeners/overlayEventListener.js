import popupLoginFormView from "../views/popupLoginFormView.js";
import popupSignupFormView from "../views/popupSignupFormView.js";

const overlayEl = document.querySelector(".overlay");
overlayEl.addEventListener("click", event => {
  event.preventDefault();
  popupLoginFormView.close();
  popupSignupFormView.close();
});
