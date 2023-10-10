"use strict";

const p0 = document.querySelector(".player--0");
const p0Score = document.getElementById("score--0");
const p0CurrentScore = document.getElementById("current--0");
const p1 = document.querySelector(".player--1");
const p1Score = document.getElementById("score--1");
const p1CurrentScore = document.getElementById("current--1");

const diceImg = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, activePlayer, currentScore, playing;

const inital = function () {
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  playing = true;

  p0Score.textContent = 0;
  p1Score.textContent = 0;
  p1CurrentScore.textContent = 0;
  p0CurrentScore.textContent = 0;

  diceImg.classList.add("hidden");
  p0.classList.add("player--active");
  p1.classList.remove("player--active");
  p0.classList.remove("player--winner");
  p1.classList.remove("player--winner");
};
inital();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;

  p0.classList.toggle("player--active");
  p1.classList.toggle("player--active");
};

btnRoll.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceImg.classList.remove("hidden");
    diceImg.src = `./data/dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 20) {
      playing = false;

      diceImg.classList.add("hidden");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", inital);
