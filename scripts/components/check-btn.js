export { CheckBtn };

class CheckBtn {
  constructor(element) {
    element.addEventListener("click", CheckBtn.handleClick);
  }

  static handleClick() {
    if (!window.game.gameOver) {
      window.game.checkGuess();
    }
  }
}
