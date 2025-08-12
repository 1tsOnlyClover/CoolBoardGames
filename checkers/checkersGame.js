board = [
    [ 0, 1, 0, 1, 0, 1, 0, 1],
    [ 1, 0, 1, 0, 1, 0, 1, 0],
    [ 0, 1, 0, 1, 0, 1, 0, 1],
    [ 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0],
    [-1, 0,-1, 0,-1, 0,-1, 0],
    [ 0,-1, 0,-1, 0,-1, 0,-1],
    [-1, 0,-1, 0,-1, 0,-1, 0]
];

function printBoard() {
    let rowText = "";
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            rowText += (board[row][col] == -1 ? "" : " ") + board[row][col] + " ";
        }
        rowText += "\n";
    }
    console.log(rowText);
}

function resetBoard() {
    board = [
        [ 0, 1, 0, 1, 0, 1, 0, 1],
        [ 1, 0, 1, 0, 1, 0, 1, 0],
        [ 0, 1, 0, 1, 0, 1, 0, 1],
        [ 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0],
        [-1, 0,-1, 0,-1, 0,-1, 0],
        [ 0,-1, 0,-1, 0,-1, 0,-1],
        [-1, 0,-1, 0,-1, 0,-1, 0]
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
            board[this.capturedX][this.capturedY] = 0;
        }
    }

    display() {
        console.log("OriginX: " + this.originX);
        console.log("OriginY: " + this.originY);
        console.log("DestinationX: " + this.destinationX);
        console.log("DestinationY: " + this.destinationY);
    }
}

// 8x8 board

// origin x and y,      then destination x and y
function movePiece(x,y,X,Y) {
    const piece = board[x][y];
    board[x][y] = 0;
    board[X][Y] = piece;

    const type = Math.abs(piece);
    if (type == 1) {
        if (piece == 1) {
            if (X == board.length - 1) {
                board[X][Y] == 2;
            }
        } else if (piece == -1) {
            if (X == 0) {
                board[X][Y] == -2;
            }
        }
    }
}

function getSign(num) {
    return Math.abs(num) / num;
}

function checkMove(originX, originY, sign, shiftY, onlyCapture) {
    try {
        const spaceType = board[originX + sign][originY + shiftY];
        if (spaceType == undefined) {
            return null;
        }
        if ((spaceType == 0) && (!onlyCapture)) {
            return new Move(originX, originY, originX + sign, originY + shiftY, false, -1, -1);
        } else if (getSign(spaceType) == sign * -1) {
            const spaceTypeJump = board[originX + sign + sign][originY + shiftY + shiftY];
            if (spaceTypeJump == undefined) {
                return null;
            }
            if (spaceTypeJump == 0) {
                return new Move(originX, originY, originX + sign + sign, originY + shiftY + shiftY, true, originX + sign, originY + shiftY);
            }
        } else {
            return null;
        }
    } catch {
        return null;
    }
}


function getMoves(originX, originY, onlyCapture) {
    const peice = board[originX][originY];
    const sign = getSign(peice);
    const type = Math.abs(peice);
    let moves = [];

    if (type == 1 || type == 2) {
        const move1 = checkMove(originX, originY, sign, 1, onlyCapture);
        const move2 = checkMove(originX, originY, sign, -1, onlyCapture);
        if (move1 != null) {
            moves.push(move1);
        }
        if (move2 != null) {
            moves.push(move2);
        }
    } 
    if (type == 2) {
        const move3 = checkMove(originX, originY, sign * -1, 1, onlyCapture);
        const move4 = checkMove(originX, originY, sign * -1, -1, onlyCapture);
        if (move3 != null) {
            moves.push(move3);
        }
        if (move4 != null) {
            moves.push(move4);
        }
    }
    return moves
}