"use strict";

let correctNum;
let attemptsCount;

const refreshGame = function () {
  correctNum = Math.trunc(Math.random() * 50 + 1);
  attemptsCount = 0;

  document.querySelector(".number").textContent = "?";
  document.querySelector(".number").style.backgroundColor = "lightsteelblue";
  document.querySelector(".message").textContent = "Start guessing...";
  document.querySelector(".attempts-count").textContent = 0;
};

const clearGuessedNumField = function () {
  document.querySelector(".guessed-num-field").value = undefined;
};

const checkGuessedNumber = function () {
  const guessedString = document.querySelector(".guessed-num-field").value;

  // Empty guess.
  if (!guessedString) {
    document.querySelector(".message").textContent = "Nothing to check";

    // Non-empty guess.
  } else {
    clearGuessedNumField();
    const guessedNum = Number(guessedString);
    document.querySelector(".attempts-count").textContent = ++attemptsCount;

    // Correct guess.
    if (guessedNum === correctNum) {
      document.querySelector(".number").textContent = correctNum;
      document.querySelector(".number").style.backgroundColor = "green";

      document.querySelector(
        ".message"
      ).textContent = `${guessedNum} is correct!`;

      // Guess is too low.
    } else if (guessedNum < correctNum) {
      document.querySelector(
        ".message"
      ).textContent = `${guessedNum} is too low`;

      // Guess is too high.
    } else {
      document.querySelector(
        ".message"
      ).textContent = `${guessedNum} is too high`;
    }
  }
};

document
  .querySelector(".check-btn")
  .addEventListener("click", checkGuessedNumber);
document.querySelector(".retry-btn").addEventListener("click", refreshGame);

refreshGame();
