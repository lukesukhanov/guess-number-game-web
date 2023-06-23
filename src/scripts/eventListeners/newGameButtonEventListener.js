import gameController from "../controllers/gameController.js";

const newGameButtonEl = document.querySelector(".new-game-button");
newGameButtonEl.addEventListener("click", event => {
  event.preventDefault();
  gameController.resetGame();
});
