export default class RegisterButton {
  constructor(element) {
    element.addEventListener("click", RegisterButton.handleClick);
  }

  static handleClick(event) {
    event.preventDefault();
    const popupBgEl = document.querySelector(".pop-up-bg");
    const registrationFormEl = document.querySelector(".registration-form");
    popupBgEl.classList.add("active");
    registrationFormEl.classList.add("active");
  }
}
