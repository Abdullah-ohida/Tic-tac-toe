const status = document.querySelector(".status");
const gameCells = document.querySelectorAll(".cell");
const restart = document.querySelector(".restart");
const playerX = document.querySelector(".playerX");
const playerO = document.querySelector(".playerO");

let gameActive = true;
let currentPlayer = "X";
let initialScore = 1;

let gameState = ["", "", "", "", "", "", "", "", ""];


const winAlert = () => `Player ${currentPlayer}'s has won!`;
const drawAlert = () => `Game ended is draw!`;
const playerTurn = () => `It's ${currentPlayer}'s turn`;

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

document.addEventListener("DOMContentLoaded", ()=>{
    status.textContent = playerTurn();
    playerX.textContent = 0;
    playerO.textContent = 0;
})

status.textContent = currentPlayer;

function handleCellPlayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  status.textContent = playerTurn();
}

function handleResultValidation() {
  let round = false;

  for (let row = 0; row < winConditions.length; row++) {
    const conditions = winConditions[row];

    let pattern1 = gameState[conditions[0]];
    let pattern2 = gameState[conditions[1]];
    let pattern3 = gameState[conditions[2]];

    if (pattern1 === "" || pattern2 === "" || pattern3 === "") {
      continue;
    }

    if ((pattern1 === pattern2) && (pattern2 === pattern3)) {
      round = true;
      if(currentPlayer === 'X'){
        playerX.textContent = initialScore++;
        }else{
        playerO.textContent = initialScore++;
      }
      break;
    }
  }

  if (round) {
    status.textContent = Swal.fire(`Player ${currentPlayer}'s has won!`);
    gameActive = false;
    status.textContent = winAlert();
    return;
  }

  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    status.textContent = Swal.fire(`Game ended is draw!`);
    gameActive = false;
    status.textContent = drawAlert();
    return;
  }

  handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;

  const clickedCellIndex = parseInt(
    clickedCell.getAttribute("data-cell-index")
  );

  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}

function handleRestartGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  status.textContent = playerTurn();
  gameCells.forEach((cell) => (cell.textContent = ""));
}

gameCells.forEach((cell) => cell.addEventListener("click", handleCellClick));
restart.addEventListener("click", handleRestartGame);




// Score
// Timer
// Levels
// Computer to human
// Alert Box
// Callback Memory
// Reload
