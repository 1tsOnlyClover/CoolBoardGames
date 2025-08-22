var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");

// Draw the chessboard
function drawBoard() {
    var colors = ["#eee", "#ddd"];
    for (var row = 0; row < 8; row++) {
        for (var col = 0; col < 8; col++) {
            ctx.fillStyle = colors[(row + col) % 2];
            ctx.fillRect(col * 100, row * 100, 100, 100);
        }
    }
}
board = [
    [ 2, 3, 4, 5, 6, 4, 3, 2],
    [ 1, 1, 1, 1, 1, 1, 1, 1],
    [ 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0],
    [-1,-1,-1,-1,-1,-1,-1,-1],
    [-2,-3,-4,-5,-6,-4,-3,-2]
];
function resetBoard() {
    board = [
        [ 2, 3, 4, 5, 6, 4, 3, 2],
        [ 1, 1, 1, 1, 1, 1, 1, 1],
        [ 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0],
        [-1,-1,-1,-1,-1,-1,-1,-1],
        [-2,-3,-4,-5,-6,-4,-3,-2]
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
    canvas.addEventListener('click', (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = Math.floor((e.clientX - rect.left) / tileSize);
      const y = Math.floor((e.clientY - rect.top) / tileSize);
      // Use x,y to select or move pieces
    });
    const piece = board[x][y];
    if (piece == 1 || piece == -1) {
        // Highlight possible moves for pawns
        const moves = getMoves(x, y);
        moves.forEach(move => {
            ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
            ctx.fillRect(move.destinationY * tileSize, move.destinationX * tileSize, tileSize, tileSize);
        });
        canvas.addEventListener('click', (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = Math.floor((e.clientX - rect.left) / tileSize);
            const y = Math.floor((e.clientY - rect.top) / tileSize);
            // Use x,y to select or move pieces
        });
    }else if (piece == 2 || piece == -2) {
        // Highlight possible moves for rooks
        const moves = getMoves(x, y);
        moves.forEach(move => {
            ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
            ctx.fillRect(move.destinationY * tileSize, move.destinationX * tileSize, tileSize, tileSize);
        });
    }else if (piece == 3 || piece == -3) {
        // Highlight possible moves for bishops
        const moves = getMoves(x, y);
        moves.forEach(move => {
            ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
            ctx.fillRect(move.destinationY * tileSize, move.destinationX * tileSize, tileSize, tileSize);
        });
    }else if (piece == 4 || piece == -4) {
        // Highlight possible moves for knights
        const moves = getMoves(x, y);
        moves.forEach(move => {
            ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
            ctx.fillRect(move.destinationY * tileSize, move.destinationX * tileSize, tileSize, tileSize);
        });
    }else if (piece == 5 || piece == -5) {
        // Highlight possible moves for queens
        const moves = getMoves(x, y);
        moves.forEach(move => {
            ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
            ctx.fillRect(move.destinationY * tileSize, move.destinationX * tileSize, tileSize, tileSize);
        });
    }else if (piece == 6 || piece == -6) {
        // Highlight possible moves for kings
        const moves = getMoves(x, y);
        moves.forEach(move => {
            ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
            ctx.fillRect(move.destinationY * tileSize, move.destinationX * tileSize, tileSize, tileSize);
        });
    }
}


drawBoard();