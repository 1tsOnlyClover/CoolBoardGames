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

function printBoard() {
    let boardText = "";
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            boardText += board[row][col] + " ";
        }
        boardText += '\n';
    }
    console.log(boardText)
}

function addToken(type) {
    
}
