export { CheckBtn };

class CheckBtn {
  constructor(element) {
    element.addEventListener("click", CheckBtn.handleClick);
  }

  static handleClick() {
    window.game.checkGuess();
  }
}
