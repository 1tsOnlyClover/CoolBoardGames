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
    ctx.strokeStyle = "#000";
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

function drawBoard() {
    drawGrid();
    const size = canvas.width / 3;
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const x = col * size + size / 2;
            const y = row * size + size / 2;
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
                ctx.strokeStyle = "blue";
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