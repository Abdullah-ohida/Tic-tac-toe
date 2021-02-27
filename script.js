const status = document.querySelector(".status");
const gameCells = document.querySelectorAll(".cell");
const restart = document.querySelector(".restart");

let gameActive = true;
let currentPlayer = "X";

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
    status.textContent = playerTurn();4
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
      break;
    }
  }

  if (round) {
    status.textContent = winAlert();
    gameActive = false;
    return;
  }

  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    status.textContent = drawAlert();
    gameActive = false;
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
