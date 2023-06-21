export default class PopupBg {
  constructor(element) {
    element.addEventListener("click", PopupBg.handleClick);
  }

  static handleClick(event) {
    event.preventDefault();
    const popupForms = document.querySelectorAll(".pop-up-form");
    popupForms.forEach(form => form.classList.remove("active"));
    event.target.classList.remove("active");
  }
}
