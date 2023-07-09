const resetSettingsButtonElement = document.querySelector(
  "#reset-settings-btn"
);
const saveSettingsButtonElement = document.querySelector("#save-settings-btn");

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
}

export default new ColorSettingsView();
