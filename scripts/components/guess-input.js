import {
  ATTEMPTS_COUNT_SELECTOR,
  GUESS_INPUT_SELECTOR,
  MESSAGE_SELECTOR,
  SECRET_NUMBER_SELECTOR,
  WIN_SECRET_NUMBER_BACKGROUND_COLOR,
} from "/scripts/properties.js";

export { GuessInput };

class GuessInput {
  constructor(element) {
    element.addEventListener("keydown", GuessInput.handleKeydown);
  }

  static handleKeydown(event) {
    if (event.key === "Enter") {
      const game = window.game;
      const guessString = document.querySelector(GUESS_INPUT_SELECTOR).value;

      // Empty guess.
      if (!guessString) {
        return;
      }

      // Non-empty guess.
      const guess = Number(guessString);
      document.querySelector(GUESS_INPUT_SELECTOR).value = null;
      game.attemptsCount++;
      document.querySelector(ATTEMPTS_COUNT_SELECTOR).textContent =
        game.attemptsCount;

      // Correct guess.
      if (guess === game.secretNumber) {
        document.querySelector(SECRET_NUMBER_SELECTOR).textContent =
          game.secretNumber;
        document.querySelector(SECRET_NUMBER_SELECTOR).style.backgroundColor =
          WIN_SECRET_NUMBER_BACKGROUND_COLOR;

        document.querySelector(
          MESSAGE_SELECTOR
        ).textContent = `${guess} is correct!`;

        // Guess is too low.
      } else if (guess < game.secretNumber) {
        document.querySelector(
          MESSAGE_SELECTOR
        ).textContent = `${guess} is too low`;

        // Guess is too high.
      } else {
        document.querySelector(
          MESSAGE_SELECTOR
        ).textContent = `${guess} is too high`;
      }
    }
  }
}
