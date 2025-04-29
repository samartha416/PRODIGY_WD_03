const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winConditions = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function handleClick(e) {
  const index = e.target.dataset.index;
  if (board[index] !== '' || !isGameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add('taken');

  if (checkWin()) {
    statusText.textContent = `${currentPlayer} wins!`;
    isGameActive = false;
  } else if (board.every(cell => cell !== '')) {
    statusText.textContent = `It's a draw!`;
    isGameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWin() {
  return winConditions.some(condition => {
    return condition.every(index => board[index] === currentPlayer);
  });
}

function restartGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  isGameActive = true;
  statusText.textContent = '';
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
  });
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restartGame);
