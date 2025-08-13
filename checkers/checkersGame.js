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
            rowText += (board[row][col] < 0 ? "" : " ") + board[row][col] + " ";
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

    if (piece == 1) {
        if (X == board.length - 1) {
            board[X][Y] = 2;
        }
    } else if (piece == -1) {
        if (X == 0) {
            board[X][Y] = -2;
        }
    }
}

function getSign(num) {
    return Math.abs(num) / num;
}

function checkMove(originX, originY, sign, shiftX, shiftY, onlyCapture) {
    try {
        const spaceType = board[originX + shiftX][originY + shiftY];
        if (spaceType == undefined) {
            return null;
        }
        if ((spaceType == 0) && (!onlyCapture)) {
            return new Move(originX, originY, originX + shiftX, originY + shiftY, false, -1, -1);
        } else if (getSign(spaceType) == sign * -1) {
            const spaceTypeJump = board[originX + shiftX + shiftX][originY + shiftY + shiftY];
            if (spaceTypeJump == undefined) {
                return null;
            }
            if (spaceTypeJump == 0) {
                return new Move(originX, originY, originX + shiftX + shiftX, originY + shiftY + shiftY, true, originX + shiftX, originY + shiftY);
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
        const move1 = checkMove(originX, originY, sign, sign,  1, onlyCapture);
        const move2 = checkMove(originX, originY, sign, sign, -1, onlyCapture);
        if (move1 != null) {
            moves.push(move1);
        }
        if (move2 != null) {
            moves.push(move2);
        }
    } 
    if (type == 2) {
        const move3 = checkMove(originX, originY,sign, sign * -1, 1, onlyCapture);
        const move4 = checkMove(originX, originY, sign, sign * -1, -1, onlyCapture);
        if (move3 != null) {
            moves.push(move3);
        }
        if (move4 != null) {
            moves.push(move4);
        }
    }
    return moves;
}