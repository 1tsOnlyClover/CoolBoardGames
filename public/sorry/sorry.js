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
let currentPlayer = 0;
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
    "#ff00005c": {x: 11, y: 13.5},
    "#73ff005c": {x: 1.5, y: 11},
    "#0048ff5c": {x: 13.5, y: 4},
    "#8800ff5c": {x: 4, y: 1.5}
};

const homeLocations = {
    "#ff00005c": {x: 13, y: 8.5},
    "#73ff005c": {x: 6.5, y: 13},
    "#0048ff5c": {x: 8.5, y: 2},
    "#8800ff5c": {x: 2, y: 6.5}
};


const pieceLocations = {
    "#ff00005c": [startLocations["#ff00005c"], startLocations["#ff00005c"], startLocations["#ff00005c"], startLocations["#ff00005c"]],
    "#73ff005c": [startLocations["#73ff005c"], startLocations["#73ff005c"], startLocations["#73ff005c"], startLocations["#73ff005c"]],
    "#0048ff5c": [startLocations["#0048ff5c"], startLocations["#0048ff5c"], startLocations["#0048ff5c"], startLocations["#0048ff5c"]],
    "#8800ff5c": [startLocations["#8800ff5c"], startLocations["#8800ff5c"], startLocations["#8800ff5c"], startLocations["#8800ff5c"]]
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
            drawTriangle((width/boardSize * distance), (height/boardSize * 0), (width/boardSize), "#8800ff5c", "left");
            drawTriangle((width/boardSize * (15 - distance)), (height/boardSize * 15), (width/boardSize), "#ff00005c", "right");
            drawTriangle((width/boardSize * 0), (height/boardSize * (15 - distance)), (width/boardSize), "#73ff005c", "up");
            drawTriangle((width/boardSize * 15), (height/boardSize * distance), (width/boardSize), "#0048ff5c", "down");
        } else{
            drawSquare((width/boardSize * distance), (height/boardSize * 0), (width/boardSize), "#8800ff5c");
            drawSquare((width/boardSize * (15 - distance)), (height/boardSize * 15), (width/boardSize), "#ff00005c");
            drawSquare((width/boardSize * 0), (height/boardSize * (15 - distance)), (width/boardSize), "#73ff005c");
            drawSquare((width/boardSize * 15), (height/boardSize * distance), (width/boardSize), "#0048ff5c");
        }
    }
    
    
    for (let distance = 9; distance < 14; distance++) {
        if (distance == 13 || distance == 9) {
            drawTriangle((width/boardSize * distance), (height/boardSize * 0), (width/boardSize), "#8800ff5c", "left");
            drawTriangle((width/boardSize * (15 - distance)), (height/boardSize * 15), (width/boardSize), "#ff00005c", "right");
            drawTriangle((width/boardSize * 0), (height/boardSize * (15 - distance)), (width/boardSize), "#73ff005c", "up");
            drawTriangle((width/boardSize * 15), (height/boardSize * distance), (width/boardSize), "#0048ff5c", "down");
        } else{
            drawSquare((width/boardSize * distance), (height/boardSize * 0), (width/boardSize), "#8800ff5c");
            drawSquare((width/boardSize * (15 - distance)), (height/boardSize * 15), (width/boardSize), "#ff00005c");
            drawSquare((width/boardSize * 0), (height/boardSize * (15 - distance)), (width/boardSize), "#73ff005c");
            drawSquare((width/boardSize * 15), (height/boardSize * distance), (width/boardSize), "#0048ff5c");
        }
    }


    for (let chisel = 1; chisel < 6; chisel++) {
        drawSquare((width/boardSize * chisel), (height/boardSize * 13), (width/boardSize), "#73ff005c");
        drawSquare((width/boardSize * (15 - chisel)), (height/boardSize * 2), (width/boardSize), "#0048ff5c");
        drawSquare((width/boardSize * 2), (height/boardSize * chisel), (width/boardSize), "#8800ff5c");
        drawSquare((width/boardSize * 13), (height/boardSize * (15 - chisel)), (width/boardSize), "#ff00005c");
    }

    drawSquare((width/boardSize * 6), (height/boardSize * 12.5), (width/boardSize * 2), "#73ff005c");
    drawSquare((width/boardSize * 8), (height/boardSize * 1.5), (width/boardSize * 2), "#0048ff5c");
    drawSquare((width/boardSize * 1.5), (height/boardSize * 6), (width/boardSize * 2), "#8800ff5c");
    drawSquare((width/boardSize * 12.5), (height/boardSize * 8), (width/boardSize * 2), "#ff00005c");
    
    drawSquare((width/boardSize * 1), (height/boardSize * 10.5), (width/boardSize * 2), "#73ff005c");
    drawSquare((width/boardSize * 13), (height/boardSize * 3.5), (width/boardSize * 2), "#0048ff5c");
    drawSquare((width/boardSize * 3.5), (height/boardSize * 1), (width/boardSize * 2), "#8800ff5c");
    drawSquare((width/boardSize * 10.5), (height/boardSize * 13), (width/boardSize * 2), "#ff00005c");

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
    ctx.fillStyle = "black";
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

function placeNumberBoard(rowIndex,colIndex,number) {
    ctx.fillStyle = "black";
    let fontSize = width/35;
    ctx.font = `${fontSize}px Comics Sans MS`;
    ctx.fillText(number, colIndex * width/16 + width/32, rowIndex * height/16 + height/32);
}

function handleClick(position) {
    // Check if the click is on the draw pile
    let x = (width/boardSize * 6);
    let y = (height/boardSize * 9);
    let pieceClicked = clickedPiece(position);
    if (!cardDrawn && (position.x > x && position.x < x + (width/boardSize * 5) && position.y > y && position.y < y + (height/boardSize * 2))) {
        drawCard();
        drawBoard();
        return;
    } else if (pieceClicked) {
        console.log("Clicked on piece: " + pieceClicked.color + " " + pieceClicked.index);
    }
}

function clickedPiece(position) {
    console.log("Checking for piece click at position: ", position);
    console.log(pieceLocations);
    for (const color in pieceLocations) {
        for (let i = 0; i < pieceLocations[color].length; i++) {
            let { x, y } = pieceLocations[color][i];
            x = x * (width / boardSize) + width/(boardSize*3);
            y = y * (height / boardSize) + height/(boardSize*3);
            if (position.x > x - width/(boardSize*3) && position.x < x + width/(boardSize*3) && position.y > y - height/(boardSize*3) && position.y < y + height/(boardSize*3)) {
                return { color, index: i };
            }
        }
    }
    return null;
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
