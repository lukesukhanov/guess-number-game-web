import playerController from "../controllers/playerController.js";

const bestGlobalResultEl = document.querySelector(".game-statistics__best-global-result__value");

const refreshBestGlobalResult = async function () {
  try {
    const playersWithBestResult = await playerController.getPlayersWithBestResult();
    const playerWithBestResult = playersWithBestResult[0];
    if (!playerWithBestResult) {
      throw new Error();
    }
    const username = playerWithBestResult.username;
    const bestAttemptsCount = playerWithBestResult.bestAttemptsCount;
    bestGlobalResultEl.textContent = `${bestAttemptsCount} (${username})`;
  } catch (e) {
    bestGlobalResultEl.textContent = "-";
  }
};

refreshBestGlobalResult();
setInterval(refreshBestGlobalResult, 5000);
