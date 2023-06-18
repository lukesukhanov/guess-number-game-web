import {
  PLAYERS_API_URL,
  PLAYERS_BY_USERNAME_API_URL,
  PLAYERS_WITH_BEST_RESULT_URL,
} from "/scripts/properties.js";
import { Player } from "/scripts/player.js";

export class PlayerService {
  static async getByUsername(username) {
    const url = PLAYERS_BY_USERNAME_API_URL + `?username=${username}`;
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
        return new Player(responseBody.id, responseBody.username, responseBody.bestAttemptsCount);
      case 404:
        console.error(`Can't find player with username '${username}'`);
        return null;
    }
  }

  static async getPlayersWithBestResult() {
    const response = await fetch(PLAYERS_WITH_BEST_RESULT_URL, {
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
        const playersWithBestResult = [];
        responseBody.forEach(player => playersWithBestResult.push(player));
        return playersWithBestResult;
      case 404:
        console.error("Can't find player with best result");
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
