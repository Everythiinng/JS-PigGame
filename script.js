'use strict';

// Selecting elements
// const score0El = document.querySelector('#score--0');
// const score1El = document.getElementById('score--1');
// const current0El = document.getElementById('current--0');
// const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const selectPlayer = player => document.querySelector(`.player--${player}`);
const selectPlayerCurrentScore = player =>
  document.getElementById(`current--${player}`);
const selectPlayerHighScore = player =>
  document.getElementById(`score--${player}`);

// Starting values
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

//   Functions
const switchPlayer = function () {
  selectPlayer(activePlayer).classList.toggle('player--active');
  selectPlayerCurrentScore(activePlayer).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  selectPlayer(activePlayer).classList.toggle('player--active');
};

const init = function () {
  selectPlayer(activePlayer).classList.remove('player--winner');
  selectPlayer(activePlayer).classList.remove('player--active');
  selectPlayerCurrentScore('1').textContent = 0;
  selectPlayerHighScore('1').textContent = 0;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  selectPlayer(activePlayer).classList.add('player--active');
  selectPlayerCurrentScore(activePlayer).textContent = 0;
  selectPlayerHighScore(activePlayer).textContent = 0;
  diceEl.classList.add('hidden');
};
init();

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random diceroll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1: if true
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      selectPlayerCurrentScore(activePlayer).textContent = currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

// Hold functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    selectPlayerHighScore(activePlayer).textContent = scores[activePlayer];

    // 2. Check if player's score is >=100
    if (scores[activePlayer] >= 10) {
      // Finish game
      playing = false;
      selectPlayer(activePlayer).classList.add('player--winner');
      selectPlayer(activePlayer).classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
