export const API_URL = "http://localhost:8080/api";
export const PLAYERS_API_URL = API_URL + "/players";
export const PLAYER_WITH_BEST_RESULT_URL =
  PLAYERS_API_URL + "/withMinBestAttemptsCount";

export const ORIGIN_URL = "http://localhost:5500";

export const REFRESH_PERIOD = 5000;

export const DEFAULT_SECRET_NUMBER = "?";
export const DEFAULT_SECRET_NUMBER_BACKGROUND_COLOR = "lightsteelblue";
export const WIN_SECRET_NUMBER_BACKGROUND_COLOR = "green";
export const DEFAULT_MESSAGE = "Start guessing...";
export const DEFAULT_BEST_GLOBAL_RESULT = "-";

export const SECRET_NUMBER_SELECTOR = ".secret-number";
export const MESSAGE_SELECTOR = ".message";
export const GUESS_INPUT_SELECTOR = ".guess-input";
export const CHECK_BTN_SELECTOR = ".check-btn";
export const RETRY_BTN_SELECTOR = ".retry-btn";
export const ATTEMPTS_COUNT_SELECTOR = ".attempts-count";
export const BEST_GLOBAL_RESULT_SELECTOR = ".best-global-result";
