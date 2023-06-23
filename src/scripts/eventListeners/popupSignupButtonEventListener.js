import authorizationController from "../controllers/authorizationController.js";
import playerController from "../controllers/playerController.js";
import popupSignupFormView from "../views/popupSignupFormView.js";

const popupSignupButtonEl = document.querySelector(".popup-form--signup button");
const popupSignupFormEl = document.querySelector(".popup-form--signup");

const handlePopupSignupButtonClick = async function (event) {
  event.preventDefault();
  const username = popupSignupFormEl.elements["username"].value.trim();
  const password = popupSignupFormEl.elements["password"].value;
  const repeatedPassword = popupSignupFormEl.elements["repeated-password"].value;
  const errors = validateInput(username, password, repeatedPassword);
  if (errors.size) {
    popupSignupFormView.renderValidation(errors);
    return;
  }
  try {
    await authorizationController.register(username, password);
    await authorizationController.loginWithPassword(username, password);
    await playerController.fetchByUsername(username);
    popupSignupFormView.close();
  } catch (e) {
    alert(e.message);
    await authorizationController.logout();
  }
};

const validateInput = function (username, password, repeatedPassword) {
  let errors = new Set();
  if (!username) {
    errors.add("username");
  }
  if (!password) {
    errors.add("password");
  }
  if (!repeatedPassword || repeatedPassword !== password) {
    errors.add("repeatedPassword");
  }
  return errors;
};

popupSignupButtonEl.addEventListener("click", handlePopupSignupButtonClick);
