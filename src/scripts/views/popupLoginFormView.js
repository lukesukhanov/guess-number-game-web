const popupBgEl = document.querySelector(".overlay");
const popupLoginFormEl = document.querySelector(".popup-form--login");
const popupUsernameInputEl = popupLoginFormEl.elements["username"];
const popupPasswordInputEl = popupLoginFormEl.elements["password"];

class PopupLoginFormView {
  render() {
    popupBgEl.classList.add("active");
    popupLoginFormEl.classList.add("active");
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
    popupPasswordInputEl.value = null;
  }

  close() {
    popupBgEl.classList.remove("active");
    popupLoginFormEl.classList.remove("active");
  }
}

export default new PopupLoginFormView();
