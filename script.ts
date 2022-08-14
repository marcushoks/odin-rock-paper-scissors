enum Result {
  WIN,
  LOSE,
  DRAW,
}

const getComputerChoice = () => {
  const choices = ["ROCK", "PAPER", "SCISSORS"];
  const choice = choices[Math.floor(Math.random() * 3)];
  console.log(`Computer played ${choice}.`);
  return choice;
};

const getPlayerChoice = (round: number = 1) => {
  while (true) {
    const playerInput = prompt(`Round ${round}\nRock Paper Scissors: `);

    if (playerInput) {
      if (RegExp("rock", "i").test(playerInput)) return "ROCK";
      if (RegExp("paper", "i").test(playerInput)) return "PAPER";
      if (RegExp("scissors", "i").test(playerInput)) return "SCISSORS";
    }

    console.warn("Invalid input, please try again.");
  }
};

const evaluate = (playerChoice: string, computerChoice: string) => {
  if (playerChoice === "ROCK" && computerChoice === "SCISSORS")
    return Result.WIN;
  if (playerChoice === "SCISSORS" && computerChoice === "PAPER")
    return Result.WIN;
  if (playerChoice === "PAPER" && computerChoice === "ROCK")
    return Result.WIN;

  if (computerChoice === "ROCK" && playerChoice === "SCISSORS")
    return Result.LOSE;
  if (computerChoice === "SCISSORS" && playerChoice === "PAPER")
    return Result.LOSE;
  if (computerChoice === "PAPER" && playerChoice === "ROCK")
    return Result.LOSE;

  return Result.DRAW;
};

const game = (rounds: number) => {
  let win = 0;
  let lose = 0;

  for (let i = 1; i <= rounds; i++) {
    console.log(`Round ${i} of ${rounds}. WON ${win} - LOST ${lose}`);

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
  }

  console.log(`FINAL RESULTS: WON ${win} - LOST ${lose}`);
};

game(5);
