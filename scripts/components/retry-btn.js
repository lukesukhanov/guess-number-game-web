export { RetryBtn };

class RetryBtn {
  constructor(element) {
    element.addEventListener("click", RetryBtn.handleClick);
  }

  static handleClick() {
    window.game.reset();
  }
}
