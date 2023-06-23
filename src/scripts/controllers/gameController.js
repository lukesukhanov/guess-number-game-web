import playerController from "../controllers/playerController.js";

const headerEl = document.querySelector("header");
const secretNumberEl = document.querySelector(".secret-number");
const guessInputEl = document.querySelector(".guess__input");
const gameStateEl = document.querySelector(".game-statistics__state");
const attemptsCountEl = document.querySelector(".game-statistics__attempts-count__value");

class GameController {
  #secretNumber = Math.trunc(Math.random() * 50 + 1);
  #attemptsCount = 0;
  #gameOver = false;

  get gameOver() {
    return this.#gameOver;
  }

  resetGame() {
    this.#secretNumber = Math.trunc(Math.random() * 50 + 1);
    this.#attemptsCount = 0;
    this.#gameOver = false;
    headerEl.classList.remove("win");
    secretNumberEl.textContent = "?";
    secretNumberEl.classList.remove("win");
    guessInputEl.value = null;
    gameStateEl.textContent = "Start guessing...";
    attemptsCountEl.textContent = 0;
  }

  checkGuess() {
    const guess = Number(guessInputEl.value);
    if (!guess) return;
    guessInputEl.value = null;
    attemptsCountEl.textContent = ++this.#attemptsCount;
    if (guess < this.#secretNumber) {
      this.#handleLowerGuess(guess);
    } else if (guess === this.#secretNumber) {
      this.#handleCorrectGuess(guess);
    } else {
      this.#handleHigherGuess(guess);
    }
  }

  #handleLowerGuess(guess) {
    gameStateEl.textContent = `${guess} is too low`;
  }

  #handleCorrectGuess(guess) {
    this.#gameOver = true;
    headerEl.classList.add("win");
    secretNumberEl.textContent = this.#secretNumber;
    secretNumberEl.classList.add("win");
    gameStateEl.textContent = `${guess} is correct!`;
    const player = JSON.parse(window.localStorage.getItem("player"));
    if (!player || (player.bestAttemptsCount && player.bestAttemptsCount <= this.#attemptsCount))
      return;
    player.bestAttemptsCount = this.#attemptsCount;
    window.localStorage.setItem("player", JSON.stringify(player));
    playerController.patchBestAttemptsCount();
  }

  #handleHigherGuess(guess) {
    gameStateEl.textContent = `${guess} is too high`;
  }
}

export default new GameController();
