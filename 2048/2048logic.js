board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

function nextInt(max) {
    return Math.floor(max * Math.random());
}


function setupBoard() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    let toPlace = 2;
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            const totalIndex = (row * 4) + col;
            const remainingSpaces = 16 - totalIndex;
            const chance = toPlace / remainingSpaces;
            if (Math.random() < chance) {
                board[row][col] = 2;
                toPlace--;
                if (toPlace <= 0) {
                    return;
                }
            }
        }
    }
}

function addSpace() {
    let emptyCount = 0;

    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            if (board[row][col] == 0) {
                emptyCount++;
            }
        }
    }
    if (emptyCount == 0) {
        return;
    }
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[0].length; col++) {
            if (board[row][col] == 0) {
                if (nextInt(emptyCount) == 0) {
                    board[row][col] = Math.random() >= 0.9 ? 4 : 2;
                    return;
                }
                emptyCount--;
            }
        }
    }
}

function shift(direction) {
    let changed = false;
    switch (direction) {
        case 0:
            changed = shiftRight();
            break;
        case 1:
            changed = shiftUp();
            break;
        case 2:
            changed = shiftLeft();
            break;
        case 3:
            changed = shiftDown();
            break;
    }
    if (changed) {
        addSpace();
    }
}

function shiftRight() {
    let madeChange = true;
    let changedBoard = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    let anyChange = false;
    while (madeChange) {
        madeChange = false;
        for (let row = 0; row < board.length; row++) {
            let lastType = -1;
            for (let col = board[row].length - 1; col >= 0; col--) {
                if (board[row][col] != 0) {
                    if (lastType == 0) {
                        board[row][col + 1] = board[row][col];
                        changedBoard[row][col + 1] = changedBoard[row][col]
                        board[row][col] = 0;
                        changedBoard[row][col] = 0
                        madeChange = true;
                    } else if ((lastType == board[row][col]) && ((!changedBoard[row][col]) && (!changedBoard[row][col + 1]))) {
                        board[row][col + 1] = board[row][col] * 2;
                        changedBoard[row][col + 1] = 1
                        board[row][col] = 0;
                        madeChange = true;
                    }
                }
                lastType = board[row][col];
            }
        }
        anyChange = madeChange || anyChange;
    }
    return anyChange;
}

function shiftUp() {
    let madeChange = true;
    let changedBoard = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    let anyChange = false;
    while (madeChange) {
        madeChange = false;
        for (let col = 0; col < board[0].length; col++) {
            let lastType = -1
            for (let row = 0; row < board.length; row++) {
                if (board[row][col] != 0) {
                    if (lastType == 0) {
                        board[row - 1][col] = board[row][col];
                        changedBoard[row - 1][col] = changedBoard[row][col]
                        board[row][col] = 0;
                        changedBoard[row][col] = 0
                        madeChange = true;
                    } else if ((lastType == board[row][col]) && ((!changedBoard[row][col]) && (!changedBoard[row - 1][col]))) {
                        board[row - 1][col] = board[row][col] * 2;
                        changedBoard[row - 1][col] = 1
                        board[row][col] = 0;
                        madeChange = true;
                    }
                }
                lastType = board[row][col];
            }
        }
        anyChange = anyChange || madeChange;
    }
    return anyChange;
}

function shiftLeft() {
    let madeChange = true;
    let changedBoard = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    let anyChange = false;
    while (madeChange) {
        madeChange = false;
        for (let row = 0; row < board.length; row++) {
            let lastType = -1;
            for (let col = 0; col < board.length; col++) {
                if (board[row][col] != 0) {
                    if (lastType == 0) {
                        board[row][col - 1] = board[row][col];
                        changedBoard[row][col - 1] = changedBoard[row][col]
                        board[row][col] = 0;
                        changedBoard[row][col] = 0
                        madeChange = true;
                    } else if ((lastType == board[row][col]) && ((!changedBoard[row][col]) && (!changedBoard[row][col - 1]))) {
                        board[row][col - 1] = board[row][col] * 2;
                        changedBoard[row][col - 1] = 1
                        board[row][col] = 0;
                        madeChange = true;
                    }
                }
                lastType = board[row][col];
            }
        }
        anyChange = anyChange || madeChange;
    }
    return anyChange;
}

function shiftDown() {
    let madeChange = true;
    let changedBoard = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    let anyChange = false;
    while (madeChange) {
        madeChange = false;
        for (let col = 0; col < board[0].length; col++) {
            let lastType = -1
            for (let row = board.length - 1; row >= 0; row--) {
                if (board[row][col] != 0) {
                    if (lastType == 0) {
                        board[row + 1][col] = board[row][col];
                        changedBoard[row + 1][col] = changedBoard[row][col]
                        board[row][col] = 0;
                        changedBoard[row][col] = 0
                        madeChange = true;
                    } else if ((lastType == board[row][col]) && ((!changedBoard[row][col]) && (!changedBoard[row + 1][col]))) {
                        board[row + 1][col] = board[row][col] * 2;
                        changedBoard[row + 1][col] = 1
                        board[row][col] = 0;
                        madeChange = true;
                    }
                }
                lastType = board[row][col];
            }
        }
        anyChange = madeChange || anyChange;
    }
    return anyChange;
}

function checkIfFinished() {
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            if (board[row][col] == 0) {
                return true;
            }
            const type = board[row][col];

            try {
                if (board[row][col + 1] == type) {
                    return true;
                }
            } catch {}

            try {
                if (board[row][col - 1] == type) {
                    return true;
                }
            } catch {}

            try {
                if (board[row + 1][col] == type) {
                    return true;
                }
            } catch {}

            try {
                if (board[row - 1][col] == type) {
                    return true;
                }
            } catch {}
        }
    }
    return false;
}

const gameCanvas = document.getElementById("2048Canvas");
const ctx = gameCanvas.getContext("2d");

let gameOver = false;

function display() {
    ctx.clearRect(0,0,gameCanvas.width, gameCanvas.height);
    ctx.fillStyle = "rgba(19, 164, 212, 1)";
    ctx.fillRect(0,0,gameCanvas.width, gameCanvas.height);
    displayBoard();
    if (gameOver) {
        displayMenu();
    }
}

function displayBoard() {
    const rowInterval = gameCanvas.height / board.length;
    const colInterval = gameCanvas.width / board[0].length;
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            if (board[row][col]) {
                displaySquare((colInterval * col) + (colInterval * 0.1), (rowInterval * row) + (rowInterval * 0.1), rowInterval * 0.8, board[row][col]);
            }
        }
    }
}

function displaySquare(xPos, yPos, size, cardType) {
    const cardSize = size * 0.8;
    const radSize = size * 0.1;
    displayComplex(xPos, yPos, cardSize, radSize, cardType);
}
const colorIndexes = [
    "rgba(255, 0, 0, 1)",
    "rgba(255, 128, 63, 1)",
    "rgba(255, 225, 0, 1)",
    "rgba(128, 225, 0, 1)",
    "rgba(0, 255, 0, 1)",
    "rgba(0, 255, 128, 1)",
    "rgba(0, 255, 255, 1)",
    "rgba(0, 128, 255, 1)",
    "rgba(255, 0, 255, 1)",
    "rgba(255, 0, 128, 1)"
];

function getColor(number) {
    //"rgba(252, 185, 14, 1)"
    const numIndex = Math.log2(number) - 1;
    if (numIndex == 0) {
        return "rgba(209, 209, 209, 1)";
    } else if (numIndex == 1) {
        return "rgba(230, 174, 84, 1)";
    } else {
        return colorIndexes[numIndex % colorIndexes.length];
    }
}

function displayComplex(xPos, yPos, size, cornRad, cardType) {
    ctx.fillStyle = getColor(cardType);
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

    
    const text = cardType.toString();
    if (text.length == 1) {
        ctx.fillStyle = "rgba(91, 91, 91, 1)";
        ctx.font = size * 0.8 + "px Arial";
        ctx.fillText(text, xPos + (size * 0.4), yPos + (size * 0.93));
    } else if (text.length == 2) {
        ctx.fillStyle = "rgba(91, 91, 91, 1)";
        ctx.font = size * 0.75 + "px Arial";
        ctx.fillText(text, xPos + (size * 0.15), yPos + (size * 0.95));
    } else if (text.length == 3) {
        ctx.fillStyle = "rgba(91, 91, 91, 1)";
        ctx.font = size * 0.7 + "px Arial";
        ctx.fillText(text, xPos + (size * 0.0), yPos + (size * 0.91));
    } else if (text.length == 4) {
        ctx.fillStyle = "rgba(91, 91, 91, 1)";
        ctx.font = size * 0.52 + "px Arial";
        ctx.fillText(text, xPos + (size * 0.05), yPos + (size * 0.82));
    }
}


function displayMenu() {
    ctx.fillStyle = "rgba(54, 54, 54, 0.69)";
    ctx.fillRect(0,0,gameCanvas.height, gameCanvas.width);
    
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.font = "50px Arial";
    ctx.fillText("Game Over",100,300);
}

document.addEventListener("keydown", function(event) {
    console.log("Key Pressed: ", event.key);
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        event.preventDefault(); // Stop the page from scrolling
    }
    switch (event.key) {
        case "ArrowRight":
            shift(0);
            break;
        case "ArrowUp":
            shift(1);
            break;
        case "ArrowLeft":
            shift(2);
            break;
        case "ArrowDown":
            shift(3);
            break;
    }
    gameOver = !checkIfFinished();
    display();
});

document.addEventListener("click", () => {
    if (gameOver) {
        gameOver = false;
        setupBoard();
        display();
    }
})

// board[0][0] = 2;
// board[1][0] = 16;
// board[2][0] = 128;
// board[3][0] = 2048;

setupBoard();
display();