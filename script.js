const board = document.getElementById('board');
const statusDiv = document.getElementById('status');
let cells = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Ngang
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Dọc
    [0, 4, 8], [2, 4, 6]             // Chéo
];

function createBoard() {
    board.innerHTML = '';
    cells.forEach((cell, index) => {
        const cellDiv = document.createElement('div');
        cellDiv.classList.add('cell');
        if (cell === 'X') cellDiv.classList.add('x');
        if (cell === 'O') cellDiv.classList.add('o');
        cellDiv.innerText = cell;
        cellDiv.addEventListener('click', () => handleCellClick(index));
        board.appendChild(cellDiv);
    });
}

function handleCellClick(index) {
    if (cells[index] !== '' || !gameActive) return;

    cells[index] = currentPlayer;
    checkWin();

    if (gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDiv.innerText = `Lượt của: ${currentPlayer}`;
    }
    createBoard();
}

function checkWin() {
    let roundWon = false;
    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDiv.innerText = `Người chơi ${currentPlayer} đã thắng! 🎉`;
        gameActive = false;
        return;
    }

    if (!cells.includes('')) {
        statusDiv.innerText = 'Hòa nhau! 🤝';
        gameActive = false;
        return;
    }
}

function resetGame() {
    cells = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    statusDiv.innerText = `Lượt của: X`;
    createBoard();
}

// Khởi tạo bảng khi load file script
createBoard();