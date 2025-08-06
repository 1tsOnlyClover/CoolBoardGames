
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

function addToken(type,colIndex) { // will place a peice of the given type in the given col
    let rowIndex = board.length - 1;
    try {
        while (true) {
            if (board[rowIndex][colIndex] == 0) {
                board[rowIndex][colIndex] = type;
                return;
            }
            rowIndex--;
        }
    } catch {}
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

function clearBoard() {
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            board[row][col] = 0;
        }
    }
}


