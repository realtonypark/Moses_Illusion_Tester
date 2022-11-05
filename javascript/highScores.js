//HighScores Page
var clearHistory = document.querySelector("#clear");
var goBack = document.querySelector("#goBack");
var highScoresList = document.querySelector("#high-scores-list");
var highscores = JSON.parse(localStorage.getItem("highscores")) || [];

clearHistory.addEventListener("click", function() {
  localStorage.removeItem("highscores");
  window.location.reload();
});

window.addEventListener("load", renderHighScores);
goBack.addEventListener("click", function(event) {
  window.location.href = "index.html";
});

function renderHighScores() {
  var sorted = highscores.sort(function(a, b) {
    if (a.score < b.score) {
      return 1;
    }
    return -1;
  });

  for (var i = 0; i < sorted.length; i++) {
    console.log(highscores[i].score);
    var li = document.createElement("li");
    li.innerHTML =
      "<h4>" + highscores[i].initials + ": " + highscores[i].score + "</h4>";
    highScoresList.append(li);
  }
}
