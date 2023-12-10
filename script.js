'use strict';

// Selecting Elements
const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1');
const dice = document.querySelector('.dice');
const currentScoreElement = document.querySelector('.current-score');

// Starting conditions
score0.textContent = 0;
score1.textContent = 0;
dice.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

// Rolling the dice.

document.querySelector('.btn--roll').addEventListener('click', function () {
  if (playing) {
    // Random Number
    let randomDiceRoll = Math.trunc(Math.random() * 6 + 1);
    dice.classList.remove('hidden');

    // Changing Image
    const imagePath = `dice-${randomDiceRoll}.png`;
    document.querySelector('.dice').src = imagePath;

    if (randomDiceRoll !== 1) {
      currentScore += randomDiceRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;
      currentScore = 0;

      document.querySelector('.player--0').classList.toggle('player--active');
      document.querySelector('.player--1').classList.toggle('player--active');
    }
  }
});

document.querySelector('.btn--hold').addEventListener('click', function () {
  if (playing) {
    // Add current score to total score
    scores[activePlayer] = scores[activePlayer] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check if current score is >= 100
    if (scores[activePlayer] >= 20) {
      dice.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      playing = false;
    } else {
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;
      currentScore = 0;
      // Switch player
      document.querySelector('.player--0').classList.toggle('player--active');
      document.querySelector('.player--1').classList.toggle('player--active');
    }
  }
});

document.querySelector('.btn--new').addEventListener('click', function () {
  if (activePlayer === 0 || activePlayer === 1) {
    activePlayer = 0;
    currentScore = 0;
    playing = true;
    score0.textContent = 0;
    score1.textContent = 0;
    dice.classList.add('hidden');
    document.querySelector(`.player--0`).classList.remove('player--winner');
    document.querySelector(`.player--1`).classList.remove('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--active');
    document.getElementById(`current--0`).textContent = currentScore;
    document.getElementById(`current--1`).textContent = currentScore;
  }
});
