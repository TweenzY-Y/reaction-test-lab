import { TEST_STATES, ATTEMPTS_TO_FINISH } from "../config.js";
const testBoxElement = document.querySelector(".test-box");
let contentHTML;
/* const waitingHTML = `<h2>Wait...</h2>`;
const failedHTML = `<h2>Too soon</h2><p>Try again</p>`;
const succeededHTML = `<h2>${userAttemptResult}ms</h2><p>${attemptCounter} of 5</p><p>Click for next try</p>`;
const finishedHTML = `<h2>${userAttemptResult}ms</h2><p>${attemptCounter} of 5</p><p>You average was: <span class="average-score">${userAverageScore}ms</span></p>`; */

class ReactionTestView {
  changeStyle(testState) {
    const secondClass = testBoxElement.classList.item(1);
    testBoxElement.classList.remove(secondClass);
    testBoxElement.classList.add(`${testState}`);
  }
  changeContent(test) {
    testBoxElement.innerHTML = "";
    switch (test.state) {
      case "waiting":
        contentHTML = `<h2>Wait...</h2>`;
        break;
      case "ready":
        contentHTML = `<h2>Now!</h2>"`;
        break;
      case "finished":
        contentHTML = `<h2>${test.scores.at(-1)}ms</h2><p>${
          test.attempt
        } of ${ATTEMPTS_TO_FINISH}</p><p>You average was: <span class="average-score">${
          test.averageScore
        }ms</span></p>`;
        break;
      case "succeeded":
        contentHTML = `<h2>${test.scores.at(-1)}ms</h2><p>${
          test.attempt
        } of ${ATTEMPTS_TO_FINISH}</p><p>Click for next try</p>`;
        break;
      case "failed":
        contentHTML = `<h2>Too soon</h2><p>Try again</p>`;
      default:
        break;
    }
    testBoxElement.insertAdjacentHTML("afterbegin", contentHTML);
  }

  addClickHandle(handler) {
    testBoxElement.addEventListener("mousedown", handler);
  }
}

export default new ReactionTestView();
