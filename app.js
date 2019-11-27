/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, isGameOn;

initGame();

document.querySelector('.btn-roll').addEventListener('click', function() {
	if (isGameOn) {
		var dice = Math.floor(Math.random() * 6) + 1;
		var diceDOM = document.querySelector('.dice');

		diceDOM.style.display = 'block';
		diceDOM.src = 'dice-' + dice + '.png';

		if (dice !== 1) {
			roundScore += dice;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		} else {
			changePlayer();
		}
	}
});

document.querySelector('.btn-hold').addEventListener('click', function() {
	if (isGameOn) {
		scores[activePlayer] += roundScore;
		document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
		hideDice();

		if (scores[activePlayer] >= 100) {
			endGame();
		} else {
			changePlayer();
		}
	}
});

document.querySelector('.btn-new').addEventListener('click', initGame);

function changePlayer() {
	roundScore = 0;
	document.querySelector('#current-' + activePlayer).textContent = roundScore;
	activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

	document.querySelector('.player-1-panel').classList.toggle('active');
	document.querySelector('.player-0-panel').classList.toggle('active');
}

function endGame() {
	document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
	document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
	document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
	isGameOn = false;
}

function initGame() {
	hideDice();
	setInitialVariables();
	resetHTML();
}

function setInitialVariables() {
	scores = [0, 0];
	roundScore = 0;
	activePlayer = 0;
	isGameOn = true;
}

function hideDice() {
	document.querySelector('.dice').style.display = 'none';
}

function resetHTML() {
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
}
