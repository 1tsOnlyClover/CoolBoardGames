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

let boardFilling = [
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

let boardPlayer = [
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
    let boardFilled = fillBoard();
    while (!boardFilled) {
        boardFilled = fillBoard();
    }
    printBoard();
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board.length; col++) {
            if (board[row][col] != 0) {
                placeNumberBoard(row, col, board[row][col]);
            }
        }
    }
}

function makePlayerBoard() {
    for (let row = 0; row < boardPlayer.length; row++) {
        for (let col = 0; col < boardPlayer[row].length; col++) {
            boardPlayer[row][col] = board[row][col];
        }
    }
    for (let row = 0; row < boardPlayer.length; row++) {
        for (let col = 0; col < boardPlayer[row].length; col++) {
            if (boardPlayer[row][col] != 0) {
                placeNumberBoard(row, col, boardPlayer[row][col]);
            }
        }
    }
}

function placeNumberBoard(rowIndex,colIndex,number) {
    ctx.fillStyle = "black";
    ctx.font = "50px Comics Sans MS";
    ctx.fillText(number, colIndex * 100 + 35, rowIndex * 100 + 65);
}

setupBoard(); // initially set up the board
    
function newPuzzle() {
    let numGiven = 0;
    for (let i = 0; i < numGiven; i++) {
        let row = Math.floor(Math.random() * 9);
        let col = Math.floor(Math.random() * 9);
        if (boardFilling[row][col] == 0) {
            if (!fillSpace(row, col)) {
                setFillingFromBoard();
                i = 0;
            }
        }
    }
    setBoardFromFilling();
}

function attemptPuzzle() {
    while (true) {
        if (fillBoard()) {
            break;
        }
    }
}

function setBoardFromFilling() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            board[i][j] = boardFilling[i][j];
        }
    }
}

function setFillingFromBoard() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            boardFilling[i][j] = board[i][j];
        }
    }
}

function fillBoard() {
    setFillingFromBoard();
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (boardFilling[i][j] == 0) {
                if (!fillSpace(i, j)) {
                    return false;
                }
            }
        }
    }
    setBoardFromFilling();
    return true;
}

function fillSpace(row, col) {
    let isValid = true;
    let iteration = 0;
    do {
        isValid = true;
        boardFilling[row][col] = Math.floor(Math.random() * 9) + 1;
        for (let i = 0; i < 9; i++) {
            if (i != row) {
                if (boardFilling[i][col] == boardFilling[row][col]) {
                    isValid = false;
                }
            }
        }
        for (let i = 0; i < 9; i++) {
            if (i != col) {
                if (boardFilling[row][i] == boardFilling[row][col]) {
                    isValid = false;
                }
            }
        }
        if (!threeByThree(row, col)) {
            isValid = false;
        }
        iteration++;
        if (iteration > 30) {
            return false;
        }
    } while (!isValid);
    return isValid;
}

function threeByThree(row, col) {
    let nonCoderRow = (row+1);
    let nonCoderCol = (col+1);
    let startRow = 0;
    let startCol = 0;
    startRow = getStartPoint(row, nonCoderRow, startRow);
    startCol = getStartPoint(col, nonCoderCol, startCol);
    let endRow = startRow+2;
    let endCol = startCol+2;
    for (let i = startRow; i <= endRow; i++) {
        for (let j = startCol; j <= endCol; j++) {
            if (boardFilling[i][j] != 0 && (i != row || j != col)) {
                if (boardFilling[i][j] == boardFilling[row][col]) {
                    return false;
                }
            }
        }
    }
    return true;
}

function getStartPoint(col, nonCoder, start) {
    switch (nonCoder%3) {
        case 0:
            start = col-2;
            break;
        case 1:
            start = col;
            break;
        case 2:
            start = col-1;
            break;
        default:
            break;
    }
    return start;
}