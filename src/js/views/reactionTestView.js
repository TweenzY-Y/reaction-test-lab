import { TEST_STATES } from "../config.js";
const testBoxElement = document.querySelector(".test-box");
/* const waitingHTML = `<h2>Wait...</h2>`;
const failedHTML = `<h2>Too soon</h2><p>Try again</p>`;
const succeededHTML = `<h2>${userAttemptResult}ms</h2><p>${attemptCounter} of 5</p><p>Click for next try</p>`;
const finishedHTML = `<h2>${userAttemptResult}ms</h2><p>${attemptCounter} of 5</p><p>You average was: <span class="average-score">${userAverageScore}ms</span></p>`; */

class ReactionTestView {
  changeStyle(testState) {
    const secondClass = testBoxElement.classList.item(1);
    testBoxElement.classList.remove(secondClass);
    testBoxElement.classList.add(TEST_STATES[`${testState}`]);
  }
  changeContent(test) {
    switch (test.state) {
      case "waiting":
        console.log("waiting");
        break;
      case "ready":
        console.log("ready");
      case "finished":
        console.log("finished");
      case "succeded":
        console.log("succeeded");
      default:
        console.log("default");
        break;
    }
  }
}

export default new ReactionTestView();
