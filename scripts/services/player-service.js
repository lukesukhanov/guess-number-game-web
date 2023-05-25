export { PlayerService };

import { PLAYERS_API_URL } from "/scripts/properties.js";
import { Player } from "/scripts/player.js";

class PlayerService {
  static async getByUsername(username) {
    const url = PLAYERS_API_URL + `?username=${username}`;
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      credentials: "omit",
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });
    switch (response.status) {
      case 200:
        const responseBody = await response.json();
        return new Player(
          responseBody.id,
          responseBody.username,
          responseBody.bestAttemptsCount
        );
      case 404:
        console.error(`Can't find player with username '${username}'`);
        return null;
    }
  }

  static async updateBestAttemptsCount() {
    const player = window.player;
    if (!player) {
      return;
    }
    const fetchedPlayer = await PlayerService.getByUsername(player.username);
    if (
      fetchedPlayer.bestAttemptsCount &&
      player.bestAttemptsCount >= fetchedPlayer.bestAttemptsCount
    ) {
      return;
    }
    const csrfToken = window.localStorage.getItem("csrfToken");
    await fetch(PLAYERS_API_URL + `/${player.id}`, {
      method: "PUT",
      mode: "cors",
      credentials: "include",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "X-CSRF-TOKEN": csrfToken,
      },
      body: JSON.stringify(player),
    });
  }
}
