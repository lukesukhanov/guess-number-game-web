import {
  PLAYERS_API_URL,
  PLAYERS_API_GET_BY_USERNAME_URL,
  PLAYERS_API_GET_WITH_BEST_RESULT_URL,
} from "../config.js";

class Player {
  id;
  username;
  bestAttemptsCount;

  constructor(id, username, bestAttemptsCount) {
    this.id = id;
    this.username = username;
    this.bestAttemptsCount = bestAttemptsCount;
  }
}

class PlayerService {
  async getByUsername(username) {
    const url = PLAYERS_API_GET_BY_USERNAME_URL + `?username=${username}`;
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
        throw new Error(`Can't find player with username '${username}'`);
    }
  }

  async getPlayersWithBestResult() {
    const response = await fetch(PLAYERS_API_GET_WITH_BEST_RESULT_URL, {
      method: "GET",
      mode: "cors",
      credentials: "omit",
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });
    const responseBody = await response.json();
    const playersWithBestResult = [];
    responseBody.forEach(player => playersWithBestResult.push(player));
    return playersWithBestResult;
  }

  async patchBestAttemptsCount(player, csrfToken) {
    const fetchedPlayer = await this.getByUsername(player.username);
    if (
      fetchedPlayer.bestAttemptsCount &&
      fetchedPlayer.bestAttemptsCount <= player.bestAttemptsCount
    )
      return;

    await fetch(PLAYERS_API_URL + `/${fetchedPlayer.id}`, {
      method: "PATCH",
      mode: "cors",
      credentials: "include",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "X-CSRF-TOKEN": csrfToken,
      },
      body: JSON.stringify({ bestAttemptsCount: player.bestAttemptsCount }),
    });
  }
}

export default new PlayerService();
