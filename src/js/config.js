const MIN_WAITING_TIME = 2000;
const MAX_WAITING_TIME = 4000;
const MAX_USER_SCORES = 10;
const DEFAULT_COLORS = {
  main: "#8685F0",
  waiting: "#a83554",
  ready: "#91ffa0",
};
const TEST_STATES = {
  undefined: "waiting",
  waiting: "failed",
  failed: "waiting",
  ready: "succeeded",
  succeeded: "waiting",
  finished: "waiting",
};
const ATTEMPTS_TO_FINISH = 5;
const MOBILE_VIEW_WIDTH = "768px";
export {
  MIN_WAITING_TIME,
  MAX_WAITING_TIME,
  MAX_USER_SCORES,
  DEFAULT_COLORS,
  TEST_STATES,
  ATTEMPTS_TO_FINISH,
  MOBILE_VIEW_WIDTH,
};
