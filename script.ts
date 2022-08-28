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

const score = document.querySelector(".score");
const roundMsg = document.querySelector(".round-result-message");

const btnGroup = document.querySelectorAll(".player-btn");
btnGroup.forEach((btn) => btn.addEventListener("click", playRound));

const gameoverDialog = document.querySelector(
  "#gameover-dialog"
) as HTMLDialogElement;

const closeBtn = document.querySelector(".close-btn");
closeBtn?.addEventListener("click", () => {
  gameoverDialog?.close();
});

const playAgainBtn = document.querySelector(".play-again-btn");
playAgainBtn?.addEventListener("click", () => {
  gameoverDialog?.close();
  playAgain();
});

const gameoverMsg = document.querySelector(".gameover-result-message");

function playRound(e: Event) {
  const playerChoice = getPlayerChoice(e) || Choice.ROCK;
  const computerChoice = getComputerChoice();

  if (roundMsg) {
    switch (evaluate(playerChoice, computerChoice)) {
      case Result.WIN: {
        ++wins;
        roundMsg.textContent = `You WIN! ${playerChoice} beats ${computerChoice}.`;
        break;
      }
      case Result.LOSE: {
        ++loses;
        roundMsg.textContent = `You LOSE! ${computerChoice} beats ${playerChoice}.`;
        break;
      }
      case Result.DRAW: {
        roundMsg.textContent = "It's a DRAW!";
        break;
      }
    }
  }

  if (score) {
    updateScore(score, wins, loses);
  }

  if (wins >= 5 || loses >= 5) {
    gameoverDialog?.showModal();
    if (gameoverMsg) {
      if (wins > loses) {
        gameoverMsg.textContent = "You won the match!";
      } else {
        gameoverMsg.textContent = "You lost the match!";
      }
    }

    btnGroup.forEach((btn) => btn.removeEventListener("click", playRound));
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

function playAgain() {
  if (score) {
    score.textContent = "0 - 0";
  }

  wins = 0;
  loses = 0;

  if (roundMsg) {
    roundMsg.innerHTML = "&nbsp;";
  }

  btnGroup.forEach((btn) => btn.addEventListener("click", playRound));
}
