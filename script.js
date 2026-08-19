const board = document.getElementById('board');
const statusDiv = document.getElementById('status');
let cells = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X'; // Bạn luôn là X, Máy là O
let gameActive = true;

// Các trường hợp chiến thắng (3 ô thẳng hàng)
const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Hàng ngang
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Hàng dọc
    [0, 4, 8], [2, 4, 6]             // Hàng chéo
];

// Hàm tạo bàn cờ
function createBoard() {
    board.innerHTML = '';
    cells.forEach((cell, index) => {
        const cellDiv = document.createElement('div');
        cellDiv.classList.add('cell');
        if (cell === 'X') cellDiv.classList.add('x');
        if (cell === 'O') cellDiv.classList.add('o');
        cellDiv.innerText = cell;

        // Lắng nghe sự kiện click từ người chơi
        cellDiv.addEventListener('click', () => handleCellClick(index));
        board.appendChild(cellDiv);
    });
}

// Xử lý khi người chơi bấm vào ô
function handleCellClick(index) {
    // Nếu ô đã có người đánh, game đã kết thúc, hoặc ĐANG LÀ LƯỢT CỦA MÁY -> Chặn không cho click
    if (cells[index] !== '' || !gameActive || currentPlayer !== 'X') {
        return;
    }

    // Người chơi (X) đánh
    makeMove(index, 'X');

    // Nếu game chưa kết thúc, chuyển lượt cho Máy (O)
    if (gameActive) {
        currentPlayer = 'O';
        statusDiv.innerText = 'Máy đang suy nghĩ... 🤖';

        // Đợi 0.6 giây rồi máy mới đánh để tạo cảm giác chân thực
        setTimeout(computerMove, 600);
    }
}

// Máy tính (O) tự động đánh ngẫu nhiên
function computerMove() {
    if (!gameActive) return;

    // Tìm tất cả các ô còn trống
    let emptyCells = [];
    for (let i = 0; i < cells.length; i++) {
        if (cells[i] === '') {
            emptyCells.push(i);
        }
    }

    // Nếu còn ô trống, chọn ngẫu nhiên 1 ô
    if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const move = emptyCells[randomIndex];

        // Máy (O) đánh
        makeMove(move, 'O');

        // Nếu game chưa kết thúc, trả lại lượt cho Người (X)
        if (gameActive) {
            currentPlayer = 'X';
            statusDiv.innerText = 'Lượt của: Bạn (X)';
        }
    }
}

// Hàm ghi nhận nước đi và kiểm tra thắng thua
function makeMove(index, player) {
    cells[index] = player;
    createBoard();
    checkWin(player);
}

// Kiểm tra xem có ai thắng hay chưa
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
        if (player === 'X') {
            statusDiv.innerText = 'Bạn đã thắng! 🎉';
        } else {
            statusDiv.innerText = 'Máy đã thắng! 💻';
        }
        gameActive = false;
        return;
    }

    // Kiểm tra hòa (nếu không còn ô trống nào)
    if (!cells.includes('')) {
        statusDiv.innerText = 'Hòa nhau! 🤝';
        gameActive = false;
        return;
    }
}

// Chơi lại từ đầu
function resetGame() {
    cells = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X'; // Trả lại lượt cho bạn đi trước
    gameActive = true;
    statusDiv.innerText = 'Lượt của: Bạn (X)';
    createBoard();
}

// Khởi tạo game lần đầu khi mở web
createBoard();
