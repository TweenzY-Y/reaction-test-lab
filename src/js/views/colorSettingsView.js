// SETTINGS POPUP ELEMENTS
const settingsButtonElement = document.querySelector("#settings-btn");
const settingsPopupBackgroundElement = document.querySelector(
  ".settings-popup-background"
);
const settingsPopupMainElement = document.querySelector(".settings-popup");
// BUTTONS
const resetSettingsButtonElement = document.querySelector(
  "#reset-settings-btn"
);
const saveSettingsButtonElement = document.querySelector("#save-settings-btn");
// COLOR PICKERS
const mainColorPicker = document.querySelector("#main-color");
const waitingColorPicker = document.querySelector("#waiting-color");
const readyColorPicker = document.querySelector("#ready-color");

class ColorSettingsView {
  addResetButtonHandle(handler) {
    resetSettingsButtonElement.addEventListener("click", handler);
  }

  addSaveButtonHandle(handler) {
    saveSettingsButtonElement.addEventListener("click", () => {
      const userColors = {
        main: mainColorPicker.value,
        waiting: waitingColorPicker.value,
        ready: readyColorPicker.value,
      };
      handler(userColors);
    });
  }

  setPickersColor(colors) {
    Object.entries(colors).forEach((setting) => {
      const [state, color] = setting;
      eval(`${state.concat("ColorPicker")}`).value = color;
    });
  }

  changeState() {
    settingsPopupBackgroundElement.classList.toggle("active");
    settingsPopupMainElement.classList.toggle("active");
    if (settingsPopupBackgroundElement.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }

  addSettingsHandler() {
    settingsButtonElement.addEventListener("click", this.changeState);
    settingsPopupBackgroundElement.addEventListener("click", this.changeState);
  }
}

export default new ColorSettingsView();
