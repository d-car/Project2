// changing the page into the 'waiting for players' state
// alerts for testing purposes

var $questionText = $("#question-text");
var $submitQuestionBtn = $("#submitQuestion");
var $setupBtn = $("#setup");
var $hostBtn = $("#host");
var $playerBtn = $("#player");
var $hostSubBtn = $("#submitHost");
var $playerSubBtn = $("#submitPlayer");
var $startGameBtn = $("#startGameBtn");
var $submitAnswers = $("#submitAnswers");

var hostName;
var playerName;
var gameTitle;
var timeLeft = 10;
var counter = parseInt(localStorage.counter);

localStorage.clear();
localStorage.counter = 0;
counter = 0;

var questionHeaderDisplay = $("#questionHeader");
var answerOneDisplay = $("#answerOneDisplay");
var answerTwoDisplay = $("#answerTwoDisplay");

function initWaiting() {
    if (hostName) {
      alert("you're the host!");
      document.getElementById("playerWaitingBlock").style.display = "block";
      document.getElementById("hostInfoBlock").style.display = "none";
      $("#currentPlayers").append('<li>' + hostName + '</li>');
      $("#displayGameTitle").text(gameTitle);
    } else {
      alert("you're a player!");
      document.getElementById("playerWaitingBlock").style.display = "block";
      document.getElementById("playerInfoBlock").style.display = "none";
      document.getElementById("startGameBtn").style.display = "none";
      $("#currentPlayers").append('<li>' + playerName + '</li>');
      $("#displayGameTitle").text(gameTitle);
    }
}

var revealHostInfo = function (event) {
    event.preventDefault;
    document.getElementById("playerInfoBlock").style.display = "none";
    document.getElementById("hostInfoBlock").style.display = "block";
  }
  
  var revealPlayerInfo = function (event) {
    event.preventDefault;
    document.getElementById("playerInfoBlock").style.display = "block";
    document.getElementById("hostInfoBlock").style.display = "none";
  }

//this function changes the page from 'waiting for player' to 'game started' 
// when host clicks start game. also starts the timer for players to submit answers

var startGame = function (event) {
    event.preventDefault;
    document.getElementById("playerWaitingBlock").style.display = "none";
    document.getElementById("answerQuestions").style.display = "block";
    startTimer();
    decrement();
}

//function to capture players answers to question 1 and 2

function answersToVoting() {
    document.getElementById("answerQuestions").style.display = "none";
    document.getElementById("votingBlock").style.display = "block";
}

var submitHost = function (event) {
    event.preventDefault;
    hostName = $("#hostName").val().trim();
    localStorage.name = hostName;
    gameTitle = $("#hostGameTitle").val().trim();
    hideInitialInfo();
    alert("Hosting Game As " + hostName)
    initWaiting();
  }
  
  var submitPlayer = function (event) {
    event.preventDefault;
    playerName = $("#playerName").val().trim();
    localStorage.name = playerName;
    gameTitle = $("#playerGameTitle").val().trim();
    hideInitialInfo();
    alert("Joining Game As " + playerName)
    initWaiting();
  }

  function hideInitialInfo() {
    document.getElementById("initialButtonsandInfo").style.display = "none";
  }

//simple start timer function

function startTimer() {
    intervalId = setInterval(decrement, 1000);
}

//function to decrease time left in all timers

function decrement() {
    timeLeft--;
    $("#time-left").text("Time Left: " + timeLeft);
    $("#voting-time-left").text("Time Left: " + timeLeft);
    if (timeLeft === 0) {
        timeUp();
}
}

var submitAnswers = function (event) {
    alert("Answers Submitted!")
    event.preventDefault;
    var answerOne = $("#answerOne").val().trim();
    var answerTwo = $("#answerTwo").val().trim();
    localStorage.answerOne = answerOne;
    localStorage.answerTwo = answerTwo;
  }

// function that triggers when timeLeft = 0. changes the counter value
// in localstorage. depending on that value we cycle through questions
// from the database and display player responses. eventually display
// scores at the end of the game

function timeUp() {
    stop();
    alert("TIME'S UP!")
    counter++;
    localStorage.counter = counter
    counterCheck();
}

//simple function to return the counter value in localStorage
//for use in a switch case with counterSwitch var

function counterCheck() {
    switch (counter) {
        case 1:
        alert("QUESTION 1");
        answersToVoting();
        questionHeaderDisplay.text("What is the strangest place you made whoopie?");
        answerOneDisplay.text(localStorage.answerOne);
        answerTwoDisplay.text("In a dumpster!");
        timeLeft = 10;
        startTimer();
        decrement();
        break

        case 2:
        alert("QUESTION 2");
        questionHeaderDisplay.text("What is your favorite food?");
        answerOneDisplay.text("This question sucks!");
        answerTwoDisplay.text(localStorage.answerTwo);
        timeLeft = 10;
        startTimer();
        decrement();
        break

        case 3:
        alert("GAME OVER!")
    }
}

//function to stop timer

function stop() {
    clearInterval(intervalId);
}

//EVENT HANDLERS


$startGameBtn.on("click", startGame);

$hostSubBtn.on("click", submitHost);
$playerSubBtn.on("click", submitPlayer);

$hostBtn.on("click", revealHostInfo);
$playerBtn.on("click", revealPlayerInfo);

$submitAnswers.on("click", submitAnswers);
