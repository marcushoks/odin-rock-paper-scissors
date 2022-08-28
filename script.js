"use strict";
var Result;
(function (Result) {
    Result[Result["WIN"] = 0] = "WIN";
    Result[Result["LOSE"] = 1] = "LOSE";
    Result[Result["DRAW"] = 2] = "DRAW";
})(Result || (Result = {}));
var Choice;
(function (Choice) {
    Choice["ROCK"] = "ROCK";
    Choice["PAPER"] = "PAPER";
    Choice["SCISSORS"] = "SCISSORS";
})(Choice || (Choice = {}));
let wins = 0;
let loses = 0;
const score = document.querySelector(".score");
const playerEmotion = document.querySelector("#player-emotion");
const opponentEmotion = document.querySelector("#opponent-emotion");
const opponentInput = document.querySelector(".opponent-input");
const btnGroup = document.querySelectorAll(".player-btn");
btnGroup.forEach((btn) => btn.addEventListener("click", playRound));
const gameoverDialog = document.querySelector("#gameover-dialog");
const closeBtn = document.querySelector(".close-btn");
closeBtn === null || closeBtn === void 0 ? void 0 : closeBtn.addEventListener("click", () => {
    gameoverDialog === null || gameoverDialog === void 0 ? void 0 : gameoverDialog.close();
});
const playAgainBtn = document.querySelector(".play-again-btn");
playAgainBtn === null || playAgainBtn === void 0 ? void 0 : playAgainBtn.addEventListener("click", () => {
    gameoverDialog === null || gameoverDialog === void 0 ? void 0 : gameoverDialog.close();
    playAgain();
});
const roundMsg = document.querySelector(".round-result-message");
const gameoverMsg = document.querySelector(".gameover-result-message");
function playRound(e) {
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
    const emote = (emotion, point) => {
        switch (point) {
            case 1: {
                emotion.textContent = "😀";
                break;
            }
            case 2: {
                emotion.textContent = "😄";
                break;
            }
            case 3: {
                emotion.textContent = "😁";
                break;
            }
            case 4: {
                emotion.textContent = "😎";
                break;
            }
            case 5: {
                emotion.textContent = "👑";
                break;
            }
        }
    };
    if (playerEmotion && opponentEmotion) {
        emote(playerEmotion, wins);
        emote(opponentEmotion, loses);
    }
    if (score) {
        updateScore(score, wins, loses);
    }
    if (wins >= 5 || loses >= 5) {
        if (wins >= 5 && opponentEmotion) {
            opponentEmotion.textContent = "😭";
        }
        else if (playerEmotion) {
            playerEmotion.textContent = "😭";
        }
        gameoverDialog === null || gameoverDialog === void 0 ? void 0 : gameoverDialog.showModal();
        if (gameoverMsg) {
            if (wins > loses) {
                gameoverMsg.textContent = "You won the match!";
            }
            else {
                gameoverMsg.textContent = "You lost the match!";
            }
        }
        btnGroup.forEach((btn) => btn.removeEventListener("click", playRound));
    }
}
function getPlayerChoice(e) {
    const target = e.target;
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
    if (opponentInput) {
        switch (choice) {
            case Choice.ROCK: {
                opponentInput.textContent = "✊";
                break;
            }
            case Choice.PAPER: {
                opponentInput.textContent = "🖐";
                break;
            }
            case Choice.SCISSORS: {
                opponentInput.textContent = "✌";
                break;
            }
        }
    }
    return choice;
}
function evaluate(playerChoice, computerChoice) {
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
function updateScore(scoreboard, wins, loses) {
    scoreboard.textContent = `${wins} - ${loses}`;
}
function playAgain() {
    if (score) {
        score.textContent = "0 - 0";
    }
    wins = 0;
    loses = 0;
    if (playerEmotion && opponentEmotion) {
        playerEmotion.textContent = "🙂";
        opponentEmotion.textContent = "🙂";
    }
    if (opponentInput) {
        opponentInput.textContent = "";
    }
    if (roundMsg) {
        roundMsg.innerHTML = "&nbsp;";
    }
    btnGroup.forEach((btn) => btn.addEventListener("click", playRound));
}
