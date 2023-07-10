import { DEFAULT_COLORS, MAX_USER_SCORES } from "./config.js";
const state = {
  highscores: [],
  colors: {
    main: DEFAULT_COLORS.main,
    waiting: DEFAULT_COLORS.waiting,
    ready: DEFAULT_COLORS.ready,
  },
  test: {
    attempt: 0,
    scores: [],
    averageScore: undefined,
    state: `waiting`,
  },
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
};
