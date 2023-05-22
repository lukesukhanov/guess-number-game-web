export { PlayerService };

import { PLAYERS_API_URL, ORIGIN_URL } from "/scripts/properties.js";
import { Player } from "/scripts/player.js";

class PlayerService {
  static async getByUsername(username) {
    const url = PLAYERS_API_URL + `?username=${username}`;
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Origin: ORIGIN_URL,
      },
      redirect: "manual",
      referrerPolicy: "no-referrer",
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
        break;
    }
  }

  static async updateBestAttemptsCount() {
    const player = window.player;
    if (!player) {
      return;
    }
    const savedPlayer = PlayerService.getByUsername(player.username);
    if (
      savedPlayer.bestAttemptsCount &&
      player.bestAttemptsCount >= savedPlayer.bestAttemptsCount
    ) {
      return;
    }
    const url = PLAYERS_API_URL + `/${player.id}`;
    await fetch(url, {
      method: "PUT",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Origin: ORIGIN_URL,
      },
      body: JSON.stringify(player),
      redirect: "manual",
      referrerPolicy: "no-referrer",
    });
  }
}
