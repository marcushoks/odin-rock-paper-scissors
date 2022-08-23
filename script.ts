enum Result {
  WIN,
  LOSE,
  DRAW,
}

enum Choice {
  ROCK = "ROCK",
  PAPER = "PAPER",
  SCISSORS = "SCISSORS",
}

let wins = 0;
let loses = 0;

const score = document.querySelector(".score-board");
const message = document.querySelector(".result-message");

const btnGroup = document.querySelectorAll(".player-btn");
btnGroup.forEach((btn) => btn.addEventListener("click", playRound));

function playRound(e: Event) {
  const playerChoice = getPlayerChoice(e) || Choice.ROCK;
  const computerChoice = getComputerChoice();

  if (message) {
    switch (evaluate(playerChoice, computerChoice)) {
      case Result.WIN: {
        ++wins;
        message.textContent = `You WIN! ${playerChoice} beats ${computerChoice}.`;
        break;
      }
      case Result.LOSE: {
        ++loses;
        message.textContent = `You LOSE! ${computerChoice} beats ${playerChoice}.`;
        break;
      }
      case Result.DRAW: {
        message.textContent = "It's a DRAW!";
        break;
      }
    }
  }

  if (score) {
    updateScore(score, wins, loses);
  }
}

function getPlayerChoice(e: Event) {
  const target = e.target as HTMLButtonElement;

  switch (target.id) {
    case "rock":
      return Choice.ROCK;
    case "paper":
      return Choice.PAPER;
    case "scissors":
      return Choice.SCISSORS;
    default:
      console.log("Something went wrong!");
  }
}

function getComputerChoice() {
  const choice = Object.keys(Choice)[Math.floor(Math.random() * 3)];
  console.log(`Computer played ${choice}.`);
  return choice;
}

function evaluate(playerChoice: string, computerChoice: string) {
  if (playerChoice === Choice.ROCK && computerChoice === Choice.SCISSORS)
    return Result.WIN;
  if (playerChoice === Choice.SCISSORS && computerChoice === Choice.PAPER)
    return Result.WIN;
  if (playerChoice === Choice.PAPER && computerChoice === Choice.ROCK)
    return Result.WIN;

  if (computerChoice === Choice.ROCK && playerChoice === Choice.SCISSORS)
    return Result.LOSE;
  if (computerChoice === Choice.SCISSORS && playerChoice === Choice.PAPER)
    return Result.LOSE;
  if (computerChoice === Choice.PAPER && playerChoice === Choice.ROCK)
    return Result.LOSE;

  return Result.DRAW;
}

function updateScore(scoreboard: Element, wins: number, loses: number) {
  scoreboard.textContent = `${wins} - ${loses}`;
}
