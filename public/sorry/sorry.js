const minesweeperCanvas = document.getElementById("game-canvas");
const ctx = minesweeperCanvas.getContext("2d");
let turn = 1;

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    return { x: x, y: y }
}

let colClicked = 0;
let rowClicked = 0;
let pos = { x: 0, y: 0 };
let width = minesweeperCanvas.width;
let height = minesweeperCanvas.height;
let firstClick = true;

minesweeperCanvas.addEventListener('click', function(e) {
    pos = getCursorPosition(minesweeperCanvas, e)
    determineCol();
    determineRow();
    console.log("Column clicked: " + colClicked + ", Row clicked: " + rowClicked);
    if (firstClick) {
        firstClick = false;
        do {
            clearBoard();
            newGame();
        } while (board[rowClicked][colClicked] != 0);
        setupBoard();
        handleClick(rowClicked, colClicked);
    } else {
        if (clicksHandled[rowClicked][colClicked] != 1) {
            handleClick(rowClicked, colClicked);
        }
    }
});

function determineCol() {
    if (pos.x < width/15) {
        colClicked = 0;
    } else if (pos.x < (width/15) * 2) {
        colClicked = 1;
    } else if (pos.x < (width/15) * 3) {
        colClicked = 2;
    } else if (pos.x < (width/15) * 4) {
        colClicked = 3;
    } else if (pos.x < (width/15) * 5) {
        colClicked = 4;
    } else if (pos.x < (width/15) * 6) {
        colClicked = 5;
    } else if (pos.x < (width/15) * 7) {
        colClicked = 6;
    } else if (pos.x < (width/15) * 8) {
        colClicked = 7;
    } else if (pos.x < (width/15) * 9) {
        colClicked = 8;
    } else if (pos.x < (width/15) * 10) {
        colClicked = 9;
    } else if (pos.x < (width/15) * 11) {
        colClicked = 10;
    } else if (pos.x < (width/15) * 12) {
        colClicked = 11;
    } else if (pos.x < (width/15) * 13) {
        colClicked = 12;
    } else if (pos.x < (width/15) * 14) {
        colClicked = 13;
    } else if (pos.x < (width/15) * 15) {
        colClicked = 14;
    }
}

function determineRow() {
    if (pos.y < height/15) {
        rowClicked = 0;
    } else if (pos.y < (height/15) * 2) {
        rowClicked = 1;
    } else if (pos.y < (height/15) * 3) {
        rowClicked = 2;
    } else if (pos.y < (height/15) * 4) {
        rowClicked = 3;
    } else if (pos.y < (height/15) * 5) {
        rowClicked = 4;
    } else if (pos.y < (height/15) * 6) {
        rowClicked = 5;
    } else if (pos.y < (height/15) * 7) {
        rowClicked = 6;
    } else if (pos.y < (height/15) * 8) {
        rowClicked = 7;
    } else if (pos.y < (height/15) * 9) {
        rowClicked = 8;
    } else if (pos.y < (height/15) * 10) {
        rowClicked = 9;
    } else if (pos.y < (height/15) * 11) {
        rowClicked = 10;
    } else if (pos.y < (height/15) * 12) {
        rowClicked = 11;
    } else if (pos.y < (height/15) * 13) {
        rowClicked = 12;
    } else if (pos.y < (height/15) * 14) {
        rowClicked = 13;
    } else if (pos.y < (height/15) * 15) {
        rowClicked = 14;
    }
}


const board = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];

// 0 will be an unfilled space and -1 will be a mine
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
    boardText = "";
}


// will clear the board variable that represents the board logically
function clearBoard() {
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board.length; col++) {
            board[row][col] = 0;
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const resetBtn = document.getElementById("reset-button");
    resetBtn.addEventListener("click", function() {
        clearBoard();
        setupBoard();
        firstClick = true;
    });
});

// will clear whatever is currently displayed and will clear the logical board, it will also set up the display 
function setupBoard() {
    ctx.clearRect(0,0,width,height)
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,width,height);
    for (let row = 0; row < board.length; row++) {
        ctx.fillStyle = "#73ff005c";
        ctx.fillRect((width/15 * 0), (height/15 * row), width/15, height/15);
        ctx.fillStyle = "#0048ff5c";
        ctx.fillRect((width/15 * 14), (height/15 * row), width/15, height/15);
        ctx.stroke();
    }

    for (let col = 0; col < board.length; col++) {
        ctx.fillStyle = "#8800ff5c";
        ctx.fillRect((width/15 * col), (height/15 * 0), width/15, height/15);
        ctx.fillStyle = "#ff00005c";
        ctx.fillRect((width/15 * col), (height/15 * 14), width/15, height/15);
        ctx.stroke();
    }

    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board.length; col++) {
            if (row == 0 || row == 14 || col == 0 || col == 14) {
                ctx.beginPath();
                ctx.strokeStyle = "#000000ff";
                ctx.moveTo(width/15 * col, height/15 * row);
                ctx.lineTo((width/15 * col) + (width/15), (height/15 * row));
                ctx.lineTo((width/15 * col) + (width/15), (height/15 * row) + (height/15));
                ctx.lineTo((width/15 * col), (height/15 * row) + (height/15));
                ctx.lineTo((width/15 * col), (height/15 * row));
                ctx.lineWidth = 4;
                ctx.stroke();
            }
        }
    }
    // printBoard();
}

setupBoard(); // initially set up the board
    
function newGame() {
    clearBoard();
    setupBoard();
}

function handleClick(row, col) {
    if (board[row][col] == -1) {
        // boom();
    } else {
        if (board[row][col] != 0) {
            ctx.fillStyle = clearingHex;
            ctx.fillRect((width/16 * col)+2, (height/16 * row)+2, width/16-4, height/16-4);
            fillSpaceNumber(row, col, board[row][col]);
            clicksHandled[row][col] = 1;
        } else {
            if (clicksHandled[row][col] != 1) {
                handleClearings(row, col);
                clicksHandled[row][col] = 1;
            }
        }
    }
    if (winDetection()) {
        ctx.fillStyle = "blue";
        let fontSize = width / 15;
        ctx.font = `${fontSize}px Comics Sans MS`;
        ctx.fillText("You Win!", width / 3, height / 2);
    }
    return;
}

function winDetection() {
    clickCount = 0;
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board.length; col++) {
            if (board[row][col] != -1 && clicksHandled[row][col] == 1) {
                clickCount++;
            }
        }
    }
    return clickCount == (board.length * board.length - 40);
}

function placeNumberBoard(rowIndex,colIndex,number) {
    ctx.fillStyle = "black";
    let fontSize = width/35;
    ctx.font = `${fontSize}px Comics Sans MS`;
    ctx.fillText(number, colIndex * width/16 + width/32, rowIndex * height/16 + height/32);
}