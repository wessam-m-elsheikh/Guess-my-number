"use strict";

// select items
const playAgain = document.querySelector(".play-again");
const numberText = document.querySelector(".number");
const checkGuess = document.querySelector(".check-guess");
const inputBox = document.querySelector(".input-box");
const guessCheckText = document.querySelector(".guess");
const scoreNum = document.querySelector(".score span");
const highscoreNum = document.querySelector(".highscore span");
const body = document.querySelector("body");
let score = 20;
let highScore = 0;

// getting the statring width acoording to the current viewport
let boxWidth = numberText.offsetWidth;
// console.log(boxWidth);

// getting the statring font size acoording to the current viewport
let x = window.getComputedStyle(numberText).fontSize; // string of '90px'
// extract the digit from the string to add to it
let numberFontSize = x.match(/\d+/g); // returns ['90']
// console.log(numberFontSize[0]);

// ---------------  GAME LOGIC -----------------

// randomly create a number between 1 - 20
let gameNumber = Math.trunc(Math.random() * 20) + 1;
// console.log(gameNumber);

// ------------FUNCTIONS----------------
function matchGuess() {
  const guess = Number(inputBox.value);
  // conditions to be checked
  if (!guess) {
    guessCheckText.textContent = "⛔ Enter a number.";
  } else if (guess === gameNumber) {
    guessCheckText.textContent = "🎉 Correct Guess!";
    endGame();
  } else if (guess > gameNumber) {
    guessCheckText.textContent = "⬆⬆⬆ Too high!";
    setScore();
  } else if (guess < gameNumber) {
    guessCheckText.textContent = "⬇⬇⬇ Too low!";
    setScore();
  }
}

// decrease the score with every wrong guess
function setScore() {
  if (score > 1) {
    score--;
    scoreNum.textContent = score;
  } else {
    guessCheckText.textContent = "💔 You Lose!";
    scoreNum.textContent = 0;
    endGame();
  }
}

// change numberText with the right number when guessed or game ended
function endGame() {
  // show the correct number
  numberText.textContent = gameNumber;
  // make the number div 2X the size
  numberText.style.width = boxWidth * 1.5 + "px";
  numberText.style.fontSize = numberFontSize[0] * 1.5 + "px";
  //   console.log(numberText.style.fontSize);
  if (guessCheckText.textContent === "🎉 Correct Guess!") {
    // turn the bg green
    body.style.backgroundColor = "green";
    // set highscore
    if (score > highScore) {
      highScore = score;
      highscoreNum.innerHTML = highScore;
    }
  } else if (guessCheckText.textContent === "💔 You Lose!") {
    body.style.backgroundColor = "#990000";
  }
}

// reset the game
function reset() {
  gameNumber = Math.trunc(Math.random() * 20) + 1;
  //   console.log(gameNumber);
  numberText.textContent = "?";
  guessCheckText.textContent = "Start guessing ...";
  body.style.backgroundColor = "#2f024a";
  score = 20;
  scoreNum.textContent = 20;
  numberText.style.width = boxWidth + "px";

  numberText.style.fontSize = numberFontSize[0] + "px";
  inputBox.value = "";
}

// -----------------EVENTLISTENERS-----------------------
// event listener to check the entered number and compare it
const checkGuessEvent = checkGuess.addEventListener("click", matchGuess);
// event listener to reset the game
playAgain.addEventListener("click", reset);
