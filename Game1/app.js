const computerChoice = document.getElementById('computer-choice');
const userChoice = document.getElementById('your-choice');
const result = document.getElementById('result');
const scoreBoard = document.getElementById('scoreBoard');
const resetButton = document.getElementById('reset');
const possibleChoices = document.querySelectorAll('.button');
let userChoices;
let computerChoices;
let userScore = 0;
let computerScore = 0;
const choices = ['rock','papper','scissor'];
possibleChoices.forEach((choice) =>
  choice.addEventListener('click', (e) => {
    if (e.target.id !== 'reset') { 
      userChoices = e.target.id;
      userChoice.innerText = userChoices;
      generateComputerChoice();
      getResult();
      updateScoreboard();
    }
  })
);
function generateComputerChoice() {
  const randomIndex = Math.floor(Math.random() * choices.length);
  computerChoices = choices[randomIndex];
  computerChoice.innerText = computerChoices;
}
function getResult() {
  if (computerChoices === userChoices) {
    result.innerText = "It's a Draw!";
  } else if (
    (computerChoices === 'rock' && userChoices === 'papper') ||
    (computerChoices === 'papper' && userChoices === 'scissor') ||
    (computerChoices === 'scissor' && userChoices === 'rock')
  ) {
    result.innerText = 'You Win!';
    userScore++;
  } else {
    result.innerText = 'You Lose!';
    computerScore++;
  }
}
function updateScoreboard() {
  scoreBoard.innerText = `Player: ${userScore} | Computer: ${computerScore}`;
}
resetButton.addEventListener('click', () => {
  userScore = 0;
  computerScore = 0;
  userChoice.innerText = '';
  computerChoice.innerText = '';
  result.innerText = '';
  updateScoreboard();
});
updateScoreboard();
