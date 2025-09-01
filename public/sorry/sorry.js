const minesweeperCanvas = document.getElementById("game-canvas");
const ctx = minesweeperCanvas.getContext("2d");

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    return { x: x, y: y }
}

let boardSize = 16;
let colClicked = 0;
let rowClicked = 0;
let pos = { x: 0, y: 0 };
let width = minesweeperCanvas.width;
let height = minesweeperCanvas.height;
let firstClick = true;
let deck = new Deck();
let currentPlayer = "#ff0000FF";
let cardDrawn = null;

minesweeperCanvas.addEventListener('click', function(e) {
    pos = getCursorPosition(minesweeperCanvas, e)
    determineCol();
    determineRow();
    console.log("Column clicked: " + colClicked + ", Row clicked: " + rowClicked);
    handleClick(pos);
});

function determineCol() {
    if (pos.x < width/boardSize) {
        colClicked = 0;
    } else if (pos.x < (width/boardSize) * 2) {
        colClicked = 1;
    } else if (pos.x < (width/boardSize) * 3) {
        colClicked = 2;
    } else if (pos.x < (width/boardSize) * 4) {
        colClicked = 3;
    } else if (pos.x < (width/boardSize) * 5) {
        colClicked = 4;
    } else if (pos.x < (width/boardSize) * 6) {
        colClicked = 5;
    } else if (pos.x < (width/boardSize) * 7) {
        colClicked = 6;
    } else if (pos.x < (width/boardSize) * 8) {
        colClicked = 7;
    } else if (pos.x < (width/boardSize) * 9) {
        colClicked = 8;
    } else if (pos.x < (width/boardSize) * 10) {
        colClicked = 9;
    } else if (pos.x < (width/boardSize) * 11) {
        colClicked = 10;
    } else if (pos.x < (width/boardSize) * 12) {
        colClicked = 11;
    } else if (pos.x < (width/boardSize) * 13) {
        colClicked = 12;
    } else if (pos.x < (width/boardSize) * 14) {
        colClicked = 13;
    } else if (pos.x < (width/boardSize) * 15) {
        colClicked = 14;
    }
}

function determineRow() {
    if (pos.y < height/boardSize) {
        rowClicked = 0;
    } else if (pos.y < (height/boardSize) * 2) {
        rowClicked = 1;
    } else if (pos.y < (height/boardSize) * 3) {
        rowClicked = 2;
    } else if (pos.y < (height/boardSize) * 4) {
        rowClicked = 3;
    } else if (pos.y < (height/boardSize) * 5) {
        rowClicked = 4;
    } else if (pos.y < (height/boardSize) * 6) {
        rowClicked = 5;
    } else if (pos.y < (height/boardSize) * 7) {
        rowClicked = 6;
    } else if (pos.y < (height/boardSize) * 8) {
        rowClicked = 7;
    } else if (pos.y < (height/boardSize) * 9) {
        rowClicked = 8;
    } else if (pos.y < (height/boardSize) * 10) {
        rowClicked = 9;
    } else if (pos.y < (height/boardSize) * 11) {
        rowClicked = 10;
    } else if (pos.y < (height/boardSize) * 12) {
        rowClicked = 11;
    } else if (pos.y < (height/boardSize) * 13) {
        rowClicked = 12;
    } else if (pos.y < (height/boardSize) * 14) {
        rowClicked = 13;
    } else if (pos.y < (height/boardSize) * 15) {
        rowClicked = 14;
    }
}

const startLocations = {
    "#ff0000FF": {x: 11, y: 13.5},
    "#73ff00FF": {x: 1.5, y: 11},
    "#0048ffFF": {x: 13.5, y: 4},
    "#fffb00FF": {x: 4, y: 1.5}
};

// "#fffb00FF"

const homeLocations = {
    "#ff0000FF": {x: 13, y: 8.5},
    "#73ff00FF": {x: 6.5, y: 13},
    "#0048ffFF": {x: 8.5, y: 2},
    "#fffb00FF": {x: 2, y: 6.5}
};


const pieceLocations = {
    "#ff0000FF": [startLocations["#ff0000FF"], startLocations["#ff0000FF"], startLocations["#ff0000FF"], startLocations["#ff0000FF"]],
    "#73ff00FF": [startLocations["#73ff00FF"], startLocations["#73ff00FF"], startLocations["#73ff00FF"], startLocations["#73ff00FF"]],
    "#0048ffFF": [startLocations["#0048ffFF"], startLocations["#0048ffFF"], startLocations["#0048ffFF"], startLocations["#0048ffFF"]],
    "#fffb00FF": [startLocations["#fffb00FF"], startLocations["#fffb00FF"], startLocations["#fffb00FF"], startLocations["#fffb00FF"]]
};

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
    drawBoard();
}

function drawBoard() {

    ctx.clearRect(0,0,width,height)
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,width,height);
    ctx.lineWidth = 4;
    for (let row = 0; row < boardSize; row++) {
        drawSquare((width/boardSize * 0), (height/boardSize * row), (width/boardSize), "#ffffffff");
        drawSquare((width/boardSize * 15), (height/boardSize * row), (width/boardSize), "#ffffffff");
    }

    for (let col = 0; col < boardSize; col++) {
        drawSquare((width/boardSize * col), (height/boardSize * 0), (width/boardSize), "#ffffffff");
        drawSquare((width/boardSize * col), (height/boardSize * 15), (width/boardSize), "#ffffffff");
    }

    for (let distance = 1; distance < 5; distance++) {
        if (distance == 4 || distance == 1) {
            drawTriangle((width/boardSize * distance), (height/boardSize * 0), (width/boardSize), "#fffb00FF", "left");
            drawTriangle((width/boardSize * (15 - distance)), (height/boardSize * 15), (width/boardSize), "#ff0000FF", "right");
            drawTriangle((width/boardSize * 0), (height/boardSize * (15 - distance)), (width/boardSize), "#73ff00FF", "up");
            drawTriangle((width/boardSize * 15), (height/boardSize * distance), (width/boardSize), "#0048ffFF", "down");
        } else{
            drawSquare((width/boardSize * distance), (height/boardSize * 0), (width/boardSize), "#fffb00FF");
            drawSquare((width/boardSize * (15 - distance)), (height/boardSize * 15), (width/boardSize), "#ff0000FF");
            drawSquare((width/boardSize * 0), (height/boardSize * (15 - distance)), (width/boardSize), "#73ff00FF");
            drawSquare((width/boardSize * 15), (height/boardSize * distance), (width/boardSize), "#0048ffFF");
        }
    }
    
    
    for (let distance = 9; distance < 14; distance++) {
        if (distance == 13 || distance == 9) {
            drawTriangle((width/boardSize * distance), (height/boardSize * 0), (width/boardSize), "#fffb00FF", "left");
            drawTriangle((width/boardSize * (15 - distance)), (height/boardSize * 15), (width/boardSize), "#ff0000FF", "right");
            drawTriangle((width/boardSize * 0), (height/boardSize * (15 - distance)), (width/boardSize), "#73ff00FF", "up");
            drawTriangle((width/boardSize * 15), (height/boardSize * distance), (width/boardSize), "#0048ffFF", "down");
        } else{
            drawSquare((width/boardSize * distance), (height/boardSize * 0), (width/boardSize), "#fffb00FF");
            drawSquare((width/boardSize * (15 - distance)), (height/boardSize * 15), (width/boardSize), "#ff0000FF");
            drawSquare((width/boardSize * 0), (height/boardSize * (15 - distance)), (width/boardSize), "#73ff00FF");
            drawSquare((width/boardSize * 15), (height/boardSize * distance), (width/boardSize), "#0048ffFF");
        }
    }


    for (let chisel = 1; chisel < 6; chisel++) {
        drawSquare((width/boardSize * chisel), (height/boardSize * 13), (width/boardSize), "#73ff00FF");
        drawSquare((width/boardSize * (15 - chisel)), (height/boardSize * 2), (width/boardSize), "#0048ffFF");
        drawSquare((width/boardSize * 2), (height/boardSize * chisel), (width/boardSize), "#fffb00FF");
        drawSquare((width/boardSize * 13), (height/boardSize * (15 - chisel)), (width/boardSize), "#ff0000FF");
    }

    drawSquare((width/boardSize * 6), (height/boardSize * 12.5), (width/boardSize * 2), "#73ff00FF");
    drawSquare((width/boardSize * 8), (height/boardSize * 1.5), (width/boardSize * 2), "#0048ffFF");
    drawSquare((width/boardSize * 1.5), (height/boardSize * 6), (width/boardSize * 2), "#fffb00FF");
    drawSquare((width/boardSize * 12.5), (height/boardSize * 8), (width/boardSize * 2), "#ff0000FF");
    
    drawSquare((width/boardSize * 1), (height/boardSize * 10.5), (width/boardSize * 2), "#73ff00FF");
    drawSquare((width/boardSize * 13), (height/boardSize * 3.5), (width/boardSize * 2), "#0048ffFF");
    drawSquare((width/boardSize * 3.5), (height/boardSize * 1), (width/boardSize * 2), "#fffb00FF");
    drawSquare((width/boardSize * 10.5), (height/boardSize * 13), (width/boardSize * 2), "#ff0000FF");

    drawCardPile((width/boardSize * 6), (height/boardSize * 9), (height/boardSize * 2), (width/boardSize * 5), "#00cbf9ff", "Draw Pile");
    if (cardDrawn) {
        drawCardPile((width/boardSize * 6), (height/boardSize * 5), (height/boardSize * 2), (width/boardSize * 5), "#00cbf9ff", cardDrawn, deck.special[cardDrawn-1]);
    } else {
        drawCardPile((width/boardSize * 6), (height/boardSize * 5), (height/boardSize * 2), (width/boardSize * 5), "#00cbf9ff", "Discard");
    }

    drawPieces();
}

function drawTriangle(x, y, size, color, direction) {
    ctx.beginPath();
    if (direction === "up") {
        x = x + width/(boardSize*2);
        ctx.moveTo(x, y);
        ctx.lineTo(x + size / 2, y + size);
        ctx.lineTo(x - size / 2, y + size);
    } else if (direction === "down") {
        y = y + width/boardSize;
        x = x + width/(boardSize*2);
        ctx.moveTo(x, y);
        ctx.lineTo(x + size / 2, y - size);
        ctx.lineTo(x - size / 2, y - size);
    } else if (direction === "left") {
        y = y + width/(boardSize*2);
        x = x + width/(boardSize);
        ctx.moveTo(x, y);
        ctx.lineTo(x - size, y + size / 2);
        ctx.lineTo(x - size, y - size / 2);
    } else if (direction === "right") {
        y = y + width/(boardSize*2);
        ctx.moveTo(x, y);
        ctx.lineTo(x + size, y - size / 2);
        ctx.lineTo(x + size, y + size / 2);
    }
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = "#000000ff";
    ctx.stroke();
}

function drawCircle(x, y, radius, color) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = "#000000ff";
    ctx.stroke();
}

function drawSquare(x, y, size, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size);
    ctx.strokeStyle = "#000000ff";
    ctx.strokeRect(x, y, size, size);
}

function drawCardPile(x, y, length, width, color, label1, label2) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, length);
    ctx.strokeStyle = "#000000ff";
    ctx.strokeRect(x, y, width, length);
    ctx.font = "17px Comic Sans MS";
    ctx.fillStyle = currentPlayer;
    if (label1) {
    label1 = label1 + "";
    }
    if (label1 === "13") {
        label1 = "Sorry!";
        ctx.font = "14.5px Comic Sans MS";
    }
    if (label2) {
        label2 = label2 + "";
    }
    console.log(label1, label2);
    if (label2) {
        if (label2.length > 14) {
            //separate label2 into words
            label2 = label2.split(" ");
            let label2Part1 = "";
            let label2Part2 = "";
            for (let i = 0; i < label2.length/2; i++) {
                label2Part1 += " " + label2[i];
            }
            let start = 0;
            if (label2.length % 2 === 1) {
                start = Math.floor(label2.length/2)+1;
            } else {
                start = Math.floor(label2.length/2);
            }
            for (let i = start; i < label2.length; i++) {
                label2Part2 += " " + label2[i];
            }
            ctx.fillText(label1, x + width/2 - (label1.length+1) * 4, y + length/3);
            if (label1 === "Sorry!") {
                ctx.fillText(label2Part1, x + width/2 - (label2Part1.length+1) * 3.5, y + length*4/7);
                ctx.fillText(label2Part2, x + width/2 - (label2Part2.length+1) * 3.5, y + length*5/7 + 20);
            } else {
                ctx.fillText(label2Part1, x + width/2 - (label2Part1.length+1) * 4, y + length*4/7);
                ctx.fillText(label2Part2, x + width/2 - (label2Part2.length+1) * 4, y + length*5/7 + 20);
            }
        } else {
            console.log(label1.length, label2.length);
            ctx.fillText(label1, x + width/2 - (label1.length+1) * 4, y + length/3);
            ctx.fillText(label2, x + width/2 - (label2.length+1) * 4, y + length*5/7);
        }
    } else {
        console.log(label1.length);
        ctx.fillText(label1, x + width/2 - (label1.length+1) * 4, y + length/2);
    }
}

function drawPieces() {
    for (const color in pieceLocations) {
        for (let i = 0; i < pieceLocations[color].length; i++) {
            if (pieceLocations[color][i] == startLocations[color] || pieceLocations[color][i] == homeLocations[color]) {
                let { x, y } = pieceLocations[color][i];
                switch (i) {
                    case 0:
                        x = (x-0.5) * (width / boardSize) + width/(boardSize*2);
                        y = (y-0.5) * (height / boardSize) + height/(boardSize*2);
                        drawCircle(x, y, width / (boardSize*3), color);
                        break;
                    case 1:
                        x = (x+0.5) * (width / boardSize) + width/(boardSize*2);
                        y = (y-0.5) * (height / boardSize) + height/(boardSize*2);
                        drawCircle(x, y, width / (boardSize*3), color);
                        break;
                    case 2:
                        x = (x+0.5) * (width / boardSize) + width/(boardSize*2);
                        y = (y+0.5) * (height / boardSize) + height/(boardSize*2);
                        drawCircle(x, y, width / (boardSize*3), color);
                        break;
                    case 3:
                        x = (x-0.5) * (width / boardSize) + width/(boardSize*2);
                        y = (y+0.5) * (height / boardSize) + height/(boardSize*2);
                        drawCircle(x, y, width / (boardSize*3), color);
                        break;
                }
            } else {
                let { x, y } = pieceLocations[color][i];
                x = x * (width / boardSize) + width/(boardSize*2);
                y = y * (height / boardSize) + height/(boardSize*2);
                drawCircle(x, y, width / (boardSize*3), color);
             }
        }
    }
}

setupBoard(); // initially set up the board


function winDetection() {
}

function handleClick(position) {
    // Check if the click is on the draw pile
    let x = (width/boardSize * 6);
    let y = (height/boardSize * 9);
    let pieceClicked = clickedPiece(position);
    if (!cardDrawn && (position.x > x && position.x < x + (width/boardSize * 5) && position.y > y && position.y < y + (height/boardSize * 2))) {
        drawCard();
        while (!movesPossible()) {
            currentPlayer = nextPlayer(currentPlayer);
            // cardDrawn = null;
            drawCard();
        }
        drawBoard();
        return;
    } else if (pieceClicked) {
        console.log("Clicked on piece: " + pieceClicked.color + " " + pieceClicked.index);
        if (pieceClicked.color === currentPlayer) {
            if (handlePieceMovement(pieceClicked)) {
                let landedOnPiece = checkLandOnPiece(pieceClicked);
                if (landedOnPiece) {
                    if (landedOnPiece.color != pieceClicked.color) {
                        pieceLocations[landedOnPiece.color][landedOnPiece.index] = startLocations[landedOnPiece.color];
                    }
                }
                if (cardDrawn != "2") {
                    currentPlayer = nextPlayer(currentPlayer);
                    cardDrawn = null;
                } else {
                    cardDrawn = null;
                }
            }
        }
    }
    drawBoard();
}

function nextPlayer(currentPlayer) {
    switch (currentPlayer) {
        case "#ff0000FF":
            return "#73ff00FF";
        case "#73ff00FF":
            return "#fffb00FF";
        case "#fffb00FF":
            return "#0048ffFF";
        case "#0048ffFF":
            return "#ff0000FF";
    }
}

function handlePieceMovement(piece, doorway) {
    let enteredDoorway = doorway;
    console.log("Handling movement for piece: " + piece.color + " " + piece.index);
    let tempLocation = { x: 0, y: 0 };
    for (let i = 0; i < pieceLocations[piece.color][piece.index].x; i++) {
        if (pieceLocations[piece.color][piece.index].x == tempLocation.x) {
            break;
        } else {
            tempLocation.x++;
        }
    }
    for (let i = 0; i < pieceLocations[piece.color][piece.index].y; i++) {
        if (pieceLocations[piece.color][piece.index].y == tempLocation.y) {
            break;
        } else {
            tempLocation.y++;
        }
    }
    if (startLocations[piece.color].x == pieceLocations[piece.color][piece.index].x && startLocations[piece.color].y == pieceLocations[piece.color][piece.index].y) {
        console.log("Piece is at its starting position.");
        if (cardDrawn == "1" || cardDrawn == "2") {
            switch (piece.color) {
                case "#ff0000FF":
                    tempLocation = { x: 11, y: 15 };
                    break;
                case "#73ff00FF":
                    tempLocation = { x: 0, y: 11 };
                    break;
                case "#0048ffFF":
                    tempLocation = { x: 15, y: 4 };
                    break;
                case "#fffb00FF":
                    tempLocation = { x: 4, y: 0 };
                    break;
                }
        } else if (cardDrawn == "13") {
            // sorry logic
        } else {
            return false;
        }
    } else if (cardDrawn == "4") {
        for (let move = 0; move < cardDrawn; move++) {
            isSafe = checkIfSafe(piece, tempLocation, cardDrawn - move);
            switch (isSafe) {
                case 14:
                    break;
                case -1:
                    break;
                default:
                    move = isSafe;
            }
            if (tempLocation == { x: 0, y: 0 }) {
                tempLocation.x -= 1;
            } else if (tempLocation == { x: 0, y: 15 }) {
                tempLocation.y += 1;
            } else if (tempLocation == { x: 15, y: 0 }) {
                tempLocation.y -= 1;
            } else if (tempLocation == { x: 15, y: 15 }) {
                tempLocation.x += 1;
            } else {
                switch (tempLocation.x) {
                    case 0:
                        tempLocation.y += 1;
                        break;
                    case 15:
                        tempLocation.y -= 1;
                            break;
                    default:
                        switch (tempLocation.y) {
                            case 0:
                                tempLocation.x -= 1;
                                break;
                            case 15:
                                tempLocation.x += 1;
                                break;
                        }
                        break;
                    }
            }
            if (tempLocation.x > 15) {
                tempLocation.x = 15;
                tempLocation.y -= 1;
            } else if (tempLocation.y > 15) {
                tempLocation.y = 15;
                tempLocation.x += 1;
            } else if (tempLocation.x < 0) {
                tempLocation.x = 0;
                tempLocation.y += 1;
            } else if (tempLocation.y < 0) {
                tempLocation.y = 0;
                tempLocation.x -= 1;
            }
        }
    } else {
        for (let move = 0; move < cardDrawn; move++) {
            if (!enteredDoorway && checkIfEnterDoorway(piece, tempLocation, cardDrawn - move)) {
                enteredDoorway = true;
                switch (piece.color) {
                case "#ff0000FF":
                    tempLocation.y -= 1;
                    break;
                case "#73ff00FF":
                    tempLocation.x += 1;
                    break;
                case "#0048ffFF":
                    tempLocation.x -= 1;
                    break;
                case "#fffb00FF":
                    tempLocation.y += 1;
                    break;
                }
            } else if (checkIfSafe(piece, tempLocation, cardDrawn - move) == 14) {
                break;
            }
            if (tempLocation.x == 0 && tempLocation.y == 0) {
                tempLocation.x += 1;
            } else if (tempLocation.x == 0 && tempLocation.y == 15) {
                tempLocation.y -= 1;
            } else if (tempLocation.x == 15 && tempLocation.y == 0) {
                tempLocation.x += 1;
            } else if (tempLocation.x == 15 && tempLocation.y == 15) {
                tempLocation.x -= 1;
            } else {
                switch (tempLocation.x) {
                    case 0:
                        tempLocation.y -= 1;
                        break;
                    case 15:
                        tempLocation.y += 1;
                        break;
                    default:
                        switch (tempLocation.y) {
                            case 0:
                                tempLocation.x += 1;
                                break;
                            case 15:
                                tempLocation.x -= 1;
                                break;
                        }
                        break;
                }
            }
            if (tempLocation.x > 15) {
                tempLocation.x = 15;
                tempLocation.y += 1;
            } else if (tempLocation.y > 15) {
                tempLocation.y = 15;
                tempLocation.x -= 1;
            } else if (tempLocation.x < 0) {
                tempLocation.x = 0;
                tempLocation.y -= 1;
            } else if (tempLocation.y < 0) {
                tempLocation.y = 0;
                tempLocation.x += 1;
            }
        }
    }
    for (let i = 0; i < pieceLocations[piece.color].length; i++) {
        if (pieceLocations[piece.color][i].x == tempLocation.x && pieceLocations[piece.color][i].y == tempLocation.y) {
            if (!enteredDoorway) {
                return false;
            } else {
                return handlePieceMovement(piece, enteredDoorway);
            }
        }
    }
    pieceLocations[piece.color][piece.index] = tempLocation;
    return true;
}

function checkIfSafe(piece, tempLocation, remainingMoves) {
    switch (piece.color) {
    case "#ff0000FF":
        if (tempLocation.x == 13 && tempLocation.y < 15 && tempLocation.y > 8) {
            if (remainingMoves < tempLocation.y - 8 && cardDrawn != "4") {
                for (let i = 1; i <= remainingMoves; i++) {
                    if (tempLocation.x == 13 && tempLocation.y < 15 && tempLocation.y > 8) {
                        tempLocation.y -= 1;
                    }
                }
            } else if (cardDrawn == "4") {
                for (let i = 4; i >= 0; i--) {
                    if (tempLocation.x == 13 && tempLocation.y < 15 && tempLocation.y > 8) {
                        tempLocation.y += 1;
                    } else {
                        return i;
                    }
                    if (i == 0) {
                        return i;
                    }
                }
            }
            return 14;
        }
        break;
    case "#73ff00FF":
        if (tempLocation.x > 0 && tempLocation.y == 13 && tempLocation.x < 7) {
            if (remainingMoves < 8 - tempLocation.x && cardDrawn != "4") {
                for (let i = 1; i <= remainingMoves; i++) {
                    if (tempLocation.x > 0 && tempLocation.y == 13 && tempLocation.x < 7) {
                        tempLocation.x += 1;
                    }
                }
            } else if (cardDrawn == "4") {
                for (let i = 4; i >= 0; i--) {
                    if (tempLocation.x > 0 && tempLocation.y == 13 && tempLocation.x < 7) {
                        tempLocation.x -= 1;
                    } else {
                        return i;
                    }
                    if (i == 0) {
                        return i;
                    }
                }
            }
            return 14;
        }
        break;
    case "#0048ffFF":
        if (tempLocation.x < 15 && tempLocation.y == 2 && tempLocation.x > 8) {
            if (remainingMoves < tempLocation.x - 8 && cardDrawn != "4") {
                for (let i = 1; i <= remainingMoves; i++) {
                    if (tempLocation.x < 15 && tempLocation.y == 2 && tempLocation.x > 8) {
                        tempLocation.x -= 1;
                    }
                }
            } else if (cardDrawn == "4") {
                for (let i = 4; i >= 0; i--) {
                    if (tempLocation.x < 15 && tempLocation.y == 2 && tempLocation.x > 8) {
                        tempLocation.x += 1;
                    } else {
                        return i;
                    }
                    if (i == 0) {
                        return i;
                    }
                }
            }
            return 14;
        }
        break;
    case "#fffb00FF":
        if (tempLocation.x == 2 && tempLocation.y > 0 && tempLocation.y < 7) {
            if (remainingMoves < 7 - tempLocation.y  && cardDrawn != "4") {
                for (let i = 1; i <= remainingMoves; i++) {
                    if (tempLocation.x == 2 && tempLocation.y > 0 && tempLocation.y < 7) {
                        tempLocation.y += 1;
                    }
                }
            } else if (cardDrawn == "4") {
                for (let i = 4; i >= 0; i--) {
                    if (tempLocation.x == 2 && tempLocation.y > 0 && tempLocation.y < 7) {
                        tempLocation.y -= 1;
                    } else {
                        return i;
                    }
                    if (i == 0) {
                        return i;
                    }
                }
            }
            return 14;
        }
        break;
    }
    return -1;
}

function checkIfSafePossibles(piece, remainingMoves) {
    let tempLocation = pieceLocations[piece.color][piece.index];
    switch (piece.color) {
    case "#ff0000FF":
        if (tempLocation.x == 13 && tempLocation.y < 15 && tempLocation.y > 8 && (remainingMoves < 7 - tempLocation.y || remainingMoves == 4)) {
            return true;
        }
        return false;
    case "#73ff00FF":
        if (tempLocation.x > 0 && tempLocation.y == 13 && tempLocation.x < 7 && (remainingMoves < 8 - tempLocation.x || remainingMoves == 4)) {
            return true;
        }
        return false;
    case "#0048ffFF":
        if (tempLocation.x < 15 && tempLocation.y == 2 && tempLocation.x > 8 && (remainingMoves < tempLocation.x - 8 || remainingMoves == 4)) {
            return true;
        }
        return false;
    case "#fffb00FF":
        if (tempLocation.x == 2 && tempLocation.y > 0 && tempLocation.y < 7 && (remainingMoves < 7 - tempLocation.y || remainingMoves == 4)) {
            return true;
        }
        return false;
    }
}

function checkIfEnterDoorway(piece, tempLocation, remainingMoves) {
    switch (piece.color) {
    case "#ff0000FF":
        if (tempLocation.x == 13 && tempLocation.y == 15 && remainingMoves <= 6) {
            return true;
        }
        break
    case "#73ff00FF":
        if (tempLocation.x == 0 && tempLocation.y == 13 && remainingMoves <= 6) {
            return true;
        }
        break;
    case "#0048ffFF":
        if (tempLocation.x == 15 && tempLocation.y == 2 && remainingMoves <= 6) {
            return true;
        }
        break;
    case "#fffb00FF":
        if (tempLocation.x == 2 && tempLocation.y == 0 && remainingMoves <= 6) {
            return true;
        }
        break;
    }
    return false;
}

function checkLandOnPiece(piece) {
    const { x, y } = pieceLocations[piece.color][piece.index];
    // Check if the piece is landing on another piece
    for (const color in pieceLocations) {
        for (let i = 0; i < pieceLocations[color].length; i++) {
            if (pieceLocations[color][i].x === x && pieceLocations[color][i].y === y && !(color === piece.color && i === piece.index)) {
                return { color, index: i };
            }
        }
    }
    return false;
}

function clickedPiece(position) {
    console.log("Checking for piece click at position: ", position);
    console.log(pieceLocations);
    for (const color in pieceLocations) {
        for (let i = 0; i < pieceLocations[color].length; i++) {
            let { x, y } = pieceLocations[color][i];
            x = x * (width / boardSize) + width/(boardSize*3);
            y = y * (height / boardSize) + height/(boardSize*3);
            if (pieceLocations[color][i] == startLocations[color]) {
                //check start position instead of piece position
                x = startLocations[color].x * (width / boardSize) + width/(boardSize*3);
                y = startLocations[color].y * (height / boardSize) + height/(boardSize*3);
                if (position.x > x - width/(boardSize) && position.x < x + width/(boardSize) && position.y > y - height/(boardSize) && position.y < y + height/(boardSize)) {
                    if (color == currentPlayer) {
                        return { color, index: i };
                    }
                }
            }
            if (position.x > x - width/(boardSize*3) && position.x < x + width/(boardSize*3) && position.y > y - height/(boardSize*3) && position.y < y + height/(boardSize*3)) {
                if (color == currentPlayer) {
                    return { color, index: i };
                }
            }
        }
    }
    return null;
}

function movesPossible() {
    let possible = false;
    for (let i = 0; i < pieceLocations[currentPlayer].length; i++) {
        let xorP1 = (pieceLocations[currentPlayer][i].x != 0 && pieceLocations[currentPlayer][i].x != 15);
        let xorP2 = (pieceLocations[currentPlayer][i].y != 0 && pieceLocations[currentPlayer][i].y != 15);
        const piece = { color: currentPlayer, index: i };
        if (pieceLocations[currentPlayer][i] == startLocations[currentPlayer] && (cardDrawn == "1" || cardDrawn == "2")) {
            possible = true;
            return possible;
        } else if (pieceLocations[currentPlayer][i] != startLocations[currentPlayer] && (((xorP1 && !xorP2) || (!xorP1 && xorP2)))) {
            possible = true;
            return possible;
        } else if (checkIfSafePossibles(piece, cardDrawn)) {
            possible = true;
            return possible;
        }
    }
    return possible;
}

function drawCard() {
    console.log("Clicked on card pile");
    if (!deck.isEmpty()) {
        cardDrawn = deck.drawCard();
        console.log("Drew card: " + cardDrawn);
    } else {
        deck.createDeck();
        cardDrawn = deck.drawCard();
        console.log("Drew card: " + cardDrawn);
    }
}
