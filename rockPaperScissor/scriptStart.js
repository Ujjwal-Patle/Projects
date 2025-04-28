let playerScore = 0;
let ujjwalScore = 0;
let roundsPlayed = 0;
const maxRounds = 5;

const choices = ["ROCK", "PAPER", "SCISSORS"];

const resultDiv = document.querySelector(".result");
const scoreDivs = document.querySelectorAll(".score p");
const playerImg = document.querySelectorAll(".display img")[0];
const ujjwalImg = document.querySelectorAll(".display img")[1];
const buttons = document.querySelectorAll(".click button");
const resetBtn = document.querySelector(".reset button");

// Random choice for Ujjwal
function getUjjwalChoice() {
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

// Update image based on choice
function updateImages(playerChoice, ujjwalChoice) {
    playerImg.src = `assets/image/${playerChoice.toLowerCase()}.jpg`;
    ujjwalImg.src = `assets/image/${ujjwalChoice.toLowerCase()}.jpg`;
}

// Decide round winner
function getRoundResult(player, ujjwal) {
    if (player === ujjwal) return "It's a Draw!";
    if (
        (player === "ROCK" && ujjwal === "SCISSORS") ||
        (player === "PAPER" && ujjwal === "ROCK") ||
        (player === "SCISSORS" && ujjwal === "PAPER")
    ) {
        playerScore++;
        return "You Win!";
    } else {
        ujjwalScore++;
        return "Ujjwal Wins!";
    }
}

// Update score display
function updateScores() {
    scoreDivs[0].textContent = `PLAYER SCORE : ${playerScore}`;
    scoreDivs[1].textContent = `Ujjwal SCORE : ${ujjwalScore}`;
}

// Handle click event
function handleChoice(e) {
    if (roundsPlayed >= maxRounds) return;

    const playerChoice = e.target.textContent;
    const ujjwalChoice = getUjjwalChoice();

    updateImages(playerChoice, ujjwalChoice);

    const result = getRoundResult(playerChoice, ujjwalChoice);
    resultDiv.textContent = `Round ${roundsPlayed + 1}: ${result}`;

    roundsPlayed++;
    updateScores();

    if (roundsPlayed === maxRounds) {
        let finalResult = "";
        if (playerScore > ujjwalScore) {
            finalResult = "🎉 You won the game!";
        } else if (playerScore < ujjwalScore) {
            finalResult = "😢 Ujjwal won the game!";
        } else {
            finalResult = "🤝 It's a tie game!";
        }

        setTimeout(() => {
            alert(`Game Over!\n${finalResult}`);
        }, 500);
    }
}

// Add listeners to game buttons
buttons.forEach(button => button.addEventListener("click", handleChoice));

// Reset button
resetBtn.addEventListener("click", () => {
    playerScore = 0;
    ujjwalScore = 0;
    roundsPlayed = 0;
    updateScores();
    resultDiv.textContent = "";
    playerImg.src = "assets/image/left.jpg";
    ujjwalImg.src = "assets/image/right.jpg";
});
