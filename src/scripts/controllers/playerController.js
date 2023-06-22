import playerService from "../services/playerService.js";

class PlayerController {
  async fetchByUsername(username) {
    try {
      const player = await playerService.getByUsername(username);
      window.localStorage.setItem("player", JSON.stringify(player));
    } catch (e) {
      console.error(e.message);
    }
  }

  async getPlayersWithBestResult() {
    try {
      return await playerService.getPlayersWithBestResult();
    } catch (e) {
      console.error(e.message);
      return null;
    }
  }

  async patchBestAttemptsCount() {
    const player = JSON.parse(window.localStorage.getItem("player"));
    const csrfToken = window.localStorage.getItem("csrfToken");
    if (!player || !player.bestAttemptsCount || !csrfToken) return;
    try {
      await playerService.patchBestAttemptsCount(player, csrfToken);
    } catch (e) {
      console.error(e.message);
    }
  }
}

export default new PlayerController();
