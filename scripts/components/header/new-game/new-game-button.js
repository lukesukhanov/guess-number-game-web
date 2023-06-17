export class NewGameButton {
  constructor(element) {
    element.addEventListener("click", NewGameButton.handleClick);
  }

  static handleClick(event) {
    event.preventDefault();
    window.game.reset();
  }
}
