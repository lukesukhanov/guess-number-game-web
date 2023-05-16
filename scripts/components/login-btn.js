export { LoginBtn };

class LoginBtn {
  constructor(element) {
    element.addEventListener("click", LoginBtn.handleClick);
  }

  static handleClick() {}
}
