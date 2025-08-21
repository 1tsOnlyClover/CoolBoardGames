const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

// Tic Tac Toe Board
board = [
    [0, 0, 0,],
    [0, 0, 0,],
    [0, 0, 0,]
]

// Printing the board
function printBoard() {
    let rowText = "";
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            rowText += (board[row][col] < 0 ? "" : " ") + board[row][col] + " ";
        }
        rowText += "\n";
    }
    console.log(rowText);
}

function resetBoard() {
    board = [
    [0, 0, 0,],
    [0, 0, 0,],
    [0, 0, 0,]
    ];
    printBoard();
}

// Drawing the Tic Tac Toe grid
function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const size = canvas.width / 3;
    ctx.strokeStyle = "#ffffffff";
    ctx.lineWidth = 2;
    for (let i = 1; i < 3; i++) {
        // Vertical lines
        ctx.beginPath();
        ctx.moveTo(i * size, 0);
        ctx.lineTo(i * size, canvas.height);
        ctx.stroke();
        // Horizontal lines
        ctx.beginPath();
        ctx.moveTo(0, i * size);
        ctx.lineTo(canvas.width, i * size);
        ctx.stroke();
    }
}

// Drawing the Tic Tac Toe board
function drawBoard() {
    drawGrid();
    const size = canvas.width / 3;
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const x = col * size + size / 2;
            const y = row * size + size / 2;
            // Draw the player symbols based on where the 'x' or 'o' is placed
            // on the board 2D array
            if (board[row][col] === 'X') {
                // Draw X
                ctx.strokeStyle = "red";
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(x - size / 4, y - size / 4);
                ctx.lineTo(x + size / 4, y + size / 4);
                ctx.moveTo(x + size / 4, y - size / 4);
                ctx.lineTo(x - size / 4, y + size / 4);
                ctx.stroke();
            } else if (board[row][col] === 'O') {
                // Draw O
                ctx.strokeStyle = "purple";
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(x, y, size / 4, 0, 2 * Math.PI);
                ctx.stroke();
            }
        }
    }
}


// Player symbols
player1 = 'X';
player2 = 'O';

// Placing moves
function placeMove(row, col, player) {
    if (board[row][col] === 0) {
        board[row][col] = player;
        printBoard();
        return true; // action worked
    } else {
        console.log("Spot already taken!");
        return false; // action didn't work
    }
}

// Initial setup
drawBoard();
printBoard();
let gameOver = false;
let firstPlayer = player1;
let currentPlayer = firstPlayer;

// Scoreboard
const scoreBoard = document.getElementById('scoreBoard');
let xScore = 0;
let oScore = 0;
function updateScoreBoard() {
    scoreBoard.textContent = `X: ${xScore} | O: ${oScore}`;
}

// Turn indicator
const turnIndicator = document.getElementById('turnIndicator');
function updateTurnIndicator() {
    if (gameOver) {
        turnIndicator.textContent = '';
    } else {
        turnIndicator.textContent = `Current Turn: ${currentPlayer}`;
    }
}
updateScoreBoard();
updateTurnIndicator();


// Check for a winner or draw
function checkWinner() {
    // Rows, columns, diagonals
    for (let i = 0; i < 3; i++) {
        // Check rows
        if (board[i][0] !== 0 && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
            return board[i][0];
        }
        // Check columns
        if (board[0][i] !== 0 && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
            return board[0][i];
        }
    }
    // Diagonals
    if (board[0][0] !== 0 && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        return board[0][0];
    }
    if (board[0][2] !== 0 && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        return board[0][2];
    }
    // Check for draw
    let isDraw = true;
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            if (board[r][c] === 0) isDraw = false;
        }
    }
    if (isDraw) return 'draw';
    return null;
}

// Reset button Code
const resetBtn = document.getElementById('resetBtn');
if (resetBtn) {
    resetBtn.addEventListener('click', function() {
        resetBoard();
        drawBoard();
        // Alternate who goes first
        firstPlayer = (firstPlayer === player1) ? player2 : player1;
        currentPlayer = firstPlayer;
        gameOver = false;
        updateTurnIndicator();
        updateScoreBoard();
    });
}

// Event listener for canvas click
canvas.addEventListener('click', function(event) {
    if (gameOver) return;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const size = canvas.width / 3;
    const col = Math.floor(x / size);
    const row = Math.floor(y / size);
    if (placeMove(row, col, currentPlayer)) {
        drawBoard();
        const winner = checkWinner();
        if (winner) {
            gameOver = true;
            if (winner === player1) xScore++;
            if (winner === player2) oScore++;
            updateScoreBoard();
            updateTurnIndicator();
            if (winner === 'draw') {
                turnIndicator.textContent = "It's a draw!";
            } else {
                turnIndicator.textContent = winner + " wins!";
            }
        } else {
            currentPlayer = (currentPlayer === player1) ? player2 : player1;
            updateTurnIndicator();
        }
    }
});