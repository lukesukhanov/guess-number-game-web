export class RegisterButton {
  constructor(element) {
    element.addEventListener("click", RegisterButton.handleClick);
  }

  static handleClick(event) {
    event.preventDefault();
    const popUpBgEl = document.querySelector(".pop-up-bg");
    const registrationFormEl = document.querySelector(".registration-form");
    popUpBgEl.classList.add("active");
    registrationFormEl.classList.add("active");
  }
}
