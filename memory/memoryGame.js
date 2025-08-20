// square, triangle, circle, hollow square, hollow triangle, hollow circle, wavy line, straight line
// 1, 2, 3, 4
// red, orange, yellow, green, blue, purple, black
// 8 * 4 * 7 = 224

let board;

let displayBoard;

function printBoard() {
    let str = "";
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            str += (board[row][col] < 0 || board[row][col] >= 10 ? "" : " ") + board[row][col] + " ";
        }
        str += '\n'
    }
    console.log(str);
}

function nextInt(max) {
    return Math.floor(Math.random() * max);
}

function setupBoard(rowSize, colSize) {
    if ((rowSize * colSize) % 2 != 0) {
        throw new Error("rowSize and colSize must multiply to an even number");
    }
    cardCount = (rowSize * colSize) / 2;
    availibleCards = [];
    for (let i = 0; i < cardCount; i++) {
        availibleCards.push(i);
        availibleCards.push(i);
    }
    board = [];
    displayBoard = [];
    for (let rowCount = 0; rowCount < rowSize; rowCount++) {
        board.push([]);
        displayBoard.push([]);
        for (let colCount = 0; colCount < colSize; colCount++) {
            const cardIndex = nextInt(availibleCards.length);
            const card = availibleCards[cardIndex];
            availibleCards.splice(cardIndex,1);
            board[rowCount].push(card);
            displayBoard[rowCount].push(0);
        }
    }
}

let stagedCard1 = -1;
let stagedPos1 = [-1,-1];
let stagedCard2 = -1;
let stagedPos2 = [-1,-1];

function selectCard(rowIndex, colIndex) {
    if (stagedCard2 != -1) {
        return false;
    }
    if (stagedCard1 == -1) {
        stagedCard1 = board[rowIndex][colIndex];
        if (stagedCard1 != -1) {
            stagedPos1 = [rowIndex, colIndex];
            displayBoard[rowIndex][colIndex] = 1;
            return true;
        } else {
            return false;
        }
    } else {
        if (board[rowIndex][colIndex] != -1 && (rowIndex != stagedPos1[0] || colIndex != stagedPos1[1])) {
            stagedCard2 = board[rowIndex][colIndex];
            stagedPos2 = [rowIndex,colIndex];
            displayBoard[rowIndex][colIndex] = 1;
            return true;
        } else {
            return false;
        }
    }
}

function evaluateStagedCards() {
    if (stagedCard1 == stagedCard2) {
        stagedCard1 = -1;
        stagedCard2 = -1;
        board[stagedPos1[0]][stagedPos1[1]] = -1;
        board[stagedPos2[0]][stagedPos2[1]] = -1;
        displayBoard[stagedPos1[0]][stagedPos1[1]] = -1;
        displayBoard[stagedPos2[0]][stagedPos2[1]] = -1;
        stagedPos1 = [-1, -1];
        stagedPos2 = [-1, -1];
    } else {
        stagedCard1 = -1;
        stagedCard2 = -1;
        displayBoard[stagedPos1[0]][stagedPos1[1]] = 0;
        displayBoard[stagedPos2[0]][stagedPos2[1]] = 0;
        stagedPos1 = [-1, -1];
        stagedPos2 = [-1, -1];
    }
}

function getCardsStaged() {
    if (stagedCard1 == -1) {
        return 0;
    } else if (stagedCard2 == -1) {
        return 1;
    } else {
        return 2;
    }
}

let inGame = false;

const memoryCanvas = document.getElementById("memoryCanvas");
const ctx = memoryCanvas.getContext("2d");

class ClickSpace {
    constructor(xLower,yLower,xHigher,yHigher,id) {
        this.xLower = xLower;
        this.yLower = yLower;
        this.xHigher = xHigher;
        this.yHigher = yHigher;
        this.id = id;
    }

    inside(x,y) {
        return (x >= this.xLower && x < this.xHigher && y >= this.yLower && y < this.yHigher);
    }
}

function displayButton(text,fontSize,xPos,yPos,size,id) {
    ctx.fillStyle = "rgba(17, 240, 54, 1)";
    ctx.strokeStyle = "rgba(91, 91, 91, 1)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(xPos - (size * 0.25), yPos);
    ctx.lineTo(xPos + (size * 1),yPos);
    ctx.arc(xPos + (size * 1.25),yPos + (size * 0.25),size * 0.25, Math.PI * 1.5, 0);
    ctx.lineTo(xPos + (size * 1.5), yPos + (size * 1));
    ctx.arc(xPos + (size * 1.25), yPos + (size * 1.25), size * 0.25, Math.PI * 0, Math.PI * 0.5);

    ctx.lineTo(xPos + (size * 0), yPos + (size * 1.5));
    ctx.arc(xPos + (size * -0.25), yPos + (size * 1.25), size * 0.25, Math.PI * 0.5, Math.PI * 1);
    ctx.lineTo(xPos + (size * -0.5), yPos + (size * 0.5));
    ctx.arc(xPos + (size * -0.25), yPos + (size * 0.25), size * 0.25, Math.PI * 1, Math.PI * 1.5);
    ctx.fill();
    ctx.stroke();
    ctx.font = fontSize + "px Arial";
    ctx.fillStyle = "rgba(91, 91, 91, 1)";
    ctx.fillText(text, xPos - (0.25 * size), yPos + size);
    return new ClickSpace(xPos - (0.5 * size), yPos, xPos + (1.6 * size), yPos + (1.6 * size), id);
}

let menuClickSpaces = [];

function displayMenu() {
    menuClickSpaces = [];
    menuClickSpaces.push(displayButton("4x4",40,100,100,50,[4,4]));
    menuClickSpaces.push(displayButton("4x5",40,250,100,50,[4,5]));
    menuClickSpaces.push(displayButton("4x6",40,400,100,50,[4,6]));
    menuClickSpaces.push(displayButton("4x7",40,550,100,50,[4,7]));
    menuClickSpaces.push(displayButton("4x8",40,700,100,50,[4,8]));

    menuClickSpaces.push(displayButton("6x6",40,100,200,50,[6,6]));
    menuClickSpaces.push(displayButton("6x7",40,250,200,50,[6,7]));
    menuClickSpaces.push(displayButton("6x8",40,400,200,50,[6,8]));
    menuClickSpaces.push(displayButton("6x9",40,550,200,50,[6,9]));
    menuClickSpaces.push(displayButton("6x10",35,700,200,50,[6,10]));

    menuClickSpaces.push(displayButton("8x8",40,100,300,50,[8,8]));
    menuClickSpaces.push(displayButton("8x9",40,250,300,50,[8,9]));
    menuClickSpaces.push(displayButton("8x10",35,400,300,50,[8,10]));
    menuClickSpaces.push(displayButton("8x11",35,550,300,50,[8,11]));
    menuClickSpaces.push(displayButton("8x12",35,700,300,50,[8,12]));

    menuClickSpaces.push(displayButton("10x10",30,100,400,50,[10,10]));
    menuClickSpaces.push(displayButton("10x12",30,250,400,50,[10,12]));
    menuClickSpaces.push(displayButton("10x15",30,400,400,50,[10,15]));
    menuClickSpaces.push(displayButton("10x17",30,550,400,50,[10,17]));
    menuClickSpaces.push(displayButton("10x20",30,700,400,50,[10,20]));
}

let gameClickSpaces = [];

function displayCard(xPos, yPos, size, cornRad, id, show, cardType) {
    ctx.fillStyle = (show ? "rgba(228, 228, 228, 1)" : "rgba(252, 185, 14, 1)");
    ctx.strokeStyle = "rgba(91, 91, 91, 1)";
    ctx.lineWidth = 3;
    ctx.beginPath()
    ctx.moveTo(xPos + cornRad, yPos);

    ctx.lineTo(xPos + cornRad + size, yPos);
    ctx.arc(xPos + cornRad + size, yPos + cornRad, cornRad, Math.PI * 1.5, 0);

    ctx.lineTo(xPos + size + cornRad + cornRad, yPos + size + cornRad);
    ctx.arc(xPos + size + cornRad, yPos + size + cornRad, cornRad, Math.PI * 0, Math.PI * 0.5);

    ctx.lineTo(xPos + cornRad, yPos + size + cornRad + cornRad);
    ctx.arc(xPos + cornRad, yPos + size + cornRad, cornRad, Math.PI * 0.5, Math.PI);

    ctx.lineTo(xPos, yPos + cornRad);
    ctx.arc(xPos + cornRad, yPos + cornRad, cornRad, Math.PI, Math.PI * 1.5);

    ctx.fill();
    ctx.stroke();

    if (show) {
        ctx.fillStyle = "rgba(91, 91, 91, 1)";
        ctx.font = size * 0.75 + "px Arial";
        ctx.fillText(cardType, xPos, yPos + size);
    }

    return new ClickSpace(xPos, yPos, xPos + size + cornRad + cornRad, yPos + size + cornRad + cornRad, id);
}

function displayBasicCard(xPos, yPos, size, id, show, cardType) {
    const cardSize = size * 0.8;
    const radSize = size * 0.1;
    return displayCard(xPos, yPos, cardSize, radSize, id, show, cardType);
}

function displayGame() {
    gameClickSpaces = [];
    const rowCount = board.length;   // height
    const colCount = board[0].length;    // width

    const canvasWidth = 900;
    const canvasHeight = 700;

    const heightRatio = (canvasHeight - 40) / rowCount;
    const widthRatio = (canvasWidth - 40) / colCount;

    const division = heightRatio < widthRatio ? heightRatio : widthRatio;

    for (let row = 0; row < board.length; row++) {
        for (let col = 0 ; col < board[row].length; col++) {
            if (displayBoard[row][col] != -1) {
                gameClickSpaces.push(displayBasicCard(20 + (division * col), 20 + (division * row), division * 0.9, [row, col], displayBoard[row][col], board[row][col]));
            }
        }
    }
}

function display() {
    ctx.clearRect(0,0,memoryCanvas.width,memoryCanvas.height);
    ctx.fillStyle = "rgba(19, 164, 212, 1)";
    ctx.fillRect(0,0,memoryCanvas.width,memoryCanvas.height);
    if (inGame) {
        displayGame();
    } else {
        displayMenu();
    }
}

function getCursorPosition(event) {
    const rect = memoryCanvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) * (memoryCanvas.width / rect.width);
    const y = (event.clientY - rect.top) * (memoryCanvas.height / rect.height);
    return { x: x, y: y };
}

function findClickBox(pos, clickBoxes) {
    for (let i = 0; i < clickBoxes.length; i++) {
        if (clickBoxes[i].inside(pos.x, pos.y)) {
            return {index: i, id: clickBoxes[i].id};
        }
    }
    return null;
}

function gameOnClick(event) {
    if (getCardsStaged() >= 2) {
        evaluateStagedCards();
        if (isFinished()) {
            inGame = false;
        }
        return;
    }
    const pos = getCursorPosition(event);
    const clickedThing = findClickBox(pos, gameClickSpaces);
    if (clickedThing != null) {
        selectCard(clickedThing.id[0], clickedThing.id[1]);
    }
}

function menuOnClick(event) {
    const pos = getCursorPosition(event);
    const clickedThing = findClickBox(pos, menuClickSpaces);
    if (clickedThing != null) {
        inGame = true;
        setupBoard(clickedThing.id[0], clickedThing.id[1]);
    }
}

function isFinished() {
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            if (board[row][col] != -1) {
                return false;
            }
        }
    }
    return true;
}

memoryCanvas.addEventListener('click', function(e) {
    if (inGame) {
        gameOnClick(e);
    } else {
        menuOnClick(e);
    }
    display();
});

display();