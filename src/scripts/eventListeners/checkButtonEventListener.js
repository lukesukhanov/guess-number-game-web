import gameController from "../controllers/gameController.js";

const checkButtonEl = document.querySelector(".guess__check-button");
checkButtonEl.addEventListener("click", event => {
  event.preventDefault();
  if (!gameController.gameOver) {
    gameController.checkGuess();
  }
});
