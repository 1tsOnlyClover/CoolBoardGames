const connectFourCanvas = document.getElementById("fourCanvas");
const ctx = connectFourCanvas.getContext("2d");
let turn = 1;

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    console.log("x: " + x + " y: " + y)
    return { x: x, y: y }
}

function changeTurn() {
    turn = turn*-1;
}


connectFourCanvas.addEventListener('click', function(e) {
    const pos = getCursorPosition(connectFourCanvas, e)
    console.log("Cursor Position: ", pos)
    console.log(pos.x, pos.y)
    if (pos.x < 100) {
        placePieceBoard(turn, 0);
        console.log("Added token to column 0");
    } else if (pos.x < 200) {
        placePieceBoard(turn, 1);
        console.log("Added token to column 1");
    } else if (pos.x < 300) {
        placePieceBoard(turn, 2);
        console.log("Added token to column 2");
    } else if (pos.x < 400) {
        placePieceBoard(turn, 3);
        console.log("Added token to column 3");
    } else if (pos.x < 500) {
        placePieceBoard(turn, 4);
        console.log("Added token to column 4");
    } else if (pos.x < 600) {
        placePieceBoard(turn, 5);
        console.log("Added token to column 5");
    } else if (pos.x < 700) {
        placePieceBoard(turn, 6);
        console.log("Added token to column 6");
    }
    changeTurn();
    const winner = findWinner();
    console.log("Winner: ", winner);
});


const board = [
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
];
// 0 will be an unfilled space, 1 will be red, -1 will be black
// board[row][colum]

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

// searches the board to find 4 in a row, will return 1 or -1 depending on who won or 0 if there is no winner
function findWinner() { 
    const winTotal = findHorizontalWin() + findVerticalWin() + findDescWin() + findAscWin();
    if (winTotal == 0) {
        return 0;
    }
    return winTotal / Math.abs(winTotal);
}

// each of these 4 functions will check if a win in each of these directions exist, and will return 1 -1 or 0 depending on what they find
function findHorizontalWin() {
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            const tokenType = board[row][col];
            if (tokenType != 0) {
                let tokenCount = 1;
                try {
                    while (true) {
                        if (board[row][col + tokenCount] == tokenType) {
                            tokenCount++;
                            if (tokenCount >= 4) {
                                return tokenType;
                            }
                        } else {
                            break
                        }
                    }
                } catch {}
            }
        }
    }
    return 0;
}

function findVerticalWin() {
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            const tokenType = board[row][col];
            if (tokenType != 0) {
                let tokenCount = 1;
                try {
                    while (true) {
                        if (board[row + tokenCount][col] == tokenType) {
                            tokenCount++;
                            if (tokenCount >= 4) {
                                return tokenType;
                            }
                        } else {
                            break
                        }
                    }
                } catch {}
            }
        }
    }
    return 0;
}

function findDescWin() {
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            const tokenType = board[row][col];
            if (tokenType != 0) {
                let tokenCount = 1;
                try {
                    while (true) {
                        if (board[row - tokenCount][col + tokenCount] == tokenType) {
                            tokenCount++;
                            if (tokenCount >= 4) {
                                return tokenType;
                            }
                        } else {
                            break
                        }
                    }
                } catch {}
            }
        }
    }
    return 0;
}

function findAscWin() {
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            const tokenType = board[row][col];
            if (tokenType != 0) {
                let tokenCount = 1;
                try {
                    while (true) {
                        if (board[row + tokenCount][col + tokenCount] == tokenType) {
                            tokenCount++;
                            if (tokenCount >= 4) {
                                return tokenType;
                            }
                        } else {
                            break
                        }
                    }
                } catch {}
            }
        }
    }
    return 0;
}

// will clear the board variable that represents the board logically
function clearBoard() {
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            board[row][col] = 0;
        }
    }
}





// will clear whatever is currently displayed and will clear the logical board, it will also set up the display 
function setupBoard() {
    clearBoard();
    ctx.clearRect(0,0,connectFourCanvas.width,connectFourCanvas.height)
    ctx.fillStyle = "blue";
    ctx.fillRect(0,0,connectFourCanvas.width,connectFourCanvas.height);
    ctx.fillStyle = "white";
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            ctx.beginPath();
            ctx.arc(50 + (100 * col), 50 + (100 * row), 40, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
        }
    }
}

// will call addToken function to add a peice to the logical board, it will then fill in the correct space on the display for the token, it will return the winning player
function placePieceBoard(type,colIndex) {
    if (findWinner() != 0) {
        setupBoard();
        return findWinner();
    }
    const rowIndex = addToken(type,colIndex);
    if (rowIndex < 0) {
        changeTurn();
        return findWinner();
    }
    ctx.fillStyle = (type == 1 ? "red" : "yellow");
    ctx.beginPath()
    ctx.arc(50 + (colIndex * 100), 50 + (rowIndex * 100), 40, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    return findWinner();
}

setupBoard(); // initially set up the board