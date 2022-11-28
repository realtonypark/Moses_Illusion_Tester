//ATTRIBUTES
var startBtn = document.querySelector("#startQuiz");
var startContainer = document.querySelector("#start-container");
var questionContainer = document.querySelector("#question-container");
var scoreContainer = document.querySelector("#score-container");
var finalScore = document.querySelector("#final-score");
var finalAnswer = document.querySelector("#answers");
var enterInitials = document.querySelector("#enter-initials");
var submitInitials = document.querySelector("#submit-initials");
var answers = document.querySelector("#answers");
var ansEval = document.querySelector("#evaluate-answer");
var ansEvalFinal = document.querySelector("#evaluate-answer-final");
var timer = document.querySelector("#timer");

let currentQuestionIndex = 0;
let q = questions[currentQuestionIndex];
let score = 0;
var timeLeft = 7;
var highscores = JSON.parse(localStorage.getItem("highscores")) || [];

var flag = true;
var totalTime = 0;

let correctAnswerNum = 0;

window.addEventListener("load", renderQuestion);
startBtn.addEventListener("click", Start);
answers.addEventListener("click", checkAnswer);
finalAnswer.addEventListener("click", finalScorePage);
submitInitials.addEventListener("click", pushScores);


//FUNCTIONS 
function Start() {
  currentQuestionIndex = 0;
  console.log(highscores);

  startContainer.setAttribute("style", "display: none");
  questionContainer.setAttribute("style", "display: block");
  startTimer();
  loadingPage();
  totalTimeStarts();
}

function startTimer() {
  var timeInterval = setInterval(function() {
    timeLeft--;
    localStorage.setItem("timer", timeLeft);
    timer.innerHTML = "|  Time: " + timeLeft;
    var icon = document.createElement("i");
    icon.setAttribute("class", "fas fa-hourglass-start fa-spin");
    timer.prepend(icon);
    if (timeLeft <= 0) {
      loadingPage();
    }
    
    if (currentQuestionIndex === 36) {
      timer.textContent = "|  종료";
      timer.style.backgroundColor = "green";
      timer.style.borderColor = "green";
      timer.style.color = "#ffffff";
      icon.setAttribute("class", "fas fa-hourglass-end");
      timer.prepend(icon);
      timer.setAttribute("class", "timer");
      clearInterval(timeInterval);
    }  
  }, 1000);
}

//Render the first question from array
function renderQuestion() {
  document.querySelector("#question-title").innerHTML = q.title;
  document.getElementById("0").innerHTML = "1. " + q.choices[0];
  document.getElementById("1").innerHTML = "2. " + q.choices[1];
}

//Check the index of the choice linked to button against answer in array
function checkAnswer(event) {
  q = questions[currentQuestionIndex];
  //event.preventDefault();
  if (event.target.matches("button")) {
    var userAnswer = questions[currentQuestionIndex].choices[event.target.id];
    console.log(userAnswer);
    var correctAnswer = questions[currentQuestionIndex].answer;
    console.log(correctAnswer);
  }
  if (userAnswer === correctAnswer) {
    correctAnswerNum += 1;
    output[currentQuestionIndex].tf = "정답";
  }
  else{
    output[currentQuestionIndex].tf = "오답";
  }
  loadingPage();
}

function loadingPage() {
    if(flag == true){
      document.querySelector("#question-title").innerHTML = "준비하세요...";
      //hide(document.getElementById('timer'));
      timeLeft = 8;
      document.getElementById("timer").style.display="none";
      document.getElementById("answers").style.display="none";
      currentQuestionIndex -= 1;
      setTimeout(nextQuestion, 1500);
      flag = false;
    }
    else{
      endNow();
      document.querySelector("#question-title").innerHTML = "준비하세요...";
      //hide(document.getElementById('timer'));
      timeLeft = 8;
      document.getElementById("timer").style.display="none";
      document.getElementById("answers").style.display="none";
      setTimeout(nextQuestion, 1500);
    }
}

//has to be after checkAnswer
function nextQuestion() {
  startNow();
  console.log(output);
  timeLeft = 7;
  document.getElementById("timer").style.display="block";
  document.getElementById("answers").style.display="block";
  //startTimer();
  console.log("incrementing");
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    q = questions[currentQuestionIndex];
    renderQuestion();
  }
  console.log(currentQuestionIndex);
}

//displays final score page wih final score
function finalScorePage(event) {
  q = questions[currentQuestionIndex];
  if (event.target.matches("button") && currentQuestionIndex === 36) {
    totalTimeEnds();
    questionContainer.setAttribute("style", "display: none");
    scoreContainer.setAttribute("style", "display: block");

    finalScore.textContent = "맞은 문제의 개수: " + (correctAnswerNum) + "/36" + " | 소요 시간: " + totalTime + "sec";
    console.log("소요 시간: "+ totalTime + "sec");
    //alert("소요 시간: "+ totalTime + "sec");
    //finalScore.textContent = output;
    //alert(output);
    finalScore.setAttribute("class", "correctAnswerNum");
    //alert("검사 결과 Copy&Paste");
  }
  console.log("finalscorepage");
  //console.log(output);
}

//push scores to highscores page
function pushScores() {
  var initials = enterInitials.value;
  var newScores = {
    initials,
    correctAnswerNum
    //score
  };
  if (initials != "") {
    highscores.push(newScores);
    localStorage.setItem("highscores", JSON.stringify(highscores));
    //console.log(initials, correctAnswerNum);
    //console.log(initials, score);
    console.log(initials, correctAnswerNum);
    window.location.href = "HighScores.html";
  } else {
    alert("기수와 이름을 입력해주세요!");
  }
}

//Time Counting
function startNow() {
  startTime = new Date();
};

function endNow() {
  endTime = new Date();
  var timeDiff = endTime - startTime; //in ms

  // strip the ms
  timeDiff /= 1000;

  //console.log(timeDiff + " seconds");
  //alert(timeDiff + " seconds");
  /*
  output.push({
    number: questions[currentQuestionIndex],
    timeDiff: timeDiff
  });
  */
  output[currentQuestionIndex].number = questions[currentQuestionIndex];
  output[currentQuestionIndex].timeDiff = timeDiff;
  //totalTime += timeDiff;
}

//Total time Counting
function totalTimeStarts(){
  sTime = new Date();
}

function totalTimeEnds(){
  eTime = new Date();
  totalTime = eTime - sTime;
  totalTime /= 1000;
}