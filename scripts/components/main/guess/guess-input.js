export { GuessInput };

class GuessInput {
  constructor(element) {
    element.addEventListener("keydown", GuessInput.handleKeydown);
  }

  static handleKeydown(event) {
    if (event.key === "Enter" && !window.game.gameOver) {
      window.game.checkGuess();
    }
  }
}
