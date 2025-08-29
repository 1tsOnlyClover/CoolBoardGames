// square, triangle, circle, hollow square, hollow triangle, hollow circle, straight line, jagged line
// 1, 2, 3, 4
// red, orange, yellow, green, blue, purple, black
// 8 * 4 * 7 = 252

let board;

let displayBoard;

let designMap = {};

let backgroundPatterns = [];


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

    for (let i = 0; i < cardCount; i++) {
        let going = true;
        while (going) {
            designMap[i] = new CardDesign(nextInt(10), nextInt(4) + 1, nextInt(7));
            const values = Object.values(designMap);
            let count = 0;
            for (let j = 0; j < values.length; j++) {
                if (values[j].identity == designMap[i].identity) {
                    count++;
                }
            }
            if (count == 1) {
                going = false;
            }
        }
    }

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

class SoloDesign {
    static draw(xPos, yPos, size, typeIndex, color) {
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = 0;
        switch (typeIndex) {
            case 0:
                this.drawLine(xPos, yPos, size);
                break;
            case 1:
                this.drawJaggedLine(xPos, yPos, size);
                break;
            case 2:
                this.drawSquare(xPos, yPos, size);
                break;
            case 3:
                this.drawTriangle(xPos, yPos, size);
                break;
            case 4:
                this.drawCircle(xPos, yPos, size);
                break;
            case 5:
                this.drawHollowSquare(xPos, yPos, size);
                break;
            case 6:
                this.drawHollowTriangle(xPos, yPos, size);
                break;
            case 7:
                this.drawHollowCircle(xPos, yPos, size);
                break;
            case 8:
                this.drawHollowPentagram(xPos, yPos, size);
                break;
            case 9:
                this.drawPentagram(xPos, yPos, size);
                break;
        }
    }

    static drawLine(xPos, yPos, size) {
        ctx.lineWidth = size / 15;
        ctx.beginPath();
        
        ctx.moveTo(xPos + (size * 0.125), yPos);
        ctx.lineTo(xPos + (size * 0.125),yPos + size);

        ctx.stroke();
    }


    static drawJaggedLine(xPos, yPos, size) {
        ctx.lineWidth = size / 17;
        ctx.beginPath();
        
        ctx.moveTo(xPos, yPos);
        ctx.lineTo(xPos + (size * 0.25), yPos + (size * (1/3)));
        ctx.lineTo(xPos, yPos + (size * (2/3)));
        ctx.lineTo(xPos + (size * 0.25), yPos + size)

        ctx.stroke();
    }

    static drawSquare(xPos, yPos, size) {
        ctx.fillRect(xPos, yPos, size, size);
    }

    static drawTriangle(xPos, yPos, size) {
        ctx.beginPath()

        ctx.moveTo(xPos, yPos + size);
        ctx.lineTo(xPos + (size * 0.5), yPos + (size * (1 - 0.8660254)))
        ctx.lineTo(xPos + size, yPos + size);
        ctx.lineTo(xPos, yPos + size);

        ctx.fill();
        ctx.stroke();
    }

    static drawCircle(xPos, yPos, size) {
        ctx.beginPath()

        ctx.arc(xPos + (size * (1/2)), yPos + (size * (1/2)), size * (1/2), 0, Math.PI * 2);

        ctx.fill();
        ctx.stroke();
    }

    static drawHollowSquare(xPos, yPos, size) {
        ctx.lineWidth = size / 15;
        ctx.beginPath()

        ctx.moveTo(xPos, yPos);
        ctx.lineTo(xPos + size, yPos);
        ctx.lineTo(xPos + size, yPos + size);
        ctx.lineTo(xPos, yPos + size);
        ctx.lineTo(xPos, yPos);
        ctx.lineTo(xPos + size, yPos);

        ctx.stroke();
    }

    static drawHollowTriangle(xPos, yPos, size) {
        ctx.lineWidth = size / 15;
        ctx.beginPath()

        ctx.moveTo(xPos, yPos + size);
        ctx.lineTo(xPos + (size * 0.5), yPos + (size * (1 - 0.8660254)))
        ctx.lineTo(xPos + size, yPos + size);
        ctx.lineTo(xPos, yPos + size);
        ctx.lineTo(xPos + (size * 0.5), yPos + (size * (1 - 0.8660254)))

        ctx.stroke();
    }

    static drawHollowCircle(xPos, yPos, size) {
        ctx.lineWidth = size / 15;
        ctx.beginPath()

        ctx.arc(xPos + (size * (1/2)), yPos + (size * (1/2)), size * (1/2), 0, Math.PI * 2);

        ctx.stroke();
    }

    static drawHollowPentagram(xPos, yPos, size) {
        ctx.lineWidth = size / 15;
        ctx.beginPath();

        ctx.moveTo(xPos + (size * (0.000)), yPos + (size * (0.363)), size);
        ctx.lineTo(xPos + (size * (1.000)), yPos + (size * (0.363)), size);
        ctx.lineTo(xPos + (size * (0.191)), yPos + (size * (0.951)), size);
        ctx.lineTo(xPos + (size * (0.500)), yPos + (size * (0.000)), size);
        ctx.lineTo(xPos + (size * (0.809)), yPos + (size * (0.951)), size);
        ctx.lineTo(xPos + (size * (0.000)), yPos + (size * (0.363)), size);
        ctx.lineTo(xPos + (size * (1.000)), yPos + (size * (0.363)), size);

        ctx.stroke();
    }

    static drawPentagram(xPos, yPos, size) {
        ctx.beginPath();

        ctx.moveTo(xPos + (size * (0.000)), yPos + (size * (0.363)), size); // 1
        ctx.lineTo(xPos + (size * (1.000)), yPos + (size * (0.363)), size); // 3
        ctx.lineTo(xPos + (size * (0.191)), yPos + (size * (0.951)), size); // 5
        ctx.lineTo(xPos + (size * (0.500)), yPos + (size * (0.000)), size); // 2
        ctx.lineTo(xPos + (size * (0.809)), yPos + (size * (0.951)), size); // 4
        ctx.lineTo(xPos + (size * (0.000)), yPos + (size * (0.363)), size); // 1

        ctx.fill();
        ctx.stroke();
    }
}

class CardDesign {
    constructor(designType, designCount, color) {
        this.designType = designType;
        this.designCount = designCount;
        this.color = "";
        switch (color) {
            case 0:
                this.color = "red";
                break;
            case 1:
                this.color = "rgba(255, 136, 0, 1)";
                break;
            case 2:
                this.color = "yellow";
                break;
            case 3:
                this.color = "green";
                break;
            case 4:
                this.color = "blue";
                break;
            case 5:
                this.color = "purple";
                break;
            case 6:
                this.color = "black";
                break;
        }
        this.straigtStack = this.designType <= 1;
        this.identity = designType + "" + designCount + "" + color
    }
    
    draw(xPos,yPos,size) {
        if (this.straigtStack) {
            if (this.designCount == 1) {
                SoloDesign.draw(xPos + (size * (3/8)),yPos + (size * 0.1), size * 0.8, this.designType, this.color);
            } else if (this.designCount == 2) {
                SoloDesign.draw(xPos + (size * (5/16)),yPos + (size * 0.1), size * 0.8, this.designType, this.color);
                SoloDesign.draw(xPos + (size * (7/16)),yPos + (size * 0.1), size * 0.8, this.designType, this.color);
            } else if (this.designCount == 3) {
                SoloDesign.draw(xPos + (size * (2/8)),yPos + (size * 0.1), size * 0.8, this.designType, this.color);
                SoloDesign.draw(xPos + (size * (3/8)),yPos + (size * 0.1), size * 0.8, this.designType, this.color);
                SoloDesign.draw(xPos + (size * (4/8)),yPos + (size * 0.1), size * 0.8, this.designType, this.color);
            } else if (this.designCount == 4) {
                SoloDesign.draw(xPos + (size * (3/16)),yPos + (size * 0.1), size * 0.8, this.designType, this.color);
                SoloDesign.draw(xPos + (size * (5/16)),yPos + (size * 0.1), size * 0.8, this.designType, this.color);
                SoloDesign.draw(xPos + (size * (7/16)),yPos + (size * 0.1), size * 0.8, this.designType, this.color);
                SoloDesign.draw(xPos + (size * (9/16)),yPos + (size * 0.1), size * 0.8, this.designType, this.color);
            }
        } else {
            if (this.designCount == 1) {
                SoloDesign.draw(xPos + (size * 0.15),yPos + (size * 0.15), size * 0.7, this.designType, this.color);
            } else if (this.designCount == 2) {
                SoloDesign.draw(xPos + (size * 0.275),yPos + (size * 0.0), size * 0.45, this.designType, this.color);
                SoloDesign.draw(xPos + (size * 0.275),yPos + (size * 0.55), size * 0.45, this.designType, this.color);
            } else if (this.designCount == 3) {
                SoloDesign.draw(xPos + (size * 0.275),yPos + (size * 0.0), size * 0.45, this.designType, this.color);
                SoloDesign.draw(xPos + (size * 0.0),yPos + (size * 0.55), size * 0.45, this.designType, this.color);
                SoloDesign.draw(xPos + (size * 0.55),yPos + (size * 0.55), size * 0.45, this.designType, this.color);
            } else if (this.designCount == 4) {
                SoloDesign.draw(xPos + (size * 0.0),yPos + (size * 0.0), size * 0.45, this.designType, this.color);
                SoloDesign.draw(xPos + (size * 0.55),yPos + (size * 0.0), size * 0.45, this.designType, this.color);
                SoloDesign.draw(xPos + (size * 0.0),yPos + (size * 0.55), size * 0.45, this.designType, this.color);
                SoloDesign.draw(xPos + (size * 0.55),yPos + (size * 0.55), size * 0.45, this.designType, this.color);
            }
        }
    }
}

function displayCard(xPos, yPos, size, cornRad, id, show, cardType) {
    ctx.fillStyle = (show ? "rgba(190, 189, 189, 1)" : "rgba(252, 185, 14, 1)");
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
        designMap[cardType].draw(xPos + cornRad, yPos + cornRad, size);
        // ctx.fillStyle = "rgba(91, 91, 91, 1)";
        // ctx.font = size * 0.75 + "px Arial";
        // ctx.fillText(cardType, xPos, yPos + size);
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
    displayBackground();
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

const intervalId = setInterval(() => {
    console.log("Event handler running...");
    display();
}, 17);

class backgroundPattern {
    constructor(xPos, yPos, designType) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.designType = designType;
    }

    draw() {
        SoloDesign.draw(this.xPos, this.yPos, 80, this.designType,"rgba(151, 216, 237, 1)")
    }
}



function initPatterns() {
    
}

function displayBackground() {
    for (let i = 0; i < backgroundPatterns.length; i++) {
        backgroundPatterns[i].draw();
        backgroundPatterns[i].yPos += 1.5;
        if (backgroundPatterns[i].yPos > 700) {
            backgroundPatterns.splice(i,1);
        }
    }
    if (nextInt(50) == 0) {
        backgroundPatterns.push(new backgroundPattern(nextInt(850), -80, nextInt(10)));
        console.log("pushed new pattern")
    }
}

initPatterns();