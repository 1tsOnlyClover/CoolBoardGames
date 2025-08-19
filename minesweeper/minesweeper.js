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
        clearBoard();
        do {
            newPuzzle();
        } while (board[rowClicked][colClicked] == -1);
        setupBoard();
        handleClick(rowClicked, colClicked);
    } else {
        handleClick(rowClicked, colClicked);
    }
});

minesweeperCanvas.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    pos = getCursorPosition(minesweeperCanvas, e);
    determineCol();
    determineRow();
    console.log("Right-clicked Column: " + colClicked + ", Row: " + rowClicked);
    if (flaggedBoard[rowClicked][colClicked] == 0) {
    flaggedBoard[rowClicked][colClicked] = 1;
    } else {
        flaggedBoard[rowClicked][colClicked] = 0;
    }
    if (flaggedBoard[rowClicked][colClicked] == 1) {
        ctx.fillStyle = "#ffff00";
    } else {
        if((colClicked + rowClicked) % 2 == 0) {
            ctx.fillStyle = "#daefcbff";
        } else {
            ctx.fillStyle = "#b3caa0ff";
        }
    }
    ctx.fillRect((width/16 * colClicked)+2, (height/16 * rowClicked)+2, width/16-4, height/16-4);
});

function determineCol() {
    if (pos.x < width/16) {
        colClicked = 0;
    } else if (pos.x < (width/16) * 2) {
        colClicked = 1;
    } else if (pos.x < (width/16) * 3) {
        colClicked = 2;
    } else if (pos.x < (width/16) * 4) {
        colClicked = 3;
    } else if (pos.x < (width/16) * 5) {
        colClicked = 4;
    } else if (pos.x < (width/16) * 6) {
        colClicked = 5;
    } else if (pos.x < (width/16) * 7) {
        colClicked = 6;
    } else if (pos.x < (width/16) * 8) {
        colClicked = 7;
    } else if (pos.x < (width/16) * 9) {
        colClicked = 8;
    } else if (pos.x < (width/16) * 10) {
        colClicked = 9;
    } else if (pos.x < (width/16) * 11) {
        colClicked = 10;
    } else if (pos.x < (width/16) * 12) {
        colClicked = 11;
    } else if (pos.x < (width/16) * 13) {
        colClicked = 12;
    } else if (pos.x < (width/16) * 14) {
        colClicked = 13;
    } else if (pos.x < (width/16) * 15) {
        colClicked = 14;
    } else if (pos.x < width) {
        colClicked = 15;
    }
}

function determineRow() {
    if (pos.y < height/16) {
        rowClicked = 0;
    } else if (pos.y < (height/16) * 2) {
        rowClicked = 1;
    } else if (pos.y < (height/16) * 3) {
        rowClicked = 2;
    } else if (pos.y < (height/16) * 4) {
        rowClicked = 3;
    } else if (pos.y < (height/16) * 5) {
        rowClicked = 4;
    } else if (pos.y < (height/16) * 6) {
        rowClicked = 5;
    } else if (pos.y < (height/16) * 7) {
        rowClicked = 6;
    } else if (pos.y < (height/16) * 8) {
        rowClicked = 7;
    } else if (pos.y < (height/16) * 9) {
        rowClicked = 8;
    } else if (pos.y < (height/16) * 10) {
        rowClicked = 9;
    } else if (pos.y < (height/16) * 11) {
        rowClicked = 10;
    } else if (pos.y < (height/16) * 12) {
        rowClicked = 11;
    } else if (pos.y < (height/16) * 13) {
        rowClicked = 12;
    } else if (pos.y < (height/16) * 14) {
        rowClicked = 13;
    } else if (pos.y < (height/16) * 15) {
        rowClicked = 14;
    } else if (pos.y < height) {
        rowClicked = 15;
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

const flaggedBoard = [
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
            flaggedBoard[row][col] = 0;
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
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,width,height);
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board.length; col++) {
            if((col + row) % 2 == 0) {
                ctx.fillStyle = "#daefcbff";
            } else if(ctx.fillStyle != "#b3caa0ff") {
                ctx.fillStyle = "#b3caa0ff";
            }
            ctx.fillRect((width/16 * col), (height/16 * row), width/16, height/16);
            ctx.stroke();
        }
    }

    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board.length; col++) {
            ctx.beginPath();
            ctx.strokeStyle = "#440c0cff";
            ctx.moveTo(width/16 * col, height/16 * row);
            ctx.lineTo((width/16 * col) + (width/16), (height/16 * row));
            ctx.lineTo((width/16 * col) + (width/16), (height/16 * row) + (height/16));
            ctx.lineTo((width/16 * col), (height/16 * row) + (height/16));
            ctx.lineTo((width/16 * col), (height/16 * row));
            ctx.lineWidth = 4;
            ctx.stroke();
        }
    }
    printBoard();
}

setupBoard(); // initially set up the board
    
function newPuzzle() {
    for (let i = 0; i < 40; i++) {
        let row = Math.floor(Math.random() * 16);
        let col = Math.floor(Math.random() * 16);
        if (board[row][col] != -1) {
            board[row][col] = -1;
        } else {
            i--;
        }
    }
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board.length; col++) {
            if (board[row][col] != -1) {
                board[row][col] = threeByThree(row, col);
            }
        }
    }
}

function handleClick(row, col) {
    if (board[row][col] == -1) {
        boom();
    } else {
        fillSpaceNumber(row, col, board[row][col]);
    }
}

function boom() {
    // Handle game over
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board.length; col++) {
            if (board[row][col] == -1) {
                ctx.fillStyle = "red";
                ctx.fillRect((width/16 * col)+2, (height/16 * row)+2, width/16-4, height/16-4);
            }
        }
    }
    ctx.fillStyle = "blue";
    let fontSize = width / 15;
    ctx.font = `${fontSize}px Comics Sans MS`;
    ctx.fillText("Game Over", width / 3, height / 2);
}

function placeNumberBoard(rowIndex,colIndex,number) {
    ctx.fillStyle = "black";
    let fontSize = width/35;
    ctx.font = `${fontSize}px Comics Sans MS`;
    ctx.fillText(number, colIndex * width/16 + width/32, rowIndex * height/16 + height/32);
}


function fillSpaceNumber(row, col, number) {
    if (board[row][col] == number) {
        placeNumberBoard(row, col, number);
    }
}



function threeByThree(row, col) {
    let startRow = row - 1;
    let startCol = col - 1;
    let endRow = row + 1;
    let endCol = col + 1;
    let bombCount = 0;
    if (board[row][col] == 1) {
        return 1;
    }
    for (let i = startRow; i <= endRow; i++) {
        if (i < 0) {
            i = 0;
        } else if (i > 15) {
            break;
        }
        for (let j = startCol; j <= endCol; j++) {
            if (j < 0) {
                j = 0;
            } else if (j > 15) {
                break;
            }
            if (board[i][j] == -1 && (i != row || j != col)) {
                bombCount++;
            }
        }
    }
    return bombCount;
}