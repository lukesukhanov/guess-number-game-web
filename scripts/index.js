import { NewGameButton } from "/scripts/components/header/new-game/new-game-button.js";
import { LogInButton } from "/scripts/components/header/authorization/log-in-button.js";
import { RegisterButton } from "/scripts/components/header/authorization/register-button.js";
import { PopUpRegisterButton } from "/scripts/components/pop-up/registration-form/pop-up-register-button.js";
import { GuessInput } from "/scripts/components/main/guess/guess-input.js";
import { CheckButton } from "/scripts/components/main/guess/check-button.js";
import { BestGlobalResult } from "/scripts/components/main/statistics/best-global-result.js";
import { PopUpBg } from "/scripts/components/pop-up/pop-up-bg.js";
import { Game } from "/scripts/game.js";

window.game = new Game();
window.game.reset();

const components = [
  {
    class: NewGameButton,
    selector: ".new-game__button",
  },
  {
    class: BestGlobalResult,
    selector: ".statistics__best-global-result__value",
  },
  {
    class: CheckButton,
    selector: ".guess__check-button",
  },
  {
    class: GuessInput,
    selector: ".guess__input",
  },
  {
    class: LogInButton,
    selector: ".authorization__log-in-button",
  },
  {
    class: RegisterButton,
    selector: ".authorization__register-button",
  },
  {
    class: PopUpRegisterButton,
    selector: ".registration-form__button",
  },
  {
    class: PopUpBg,
    selector: ".pop-up-bg",
  },
];

components.forEach((component) => {
  if (document.querySelector(component.selector)) {
    document
      .querySelectorAll(component.selector)
      .forEach((element) => new component.class(element, component.options));
  }
});
