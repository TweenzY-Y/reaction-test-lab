// IMPORTS
import * as Settings from "./config.js";
import * as model from "./model.js";
import colorSettingsView from "./views/colorSettingsView.js";
import tableView from "./views/tableView.js";
import reactionTestView from "./views/reactionTestView.js";
import hamburgerMenuView from "./views/hamburgerMenuView.js";

// Functions

//// Score control functions

const controlScoreRemove = function (index) {
  model.removeScore(index);
  model.saveUserHighscores();
  tableView.displayUserScores(model.state.highscores);
};

const controlUpdateHighscore = function (score) {
  model.addScore(score);
  model.sortHighscores();
  model.removeRedundantScores();
  model.saveUserHighscores();
  tableView.displayUserScores(model.state.highscores);
};

//// Color settings control functions

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

//// Hamburger menu control functions

const controlHamburgerMenuClick = function () {
  hamburgerMenuView.handleHamburgerMenuClick();
};

//// Test control functions
const controlTestClick = function (e) {
  if (model.state.test.state !== "finished" || e.target.tagName === "BUTTON") {
    model.playTest();
    reactionTestView.changeStyle(model.state.test.state);
    reactionTestView.changeContent(model.state.test);
  }
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

// App logic

//// Observing mobile view change

const mobileView = matchMedia(`(max-width: ${Settings.MOBILE_VIEW_WIDTH})`);

mobileView.addEventListener("change", () => {
  hamburgerMenuView.removeHamburgerEffects();
});

//// Hamburger menu

hamburgerMenuView.addHamburgerMenuClickHandler(controlHamburgerMenuClick);
hamburgerMenuView.addNavLinksClickHandler();

//// Color settings

colorSettingsView.addResetButtonHandle(controlResetColorSettings);
colorSettingsView.addSaveButtonHandle(controlSaveColorSettings);
colorSettingsView.addSettingsHandler();
model.getUserColorSettings();
model.applyUserColorSettings();
colorSettingsView.setPickersColor(model.state.colors);

//// Test

reactionTestView.addClickHandle(controlTestClick);

//// Fetching user highscores from localstorage
model.getUserHighscores();
tableView.displayUserScores(model.state.highscores);

//// Highscores table
tableView.addRemovingScoreHandler(controlScoreRemove);
