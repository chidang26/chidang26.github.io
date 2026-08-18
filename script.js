const board = document.getElementById('board');
const statusDiv = document.getElementById('status');
let cells = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X'; // X là người, O là máy
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
    // Chỉ cho phép click nếu ô trống, game đang chạy, và đang là lượt của người chơi (X)
    if (cells[index] !== '' || !gameActive || currentPlayer !== 'X') return;

    // Lượt của người chơi
    makeMove(index, 'X');

    // Nếu game chưa kết thúc, nhường lượt cho máy (O)
    if (gameActive) {
        statusDiv.innerText = 'Máy đang suy nghĩ... 🤖';
        // Đợi 0.5 giây (500ms) rồi máy mới đánh
        setTimeout(computerMove, 500);
    }
}

function computerMove() {
    if (!gameActive) return;

    // Tìm vị trí các ô còn trống
    let emptyCells = [];
    for (let i = 0; i < cells.length; i++) {
        if (cells[i] === '') {
            emptyCells.push(i);
        }
    }

    // Chọn ngẫu nhiên 1 vị trí trong danh sách các ô trống
    if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const move = emptyCells[randomIndex];

        // Lượt của máy
        makeMove(move, 'O');
    }
}

function makeMove(index, player) {
    cells[index] = player;
    createBoard();
    checkWin(player);

    if (gameActive) {
        currentPlayer = player === 'X' ? 'O' : 'X';
        if (currentPlayer === 'X') {
            statusDiv.innerText = `Lượt của: Bạn (X)`;
        }
    }
}

function checkWin(player) {
    let roundWon = false;
    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDiv.innerText = player === 'X' ? 'Bạn đã thắng! 🎉' : 'Máy đã thắng! 💻';
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
    statusDiv.innerText = `Lượt của: Bạn (X)`;
    createBoard();
}

// Khởi tạo bảng lần đầu tiên
createBoard();
statusDiv.innerText = `Lượt của: Bạn (X)`;