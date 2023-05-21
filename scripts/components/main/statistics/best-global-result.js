export { BestGlobalResult };

import {
  PLAYERS_WITH_BEST_RESULT_URL,
  ORIGIN_URL,
  BEST_GLOBAL_RESULT_REFRESH_PERIOD,
  DEFAULT_BEST_GLOBAL_RESULT,
} from "/scripts/properties.js";

class BestGlobalResult {
  static bestGlobalResultElement;

  constructor(element) {
    BestGlobalResult.refreshBestGlobalResult(element);
    BestGlobalResult.bestGlobalResultElement = element;
    setInterval(
      BestGlobalResult.refreshBestGlobalResult,
      BEST_GLOBAL_RESULT_REFRESH_PERIOD
    );
  }

  static async refreshBestGlobalResult() {
    const playersWithBestResult =
      await BestGlobalResult.fetchPlayersWithBestGlobalResult();
    BestGlobalResult.refreshBestGlobalResultOnPage(
      BestGlobalResult.bestGlobalResultElement,
      playersWithBestResult
    );
  }

  static async fetchPlayersWithBestGlobalResult() {
    const response = await fetch(PLAYERS_WITH_BEST_RESULT_URL, {
      Origin: ORIGIN_URL,
    });
    const playersWithBestResult = await response.json();
    return playersWithBestResult;
  }

  static refreshBestGlobalResultOnPage(
    bestGlobalResultElement,
    playersWithBestResult
  ) {
    if (playersWithBestResult.length) {
      const player = playersWithBestResult[0];
      const username = player.username;
      const bestAttemptsCount = player.bestAttemptsCount;
      bestGlobalResultElement.textContent = `${bestAttemptsCount} (${username})`;
    } else {
      bestGlobalResultElement.textContent = DEFAULT_BEST_GLOBAL_RESULT;
    }
  }
}
