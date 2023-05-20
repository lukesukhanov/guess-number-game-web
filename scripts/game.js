export { Game };

import {
  DEFAULT_STATISTICS_MESSAGE,
  DEFAULT_SECRET_NUMBER,
  DEFAULT_SECRET_NUMBER_BG_COLOR,
  AFTER_WIN_SECRET_NUMBER_BG_COLOR,
} from "/scripts/properties.js";

class Game {
  secretNumber;
  attemptsCount;
  gameOver = false;

  reset() {
    this.secretNumber = Math.trunc(Math.random() * 50 + 1);
    this.attemptsCount = 0;
    this.gameOver = false;
    document.querySelector(".secret-number").textContent =
      DEFAULT_SECRET_NUMBER;
    document.querySelector(".secret-number").style.backgroundColor =
      DEFAULT_SECRET_NUMBER_BG_COLOR;
    document.querySelector(".guess__input").value = null;
    document.querySelector(".statistics__message").textContent =
      DEFAULT_STATISTICS_MESSAGE;
    document.querySelector(
      ".statistics__attempts-count__value"
    ).textContent = 0;
  }

  checkGuess() {
    const guessString = document.querySelector(".guess__input").value;

    // Empty guess.
    if (!guessString) {
      return;
    }

    // Non-empty guess.
    const guess = Number(guessString);
    document.querySelector(".guess__input").value = null;
    this.attemptsCount++;
    document.querySelector(".statistics__attempts-count__value").textContent =
      this.attemptsCount;

    // Correct guess.
    if (guess === this.secretNumber) {
      this.gameOver = true;
      document.querySelector(".secret-number").textContent = this.secretNumber;
      document.querySelector(".secret-number").style.backgroundColor =
        AFTER_WIN_SECRET_NUMBER_BG_COLOR;

      document.querySelector(
        ".statistics__message"
      ).textContent = `${guess} is correct!`;

      // Guess is too low.
    } else if (guess < game.secretNumber) {
      document.querySelector(
        ".statistics__message"
      ).textContent = `${guess} is too low`;

      // Guess is too high.
    } else {
      document.querySelector(
        ".statistics__message"
      ).textContent = `${guess} is too high`;
    }
  }
}
