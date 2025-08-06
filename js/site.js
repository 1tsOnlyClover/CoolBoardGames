
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
    
}

// searches the board to find 4 in a row, will return 1 or -1 depending on who won or 0 if there is no winner
function findWinner() { 
    const winTotal = findHorizontalWin() + findVerticalWin() + findDescWin() + findAscWin();
    return winTotal / Math.abs(winTotal);
}

// each of these 4 functions will check if a win in each of these directions exist, and will return 1 -1 or 0 depending on what they find
function findHorizontalWin() {
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            
        }
    }
}

function findVerticalWin() {

}

function findDescWin() {

}

function findAscWin() {

}
