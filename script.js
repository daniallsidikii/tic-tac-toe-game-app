// script.js

let gameBoard;
let currentPlayer;
let player1Score = 0;
let player2Score = 0;
let gameActive = false;
let player1Name;
let player2Name;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const startButton = document.getElementById('startButton');
const endButton = document.getElementById('endButton');
const statusMessage = document.getElementById('statusMessage');
const player1ScoreDisplay = document.getElementById('player1Score');
const player2ScoreDisplay = document.getElementById('player2Score');
const player1NameDisplay = document.getElementById('player1Name');
const player2NameDisplay = document.getElementById('player2Name');

const resultModal = document.getElementById('resultModal');
const resultMessage = document.getElementById('resultMessage');
const newGameButton = document.getElementById('newGameButton');

startButton.addEventListener('click', startGame);
endButton.addEventListener('click', endGame);
newGameButton.addEventListener('click', resetBoard);

function startGame() {
    player1Name = document.getElementById('player1').value.trim() || 'Player 1';
    player2Name = document.getElementById('player2').value.trim() || 'Player 2';
    player1NameDisplay.textContent = player1Name;
    player2NameDisplay.textContent = player2Name;

    gameBoard = Array(9).fill('');
    currentPlayer = 'X';
    gameActive = true;
    statusMessage.textContent = `${player1Name}'s Turn (X)`;
    statusMessage.style.display = 'block'; // Ensure status message is visible

    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
        cell.removeEventListener('click', handleCellClick); // Remove existing listeners to prevent duplicates
        cell.addEventListener('click', handleCellClick);
    });

    // Hide modal if it's visible
    resultModal.style.display = 'none';
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const cellIndex = clickedCell.getAttribute('data-index');

    if (gameBoard[cellIndex] !== '' || !gameActive) {
        return;
    }

    gameBoard[cellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    if (checkWin()) {
        gameActive = false;
        updateScore(currentPlayer);
        displayResult(`${currentPlayer === 'X' ? player1Name : player2Name} Wins!`);
    } else if (gameBoard.every(cell => cell !== '')) {
        gameActive = false;
        displayResult('Draw!');
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusMessage.textContent = `${currentPlayer === 'X' ? player1Name : player2Name}'s Turn (${currentPlayer})`;
    }
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => gameBoard[index] === currentPlayer);
    });
}

function updateScore(player) {
    if (player === 'X') {
        player1Score++;
        player1ScoreDisplay.textContent = player1Score;
    } else {
        player2Score++;
        player2ScoreDisplay.textContent = player2Score;
    }
}

function endGame() {
    gameActive = false;
    statusMessage.textContent = 'Game Ended. Start a new game!';
    document.querySelectorAll('.cell').forEach(cell => {
        cell.removeEventListener('click', handleCellClick);
    });
    // Optionally, hide the modal if it's open
    resultModal.style.display = 'none';
}

function displayResult(message) {
    resultMessage.textContent = message;
    resultModal.style.display = 'block';
}

function resetBoard() {
    gameBoard = Array(9).fill('');
    currentPlayer = 'X';
    gameActive = true;
    statusMessage.textContent = `${player1Name}'s Turn (X)`;

    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
    });

    resultModal.style.display = 'none';
}
