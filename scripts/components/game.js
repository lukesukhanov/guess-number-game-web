export { Game };

import {
  ATTEMPTS_COUNT_SELECTOR,
  DEFAULT_MESSAGE,
  DEFAULT_SECRET_NUMBER,
  DEFAULT_SECRET_NUMBER_BACKGROUND_COLOR,
  GUESS_INPUT_SELECTOR,
  MESSAGE_SELECTOR,
  SECRET_NUMBER_SELECTOR,
  WIN_SECRET_NUMBER_BACKGROUND_COLOR,
} from "/scripts/properties.js";

class Game {
  secretNumber;
  attemptsCount;

  reset() {
    this.secretNumber = Math.trunc(Math.random() * 50 + 1);
    this.attemptsCount = 0;

    document.querySelector(SECRET_NUMBER_SELECTOR).textContent =
      DEFAULT_SECRET_NUMBER;
    document.querySelector(SECRET_NUMBER_SELECTOR).style.backgroundColor =
      DEFAULT_SECRET_NUMBER_BACKGROUND_COLOR;
    document.querySelector(GUESS_INPUT_SELECTOR).value = null;
    document.querySelector(MESSAGE_SELECTOR).textContent = DEFAULT_MESSAGE;
    document.querySelector(ATTEMPTS_COUNT_SELECTOR).textContent = 0;
  }

  checkGuess() {
    const guessString = document.querySelector(GUESS_INPUT_SELECTOR).value;

    // Empty guess.
    if (!guessString) {
      return;
    }

    // Non-empty guess.
    const guess = Number(guessString);
    document.querySelector(GUESS_INPUT_SELECTOR).value = null;
    this.attemptsCount++;
    document.querySelector(ATTEMPTS_COUNT_SELECTOR).textContent =
      this.attemptsCount;

    // Correct guess.
    if (guess === this.secretNumber) {
      document.querySelector(SECRET_NUMBER_SELECTOR).textContent =
        this.secretNumber;
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
