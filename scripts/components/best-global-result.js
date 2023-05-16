export { BestGlobalResult };

import {
  PLAYER_WITH_BEST_RESULT_URL,
  ORIGIN_URL,
  REFRESH_PERIOD,
  DEFAULT_BEST_GLOBAL_RESULT,
} from "/scripts/properties.js";

class BestGlobalResult {
  constructor(element) {
    BestGlobalResult.refreshBestGlobalResult(element);
    setInterval(BestGlobalResult.refreshBestGlobalResult, REFRESH_PERIOD);
  }

  static async refreshBestGlobalResult(element) {
    playerWithBestResult =
      await BestGlobalResult.fetchPlayerWithBestGlobalResult();
    BestGlobalResult.refreshBestGlobalResultOnPage(
      element,
      playerWithBestResult
    );
  }

  static async fetchPlayerWithBestGlobalResult() {
    const response = await fetch(PLAYER_WITH_BEST_RESULT_URL, {
      Origin: ORIGIN_URL,
    });
    const playerWithBestResult = await response.json();
    return playerWithBestResult;
  }

  static refreshBestGlobalResultOnPage(element, playerWithBestResult) {
    if (playerWithBestResult) {
      const username = playerWithBestResult.username;
      const bestAttemptsCount = playerWithBestResult.bestAttemptsCount;
      element.textContent = `${bestAttemptsCount} (${username})`;
    } else {
      element.textContent = DEFAULT_BEST_GLOBAL_RESULT;
    }
  }
}
