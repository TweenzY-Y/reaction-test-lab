// IMPORTS
import * as Settings from "./config.js";
import * as model from "./model.js";
import colorSettingsView from "./views/colorSettingsView.js";
import tableView from "./views/tableView.js";
import reactionTestView from "./views/reactionTestView.js";

const hamburgerMenuElement = document.querySelector(".hamburger-menu");
const navElement = document.querySelector("ul");
const mainElement = document.querySelector("main");
const bodyElement = document.querySelector("body");
const navLinkElements = document.querySelectorAll("a");
const testBoxElement = document.querySelector(".test-box");
const collectionOfToggleElements = [
  hamburgerMenuElement,
  navElement,
  mainElement,
  bodyElement,
];
const currentDate = getCurrentDate();
// TEMP VARIABLES

let attemptCounter = 0;
let userAttemptData = [];
let startTime;
let callAttempt;
// FETCHING USER SCORES FROM LOCALSTORAGE
model.getUserHighscores(); // MVC
tableView.displayUserScores(model.state.highscores); // MVC
// HAMBURGER MENU AND MOBILE VIEW
const controlUpdateHighscore = function (score) {
  model.addScore(score, currentDate); // MVC
  model.sortHighscores(); // MVC
  model.removeRedundantScores(); // MVC
  model.saveUserHighscores(); // MVC
  tableView.displayUserScores(model.state.highscores); // MVC
};

hamburgerMenuElement.addEventListener("click", changeNavbarState);

navLinkElements.forEach((element) => {
  element.addEventListener("click", changeNavbarState);
});

window.onresize = handleWindowResize;

function changeNavbarState() {
  if (window.innerWidth < 768) {
    collectionOfToggleElements.forEach((element) => {
      element.classList.toggle("active");
    });
  }
}

function handleWindowResize() {
  if (
    window.innerWidth >= 768 &&
    hamburgerMenuElement.classList.contains("active")
  ) {
    collectionOfToggleElements.forEach((element) => {
      element.classList.remove("active");
    });
  }
}

// TEST

function playTest() {
  const testState = document.querySelector(".test-box").classList[1];
  switch (testState) {
    case "waiting":
      changeTestState(testBoxElement, "failed");
      testBoxElement.innerHTML = "<h2>Too soon</h2><p>Try again</p>";
      clearTimeout(callAttempt);
      break;
    case "ready":
      const userAttemptResult = Date.now() - startTime;
      userAttemptData.push(userAttemptResult);
      attemptCounter++;
      if (attemptCounter === 5) {
        changeTestState(testBoxElement, "finished");
        const userAverageScore = userAttemptData.reduce((a, b) => a + b, 0) / 5;
        testBoxElement.innerHTML = `<h2>${userAttemptResult}ms</h2><p>${attemptCounter} of 5</p><p>You average was: <span class="average-score">${userAverageScore}ms</span></p>`;
        attemptCounter = 0;
        userAttemptData = [];

        controlUpdateHighscore(userAverageScore);
        break;
      } else {
        changeTestState(testBoxElement, "succeeded");
        testBoxElement.innerHTML = `<h2>${userAttemptResult}ms</h2><p>${attemptCounter} of 5</p><p>Click for next try</p>`;
        break;
      }
    default:
      createNewTest();
      break;
  }
}

function createNewTest() {
  changeTestState(testBoxElement, "waiting");
  testBoxElement.innerHTML = "<h2>Wait...</h2>";
  const randomWaitingTime =
    Math.floor(
      Math.random() *
        (Settings.MAX_WAITING_TIME - Settings.MIN_WAITING_TIME + 1)
    ) + Settings.MIN_WAITING_TIME;
  callAttempt = setTimeout(function () {
    startTime = Date.now();
    changeTestState(testBoxElement, "ready");
    testBoxElement.innerHTML = "<h2>Now!</h2>";
  }, randomWaitingTime);
}

// DATE

function getCurrentDate() {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());

  return `${day}.${month}.${year}`;
}
// COLOR SETTINGS
const controlScoreRemove = function (index) {
  model.removeScore(index);
  model.saveUserHighscores();
  tableView.displayUserScores(model.state.highscores);
}; // MVC

tableView.addRemovingScoreHandler(controlScoreRemove); // MVC
model.getUserColorSettings();
model.applyUserColorSettings();
colorSettingsView.setPickersColor(model.state.colors);

const controlResetColorSettings = function () {
  model.setUserColorSettings(Settings.DEFAULT_COLORS);
  model.applyUserColorSettings();
  model.saveUserColorSettings();
  colorSettingsView.setPickersColor(model.state.colors);
};

const controlSaveColorSettings = function (colorSettings) {
  model.setUserColorSettings(colorSettings);
  model.applyUserColorSettings();
  model.saveUserColorSettings();
};

const controlTestClick = function () {
  model.changeState();
  reactionTestView.changeStyle(model.state.test.state);
  reactionTestView.changeContent(model.state.test);
};
colorSettingsView.addResetButtonHandle(controlResetColorSettings);
colorSettingsView.addSaveButtonHandle(controlSaveColorSettings);
colorSettingsView.addSettingsHandler();
reactionTestView.addClickHandle(controlTestClick);
