export { BestGlobalResult };

import {
  PLAYERS_WITH_BEST_RESULT_URL,
  ORIGIN_URL,
  REFRESH_PERIOD,
  DEFAULT_BEST_GLOBAL_RESULT,
} from "/scripts/properties.js";

class BestGlobalResult {
  constructor(element) {
    // BestGlobalResult.refreshBestGlobalResult(element);
    // setInterval(BestGlobalResult.refreshBestGlobalResult, REFRESH_PERIOD);
  }

  static async refreshBestGlobalResult(element) {
    playersWithBestResult =
      await BestGlobalResult.fetchPlayersWithBestGlobalResult();
    BestGlobalResult.refreshBestGlobalResultOnPage(
      element,
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

  static refreshBestGlobalResultOnPage(element, playersWithBestResult) {
    if (playersWithBestResult) {
      const username = playersWithBestResult.username;
      const bestAttemptsCount = playersWithBestResult.bestAttemptsCount;
      element.textContent = `${bestAttemptsCount} (${username})`;
    } else {
      element.textContent = DEFAULT_BEST_GLOBAL_RESULT;
    }
  }
}
