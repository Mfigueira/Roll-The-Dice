var scores, roundScore, activePlayer, isGameOn, lastDice, winningScore;

initGame();

document.querySelector(".btn-roll").addEventListener("click", function () {
  if (isGameOn) {
    setWinningScore();

    var dice = Math.floor(Math.random() * 6) + 1;
    var diceDOM = document.querySelector(".dice");

    diceDOM.style.display = "block";
    diceDOM.src = "/img/dice-" + dice + ".png";

    if (dice === 6 && lastDice === 6) {
      looseTotalScore();
      changePlayer();
    } else if (dice === 1) {
      changePlayer();
    } else {
      accumulateCurrentScore(dice);
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (isGameOn) {
    setWinningScore();
    accumulateTotalScore();
    hideDice();

    if (scores[activePlayer] >= winningScore) {
      endGame();
    } else {
      changePlayer();
    }
  }
});

document.querySelector(".btn-new").addEventListener("click", initGame);

document.querySelector(".rules-btn").addEventListener("click", function () {
  this.classList.toggle("open");
});

function looseTotalScore() {
  scores[activePlayer] = 0;
  document.getElementById("score-" + activePlayer).textContent = "0";
}

function accumulateCurrentScore(dice) {
  roundScore += dice;
  document.querySelector("#current-" + activePlayer).textContent = roundScore;
  lastDice = dice;
}
function accumulateTotalScore() {
  scores[activePlayer] += roundScore;
  document.getElementById("score-" + activePlayer).textContent =
    scores[activePlayer];
}

function changePlayer() {
  roundScore = 0;
  document.querySelector("#current-" + activePlayer).textContent = roundScore;
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  lastDice = undefined;

  document.querySelector(".player-1-panel").classList.toggle("active");
  document.querySelector(".player-0-panel").classList.toggle("active");
}

function setWinningScore() {
  var input = document.querySelector(".final-score");
  if (!input.disabled) {
    input.value > 0
      ? (winningScore = input.value)
      : (input.value = winningScore);
    input.disabled = true;
  }
}

function endGame() {
  document.querySelector("#name-" + activePlayer).textContent = "Winner!";
  document
    .querySelector(".player-" + activePlayer + "-panel")
    .classList.add("winner");
  document
    .querySelector(".player-" + activePlayer + "-panel")
    .classList.remove("active");
  isGameOn = false;
}

function initGame() {
  hideDice();
  setInitialVariables();
  resetHTML();
}

function hideDice() {
  document.querySelector(".dice").style.display = "none";
}

function setInitialVariables() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  isGameOn = true;
  lastDice = undefined;
  winningScore = 50;
}

function resetHTML() {
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
  document.querySelector(".final-score").value = "";
  document.querySelector(".final-score").disabled = false;
}
