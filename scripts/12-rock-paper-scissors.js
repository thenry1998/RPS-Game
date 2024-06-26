let score = JSON.parse(localStorage.getItem('score')) || {
  Wins: 0,
  Losses: 0,
  Ties: 0
};

updateScoreElement();


/* The is statement is for the null issue.The shortcut is above after the or "||". !score is a shortcut to the score === null
if (score === null) {
score = {
  Wins: 0,
  Losses: 0,
  Ties: 0
};
}
*/

let isAutoPlaying = false;
let intervalId; 


//he doesn't recommend arrow here becasue it's easier to read and it allows hoisting. You can call a function before or after 
function autoPlay() {
  if (!isAutoPlaying) {

    intervalId = setInterval(() => /*(function()*/ {
    const playerMove = pickComputerMove();
    playGame(playerMove);
  }, 2000);
  isAutoPlaying = true; 
 } else { 
  clearInterval(intervalId);
  isAutoPlaying = false;
 }
}

function stopPlay() {
  const buttonElem = document.querySelector('.auto-play');

  if(buttonElem.innerText === 'Auto Play')
  {buttonElem.innerText = 'Stop Play';
  buttonElem.classList.add('Stop Play');
  } else {buttonElem.innerText = 'Auto Play';
  buttonElem.classList.remove('Stop Play');}
}

function resetScore () {
  score.Wins = 0;
  score.Losses = 0;
  score.Ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
};

document.querySelector('.rock-button')
  .addEventListener('click', () => {
  playGame('Rock');
});

document.querySelector('.paper-button'
)
.addEventListener('click', () => {
  playGame('Paper');
});

document.querySelector('.scissors-button')
.addEventListener('click', () => {
  playGame('Scissors');
});

document.querySelector('.reset-score-button').addEventListener('click', () => {
  displayMessage();
});

function displayMessage() {
  const message = document.querySelector('.confirmation-message');
    message.innerHTML = '<p>Are you sure you want to reset the score?</p> <button class="yes-button">Yes</button> <button class="no-button">No</button>'
    
  document.querySelector('.yes-button').addEventListener('click', () => {
  resetScore();
  hideMessage();
  });

  document.querySelector('.no-button').addEventListener('click', () => { hideMessage();
  });  
};

function hideMessage() {
    document.querySelector('.confirmation-message').innerHTML = '';
  };

document.querySelector('.auto-play').addEventListener('click', () => {
  autoPlay(); stopPlay();
})

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('Rock')
  } else if (event.key === 'p') {
    playGame('Paper')
  } else if (event.key === 's') {
    playGame('Scissors')
  } else if (event.key === ' ') {
    autoPlay(); stopPlay();
  } else if (event.key === '0') {
    displayMessage();
  }
})

function playGame(playerMove) {
const computerMove = pickComputerMove();

let result ='';

if (playerMove === 'Scissors') {
if (computerMove === 'Rock') {result = 'You lose!';}
else if (computerMove === 'Paper') {result = 'You win!';}
else if (computerMove === 'Scissors') {result = 'Tie.';}
} 

else if (playerMove === 'Paper') {
if (computerMove === 'Rock') {result = 'You win!';}
else if (computerMove === 'Paper') {result = 'Tie.';}
else if (computerMove === 'Scissors') {result = 'You lose!';}
} 

else if (playerMove === 'Rock') {
if (computerMove === 'Rock') {result = 'Tie.';}
else if (computerMove === 'Paper') {result = 'You lose!';}
else if (computerMove === 'Scissors') {result = 'You win!';}
}

if (result === 'You win!') { score.Wins += 1;} 
else if (result === 'You lose!') {score.Losses += 1;}
else if (result === 'Tie.') {score.Ties += 1};

localStorage.setItem('score', JSON.stringify(score));

updateScoreElement();

document.querySelector('.js-moves')
  .innerHTML =  `Your Move
  <img src="images/${playerMove}.jpg" class="picked-moves">
  <img src="images/${computerMove}.jpg" class="picked-moves">
  Computer`;

document.querySelector('.js-result')
  .innerHTML = result;}

function updateScoreElement (){
document.querySelector('.js-score')
.innerHTML = `Wins: ${score.Wins} | Losses: ${score.Losses} | Ties: ${score.Ties}`;
}


function pickComputerMove(){
const randomNumber = Math.random();

let computerMove ='';

if (randomNumber >= 0 && randomNumber < 1 / 3)
{computerMove = 'Rock';}
else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {computerMove = 'Paper';}
else if (randomNumber >= 2 / 3 && randomNumber < 1) {computerMove = 'Scissors';}

return computerMove;
}
