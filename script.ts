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

const btnGroup = document.querySelectorAll(".player-btn");
btnGroup.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    console.log(event.target);
  });
});

const getComputerChoice = () => {
  const choice = Object.keys(Choice)[Math.floor(Math.random() * 3)];
  console.log(`Computer played ${choice}.`);
  return choice;
};

const getPlayerChoice = (round: number = 1) => {
  while (true) {
    const playerInput = prompt(`Round ${round}\nRock Paper Scissors: `);

    if (playerInput) {
      if (RegExp("rock", "i").test(playerInput)) return Choice.ROCK;
      if (RegExp("paper", "i").test(playerInput)) return Choice.PAPER;
      if (RegExp("scissors", "i").test(playerInput)) return Choice.SCISSORS;
    }

    console.warn("Invalid input, please try again.");
  }
};

const evaluate = (playerChoice: string, computerChoice: string) => {
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
};

const game = (rounds: number) => {
  let win = 0;
  let lose = 0;

  const playerChoice = getPlayerChoice();
  const computerChoice = getComputerChoice();

  switch (evaluate(playerChoice, computerChoice)) {
    case Result.WIN:
      ++win;
      console.log(`You WIN! ${playerChoice} beats ${computerChoice}.`);
      break;
    case Result.LOSE:
      ++lose;
      console.log(`You LOSE! ${computerChoice} beats ${playerChoice}.`);
      break;
    case Result.DRAW:
      console.log("It's a DRAW!");
      break;
  }
};

// game(5);
