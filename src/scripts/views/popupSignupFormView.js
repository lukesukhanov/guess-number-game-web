const popupBgEl = document.querySelector(".overlay");
const popupSignupFormEl = document.querySelector(".popup-form--signup");
const popupUsernameInputEl = popupSignupFormEl.elements["username"];
const popupPasswordInputEl = popupSignupFormEl.elements["password"];
const popupRepeatedPasswordInputEl = popupSignupFormEl.elements["repeated-password"];

class PopupSignupFormView {
  render() {
    popupBgEl.classList.add("active");
    popupSignupFormEl.classList.add("active");
  }

  renderValidation(errors) {
    if (errors.has("username")) {
      popupUsernameInputEl.value = null;
      popupUsernameInputEl.classList.add("incorrect");
    } else {
      popupUsernameInputEl.classList.remove("incorrect");
    }
    if (errors.has("password")) {
      popupPasswordInputEl.classList.add("incorrect");
    } else {
      popupPasswordInputEl.classList.remove("incorrect");
    }
    if (errors.has("repeatedPassword")) {
      popupRepeatedPasswordInputEl.classList.add("incorrect");
    } else {
      popupRepeatedPasswordInputEl.classList.remove("incorrect");
    }
    popupPasswordInputEl.value = null;
    popupRepeatedPasswordInputEl.value = null;
  }

  close() {
    popupBgEl.classList.remove("active");
    popupSignupFormEl.classList.remove("active");
  }
}

export default new PopupSignupFormView();
