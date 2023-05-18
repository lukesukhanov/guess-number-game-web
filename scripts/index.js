import {
  BEST_GLOBAL_RESULT_SELECTOR,
  CHECK_BTN_SELECTOR,
  RETRY_BTN_SELECTOR,
  SIGN_IN_BTN_SELECTOR,
  GUESS_INPUT_SELECTOR,
} from "/scripts/properties.js";
import { BestGlobalResult } from "/scripts/components/best-global-result.js";
import { CheckBtn } from "/scripts/components/check-btn.js";
import { RetryBtn } from "/scripts/components/retry-btn.js";
import { SignInBtn } from "/scripts/components/sign-in-btn.js";
import { GuessInput } from "/scripts/components/guess-input.js";
import { Game } from "/scripts/components/game.js";

window.game = new Game();
window.game.reset();

const components = [
  {
    class: BestGlobalResult,
    selector: BEST_GLOBAL_RESULT_SELECTOR,
  },
  {
    class: CheckBtn,
    selector: CHECK_BTN_SELECTOR,
  },
  {
    class: RetryBtn,
    selector: RETRY_BTN_SELECTOR,
  },
  {
    class: GuessInput,
    selector: GUESS_INPUT_SELECTOR,
  },
  {
    class: SignInBtn,
    selector: SIGN_IN_BTN_SELECTOR,
  },
];

components.forEach((component) => {
  if (document.querySelector(component.selector)) {
    document
      .querySelectorAll(component.selector)
      .forEach((element) => new component.class(element, component.options));
  }
});
