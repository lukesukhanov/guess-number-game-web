import gameController from "../controllers/gameController.js";

const guessInputEl = document.querySelector(".guess__input");
guessInputEl.addEventListener("keydown", event => {
  if (event.key === "Enter" && !gameController.gameOver) {
    gameController.checkGuess();
  }
});
