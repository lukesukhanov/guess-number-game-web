import authorizationController from "../controllers/authorizationController.js";
import playerController from "../controllers/playerController.js";
import popupLoginFormView from "../views/popupLoginFormView.js";

const popupLoginButtonEl = document.querySelector(".popup-form--login button");
const popupLoginFormEl = document.querySelector(".popup-form--login");

const handlePopupLoginButtonClick = async function (event) {
  event.preventDefault();
  const username = popupLoginFormEl.elements["username"].value.trim();
  const password = popupLoginFormEl.elements["password"].value;
  const errors = validateInput(username, password);
  if (errors.size) {
    popupLoginFormView.renderValidation(errors);
    return;
  }
  try {
    await authorizationController.loginWithPassword(username, password);
    await playerController.fetchByUsername(username);
    popupLoginFormView.close();
  } catch (e) {
    alert(e.message);
    await authorizationController.logout();
  }
};

const validateInput = function (username, password) {
  let errors = new Set();
  if (!username) {
    errors.add("username");
  }
  if (!password) {
    errors.add("password");
  }
  return errors;
};

popupLoginButtonEl.addEventListener("click", handlePopupLoginButtonClick);
