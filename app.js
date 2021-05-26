'use strict';

// App State
let scores,
  currentScore,
  winningScore,
  activePlayer,
  isGameOn,
  rolled,
  lastRolled;

// Selecting elements
const player0Panel = document.querySelector('.player-0-panel');
const player1Panel = document.querySelector('.player-1-panel');
const name0 = document.querySelector('#name-0');
const name1 = document.querySelector('#name-1');
const score0 = document.querySelector('#score-0');
const score1 = document.querySelector('#score-1');
const current0 = document.querySelector('#current-0');
const current1 = document.querySelector('#current-1');
const dice = document.querySelector('.dice');
const newGameBtn = document.querySelector('.btn-new');
const rollBtn = document.querySelector('.btn-roll');
const holdBtn = document.querySelector('.btn-hold');
const rulesBtn = document.querySelector('.rules-btn');
const finalScore = document.querySelector('.final-score');

// App functions
const accumulateCurrentScore = dice => {
  currentScore += dice;
  document.querySelector(`#current-${activePlayer}`).textContent = currentScore;
  lastRolled = dice;
};

const accumulateTotalScore = () => {
  scores[activePlayer] += currentScore;
  document.querySelector(`#score-${activePlayer}`).textContent =
    scores[activePlayer];
};

const changePlayer = () => {
  currentScore = 0;
  document.querySelector(`#current-${activePlayer}`).textContent = currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  lastRolled = undefined;

  player0Panel.classList.toggle('active');
  player1Panel.classList.toggle('active');
};

const setWinningScore = () => {
  if (!finalScore.disabled) {
    if (finalScore.value > 0) winningScore = finalScore.value;
    else finalScore.value = winningScore;
    finalScore.disabled = true;
  }
};

const endGame = () => {
  document.querySelector(`#name-${activePlayer}`).textContent = 'Winner!';
  document
    .querySelector(`.player-${activePlayer}-panel`)
    .classList.add('winner');
  document
    .querySelector(`.player-${activePlayer}-panel`)
    .classList.remove('active');
  isGameOn = false;
};

const showDice = rolled => {
  dice.style.display = 'block';
  dice.src = `./img/dice-${rolled}.png`;
};

const hideDice = () => {
  dice.style.display = 'none';
};

const setInitialState = () => {
  scores = [0, 0];
  currentScore = activePlayer = 0;
  isGameOn = true;
  lastRolled = undefined;
  winningScore = 50;
};

const resetGame = () => {
  score0.textContent =
    score1.textContent =
    current0.textContent =
    current1.textContent =
      '0';
  name0.textContent = 'Player 1';
  name1.textContent = 'Player 2';
  player0Panel.classList.remove('winner');
  player1Panel.classList.remove('winner');
  player0Panel.classList.remove('active');
  player1Panel.classList.remove('active');
  player0Panel.classList.add('active');
  finalScore.value = '';
  finalScore.disabled = false;
};

const initGame = () => {
  hideDice();
  setInitialState();
  resetGame();
};

// Initiate Game
initGame();

// Set Event Listeners
newGameBtn.addEventListener('click', initGame);

rollBtn.addEventListener('click', () => {
  if (isGameOn) {
    setWinningScore();
    rolled = Math.trunc(Math.random() * 6) + 1;
    showDice(rolled);

    if (rolled === 1 || (rolled === 6 && lastRolled === 6)) changePlayer();
    else accumulateCurrentScore(rolled);
  }
});

holdBtn.addEventListener('click', () => {
  if (isGameOn) {
    setWinningScore();
    accumulateTotalScore();
    hideDice();

    if (scores[activePlayer] >= winningScore) endGame();
    else changePlayer();
  }
});

rulesBtn.addEventListener('click', function () {
  this.classList.toggle('open');
});
