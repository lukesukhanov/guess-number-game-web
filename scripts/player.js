export { Player };

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
