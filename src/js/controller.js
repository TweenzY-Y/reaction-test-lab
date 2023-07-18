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
const collectionOfToggleElements = [
  hamburgerMenuElement,
  navElement,
  mainElement,
  bodyElement,
];
const currentDate = getCurrentDate();
// TEMP VARIABLES

// FETCHING USER SCORES FROM LOCALSTORAGE
model.getUserHighscores(); // MVC
tableView.displayUserScores(model.state.highscores); // MVC
// HAMBURGER MENU AND MOBILE VIEW

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
  model.playTest();
  reactionTestView.changeStyle(model.state.test.state);
  reactionTestView.changeContent(model.state.test);
  if (model.state.test.timeoutTime) {
    setTimeout(() => {
      reactionTestView.changeStyle(model.state.test.state);
      reactionTestView.changeContent(model.state.test);
    }, model.state.test.timeoutTime);
  }
  if (model.state.test.averageScore) {
    controlUpdateHighscore(model.state.test.averageScore);
    model.state.test.averageScore = undefined;
  }
};
const controlUpdateHighscore = function (score) {
  model.addScore(score, currentDate); // MVC
  model.sortHighscores(); // MVC
  model.removeRedundantScores(); // MVC
  model.saveUserHighscores(); // MVC
  tableView.displayUserScores(model.state.highscores); // MVC
};
colorSettingsView.addResetButtonHandle(controlResetColorSettings);
colorSettingsView.addSaveButtonHandle(controlSaveColorSettings);
colorSettingsView.addSettingsHandler();
reactionTestView.addClickHandle(controlTestClick);
