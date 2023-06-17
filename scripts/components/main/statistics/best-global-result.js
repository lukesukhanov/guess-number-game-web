import { PlayerService } from "/scripts/services/player-service.js";
import {
  BEST_GLOBAL_RESULT_REFRESH_PERIOD,
  DEFAULT_BEST_GLOBAL_RESULT,
} from "/scripts/properties.js";

export class BestGlobalResult {
  static bestGlobalResultElement;

  constructor(element) {
    BestGlobalResult.bestGlobalResultElement = element;
    BestGlobalResult.refreshBestGlobalResult();
    setInterval(BestGlobalResult.refreshBestGlobalResult, BEST_GLOBAL_RESULT_REFRESH_PERIOD);
  }

  static async refreshBestGlobalResult() {
    const playersWithBestResult = await PlayerService.getPlayersWithBestResult();
    BestGlobalResult.refreshBestGlobalResultOnPage(
      BestGlobalResult.bestGlobalResultElement,
      playersWithBestResult
    );
  }

  static refreshBestGlobalResultOnPage(bestGlobalResultElement, playersWithBestResult) {
    if (playersWithBestResult[0]) {
      const username = playersWithBestResult[0].username;
      const bestAttemptsCount = playersWithBestResult[0].bestAttemptsCount;
      bestGlobalResultElement.textContent = `${bestAttemptsCount} (${username})`;
    } else {
      bestGlobalResultElement.textContent = DEFAULT_BEST_GLOBAL_RESULT;
    }
  }
}
