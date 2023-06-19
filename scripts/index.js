import { NewGameButton } from "/scripts/components/header/new-game/new-game-button.js";
import { LoginButton } from "/scripts/components/header/authorization/login-button.js";
import { PopupLoginButton } from "/scripts/components/pop-up/login-form/pop-up-login-button.js";
import { RegisterButton } from "/scripts/components/header/authorization/register-button.js";
import { PopupRegisterButton } from "/scripts/components/pop-up/registration-form/pop-up-register-button.js";
import { LogoutRef } from "/scripts/components/header/after-authorization/logout-ref.js";
import { GuessInput } from "/scripts/components/main/guess/guess-input.js";
import { CheckButton } from "/scripts/components/main/guess/check-button.js";
import { BestGlobalResult } from "/scripts/components/main/statistics/best-global-result.js";
import { PopupBg } from "/scripts/components/pop-up/pop-up-bg.js";
import { Game } from "/scripts/game.js";
import { AuthorizationService } from "/scripts/services/authorization-service.js";

window.game = new Game();
window.game.reset();

AuthorizationService.loginWithSessionCookie();

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
    class: LoginButton,
    selector: ".authorization__log-in-button",
  },
  {
    class: PopupLoginButton,
    selector: ".login-form__button",
  },
  {
    class: RegisterButton,
    selector: ".authorization__register-button",
  },
  {
    class: PopupRegisterButton,
    selector: ".registration-form__button",
  },
  {
    class: LogoutRef,
    selector: ".after-authorization__logout-ref",
  },
  {
    class: PopupBg,
    selector: ".pop-up-bg",
  },
];

components.forEach(component => {
  if (document.querySelector(component.selector)) {
    document
      .querySelectorAll(component.selector)
      .forEach(element => new component.class(element, component.options));
  }
});
