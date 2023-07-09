const tableElement = document.querySelector("tbody");

class TableView {
  displayUserScores(scores) {
    tableElement.innerHTML = "";
    if (scores.length === 0) {
      const scoreHTML = document.createElement("tr");
      scoreHTML.innerHTML = `<td colspan="3">You don't have any scores yet</td>`;
      tableElement.appendChild(scoreHTML);
    } else {
      scores.forEach((score, i) => {
        const scoreHTML = document.createElement("tr");
        scoreHTML.innerHTML = `<td>${i + 1}</td>
        <td>${score.time + "ms"}</td>
        <td>${score.date}</td>
        <div class="overlay"><img src="src/img/trashbin_icon.png" height="24" width="24" alt="trash bin icon"></div>`;
        tableElement.appendChild(scoreHTML);
      });
    }
  }

  addRemovingScoreHandler(handler) {
    tableElement.addEventListener("click", (e) => {
      if (e.target.closest("div")?.classList.contains("overlay")) {
        handler(e.target.closest("tr").firstChild.innerHTML - 1);
      }
    });
  }
}
export default new TableView();
