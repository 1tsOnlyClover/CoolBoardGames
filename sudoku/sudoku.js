const sudokuCanvas = document.getElementById("game-canvas");
const ctx = sudokuCanvas.getContext("2d");
let turn = 1;

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    console.log("x: " + x + " y: " + y)
    return { x: x, y: y }
}

let colClicked = 0;
let rowClicked = 0;
let pos = { x: 0, y: 0 };

sudokuCanvas.addEventListener('click', function(e) {
    pos = getCursorPosition(sudokuCanvas, e)
    console.log("Cursor Position: ", pos)
    console.log(pos.x, pos.y)
    determineCol();
    determineRow();
    placeNumberBoard(rowClicked, colClicked, Math.floor(Math.random() * 9) + 1);
});

function determineCol() {
    if (pos.x < 100) {
        colClicked = 0;
    } else if (pos.x < 200) {
        colClicked = 1;
    } else if (pos.x < 300) {
        colClicked = 2;
    } else if (pos.x < 400) {
        colClicked = 3;
    } else if (pos.x < 500) {
        colClicked = 4;
    } else if (pos.x < 600) {
        colClicked = 5;
    } else if (pos.x < 700) {
        colClicked = 6;
    } else if (pos.x < 800) {
        colClicked = 7;
    } else if (pos.x < 900) {
        colClicked = 8;
    }
}

function determineRow() {
    if (pos.y < 100) {
        rowClicked = 0;
    } else if (pos.y < 200) {
        rowClicked = 1;
    } else if (pos.y < 300) {
        rowClicked = 2;
    } else if (pos.y < 400) {
        rowClicked = 3;
    } else if (pos.y < 500) {
        rowClicked = 4;
    } else if (pos.y < 600) {
        rowClicked = 5;
    } else if (pos.y < 700) {
        rowClicked = 6;
    } else if (pos.y < 800) {
        rowClicked = 7;
    } else if (pos.y < 900) {
        rowClicked = 8;
    }
}


const board = [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0]
];
// 0 will be an unfilled space
// board[row][column]

function printBoard() { // tool to log the current board state in the console
    let boardText = "";
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            boardText += board[row][col] + " ";
        }
        boardText += '\n';
    }
    console.log(boardText)
}

function addToken(type,colIndex) { // will place a peice of the given type in the given col, will return the row index the peice fell to
    let rowIndex = board.length - 1;
    try {
        while (true) {
            if (board[rowIndex][colIndex] == 0) {
                board[rowIndex][colIndex] = type;
                return rowIndex;
            }
            rowIndex--;
        }
    } catch {}
    return -1;
}

// will clear the board variable that represents the board logically
function clearBoard() {
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board.length; col++) {
            board[row][col] = 0;
        }
    }
}

// will clear whatever is currently displayed and will clear the logical board, it will also set up the display 
function setupBoard() {
    clearBoard();
    ctx.clearRect(0,0,sudokuCanvas.width,sudokuCanvas.height)
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,sudokuCanvas.width,sudokuCanvas.height);
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board.length; col++) {
            if((col + row) % 2 == 0) {
                ctx.fillStyle = "#e0a04bff";
            } else if(ctx.fillStyle != "#7d4f12ff") {
                ctx.fillStyle = "#7d4f12ff";
            }
            ctx.fillRect((100 * col), (100 * row), 100, 100);
            ctx.stroke();
        }
    }
    fillBoard();
    printBoard();
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board.length; col++) {
            if (board[row][col] != 0) {
                placeNumberBoard(row, col, board[row][col]);
            }
        }
    }
}


function placeNumberBoard(rowIndex,colIndex,number) {
    ctx.fillStyle = "black";
    ctx.font = "50px Arial";
    ctx.fillText(number, colIndex * 100 + 35, rowIndex * 100 + 65);
}

setupBoard(); // initially set up the board

function rowValidity(col,number) {
    // will return true if the number is not already in the row
    for (let i = 0; i < board[col].length; i++) {
        if (board[col][i] == number) {
            return false;
        }
    }
    return true;
}

function colValidity(row,number) {
    // will return true if the number is not already in the column
    for (let i = 0; i < board.length; i++) {
        if (board[i][row] == number) {
            return false;
        }
    }
    return true;
}


function fillBoard() {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            let num = 0;
            do {
                num = Math.floor(Math.random() * 9) + 1;
            } while (!rowValidity(row, num) || !colValidity(col, num))
            board[row][col] = num;
        }
    }
}
