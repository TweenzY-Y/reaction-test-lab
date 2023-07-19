import {
  DEFAULT_COLORS,
  MAX_USER_SCORES,
  TEST_STATES,
  MIN_WAITING_TIME,
  MAX_WAITING_TIME,
  ATTEMPTS_TO_FINISH,
} from "./config.js";
const state = {
  highscores: [],
  colors: {
    main: DEFAULT_COLORS.main,
    waiting: DEFAULT_COLORS.waiting,
    ready: DEFAULT_COLORS.ready,
  },
  test: {
    timeoutTime: undefined,
    startTime: undefined,
    attempt: 0,
    scores: [],
    averageScore: undefined,
    state: undefined,
    timeout: undefined,
  },
  mobile_view: undefined,
};

// SCORES

const getUserHighscores = function () {
  state.highscores = JSON.parse(
    localStorage.getItem("user-reactiontime-highscores")
  );
};

const removeScore = function (index) {
  state.highscores.splice(index, 1);
};

const addScore = function (averageScore, currentDate) {
  state.highscores.push({
    time: `${averageScore}`,
    date: `${currentDate}`,
  });
};

const sortHighscores = function () {
  state.highscores.sort((currentScore, nextScore) =>
    currentScore.time < nextScore.time ? -1 : 1
  );
};

const removeRedundantScores = function () {
  state.highscores.splice(MAX_USER_SCORES);
};

const saveUserHighscores = function () {
  localStorage.setItem(
    "user-reactiontime-highscores",
    JSON.stringify(state.highscores)
  );
};

// COLORS

const getUserColorSettings = function () {
  state.colors =
    JSON.parse(localStorage.getItem("user-settings")) ?? state.colors;
};

const saveUserColorSettings = function () {
  localStorage.setItem("user-settings", JSON.stringify(state.colors));
};

const setUserColorSettings = function (colorSettings) {
  {
    state.colors = { ...colorSettings };
    console.log(state.colors);
  }
};

const applyUserColorSettings = function () {
  Object.entries(state.colors).forEach((setting) => {
    const [state, color] = setting;
    document.documentElement.style.setProperty(
      `--${state.toUpperCase()}-COLOR`,
      color
    );
  });
};

// TEST

const changeState = function () {
  state.test.state = TEST_STATES[`${state.test.state}`];
};

const playTest = function () {
  switch (state.test.state) {
    case "waiting":
      clearTimeout(state.test.timeout);
      state.test.timeoutTime = undefined;
      changeState();
      break;
    case "failed":
      clearTimeout(state.test.timeout);
      state.test.timeoutTime = undefined;
      makeNewAttempt();
      changeState();
      break;
    case "ready":
      state.test.scores.push(Date.now() - state.test.startTime);
      state.test.timeoutTime = undefined;
      clearTimeout(state.test.timeout);
      state.test.attempt++;
      if (state.test.attempt === ATTEMPTS_TO_FINISH) {
        state.test.state = "finished";
        calcAverageScore();
      } else {
        changeState();
      }
      break;
    case "succeeded":
      makeNewAttempt();
      changeState();
      break;
    case "finished":
      state.test.attempt = 0;
      state.test.scores = [];
      changeState();
      makeNewAttempt();
      break;
    default:
      makeNewAttempt();
      changeState();
      break;
  }
};

const makeNewAttempt = function () {
  state.test.timeoutTime =
    Math.floor(Math.random() * (MAX_WAITING_TIME - MIN_WAITING_TIME + 1)) +
    MIN_WAITING_TIME;

  state.test.timeout = setTimeout(function () {
    state.test.startTime = Date.now();
    state.test.state = "ready";
  }, state.test.timeoutTime);
};

const calcAverageScore = function () {
  state.test.averageScore =
    state.test.scores.reduce((a, b) => a + b, 0) / ATTEMPTS_TO_FINISH;
};
export {
  state,
  getUserHighscores,
  removeScore,
  saveUserHighscores,
  addScore,
  sortHighscores,
  removeRedundantScores,
  getUserColorSettings,
  saveUserColorSettings,
  setUserColorSettings,
  applyUserColorSettings,
  changeState,
  playTest,
};
