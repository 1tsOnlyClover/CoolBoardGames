board = [
    [ 0,-1, 0,-1, 0,-1, 0,-1],
    [-1, 0,-1, 0,-1, 0,-1, 0],
    [ 0,-1, 0,-1, 0,-1, 0,-1],
    [ 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0],
    [ 1, 0, 1, 0, 1, 0, 1, 0],
    [ 0, 1, 0, 1, 0, 1, 0, 1],
    [ 1, 0, 1, 0, 1, 0, 1, 0]
];

function resetBoard() {
    board = [
    [ 0,-1, 0,-1, 0,-1, 0,-1],
    [-1, 0,-1, 0,-1, 0,-1, 0],
    [ 0,-1, 0,-1, 0,-1, 0,-1],
    [ 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0],
    [ 1, 0, 1, 0, 1, 0, 1, 0],
    [ 0, 1, 0, 1, 0, 1, 0, 1],
    [ 1, 0, 1, 0, 1, 0, 1, 0]
];
}

class Move {
    constructor(originX,originY,destinationX,destinationY,captured,capturedX,capturedY) {
        this.originX = originX;
        this.originY = originY;
        this.destinationX = destinationX;
        this.destinationY = destinationY;
        this.captured = captured;
        this.capturedX = capturedX;
        this.capturedY = capturedY;
    }

    move() {
        movePiece(this.originX,this.originY,this.destinationX,this.destinationY);
        if (this.captured) {
            board[this.destinationX][this.destinationY] = 0;
        }
    }
}

// 8x8 board

// origin x and y,      then destination x and y
function movePiece(x,y,X,Y) {
    const piece = board[x][y];
    board[x][y] = 0;
    board[X][Y] = piece;
}

function getMoves() {

}