export class CheckButton {
  constructor(element) {
    element.addEventListener("click", CheckButton.handleClick);
  }

  static handleClick(event) {
    event.preventDefault();
    if (!window.game.gameOver) {
      window.game.checkGuess();
    }
  }
}
