const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

// Snakes and Ladders Board
board = [
    [100, 99, 98, 97, 96, 95, 94, 93, 92, 91],
    [81, 82, 83, 84, 85, 86, 87, 88, 89, 90],
    [80, 79, 78, 77, 76, 75, 74, 73, 72, 71],
    [61, 62, 63, 64, 65, 66, 67, 68, 69, 70],
    [60, 59, 58, 57, 56, 55, 54, 53, 52, 51],
    [41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
    [40, 39, 38, 37, 36, 35, 34, 33, 32, 31],
    [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    [20, 19, 18, 17, 16, 15, 14, 13, 12, 11],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
]

// Printing the board
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
        [100, 99, 98, 97, 96, 95, 94, 93, 92, 91],
        [81, 82, 83, 84, 85, 86, 87, 88, 89, 90],
        [80, 79, 78, 77, 76, 75, 74, 73, 72, 71],
        [61, 62, 63, 64, 65, 66, 67, 68, 69, 70],
        [60, 59, 58, 57, 56, 55, 54, 53, 52, 51],
        [41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
        [40, 39, 38, 37, 36, 35, 34, 33, 32, 31],
        [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        [20, 19, 18, 17, 16, 15, 14, 13, 12, 11],
        [1, 2, 3, 4, 5, 6, 7, 8, 9,10]
    ];
    printBoard();
}

// Drawing the Snakes and Ladders board
function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const size = canvas.width / 10;
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            if ((row + col) % 2 === 0) {
                ctx.fillStyle = "#ffffff";
            } else {
                ctx.fillStyle = "#cccccc";
            }
            ctx.fillRect(col * size, row * size, size, size);
            ctx.fillStyle = "#000000";
            ctx.font = "16px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(board[row][col], col * size + size / 2, row * size + size / 2);
        }
    }
}

// Adding the 'ladders' as simple brown lines
function drawLadders() {
    ctx.strokeStyle = "brown";
    ctx.lineWidth = 5;
    // Ladder from 4 to 42
    ctx.beginPath();
    ctx.moveTo(3 * (canvas.width / 10) + (canvas.width / 20), 9 * (canvas.height / 10) + (canvas.height / 20));
    ctx.lineTo(3 * (canvas.width / 10) + (canvas.width / 20), 7 * (canvas.height / 10) + (canvas.height / 20));
    ctx.lineTo(1 * (canvas.width / 10) + (canvas.width / 20), 7 * (canvas.height / 10) + (canvas.height / 20));
    ctx.lineTo(1 * (canvas.width / 10) + (canvas.width / 20), 5 * (canvas.height / 10) + (canvas.height / 20));
    ctx.stroke();
    // Ladder from 10 to 90
    ctx.beginPath();
    ctx.moveTo(9 * (canvas.width / 10) + (canvas.width / 20), 9 * (canvas.height / 10) + (canvas.height / 20));
    ctx.lineTo(9 * (canvas.width / 10) + (canvas.width / 20), (canvas.height / 10) + (canvas.height / 20));
    ctx.stroke();
    // Ladder from 28 to 75
    ctx.beginPath();
    ctx.moveTo(7 * (canvas.width / 10) + (canvas.width / 20), 7 * (canvas.height / 10) + (canvas.height / 20));
    ctx.lineTo(7 * (canvas.width / 10) + (canvas.width / 20), 5 * (canvas.height / 10) + (canvas.height / 20));
    ctx.lineTo(5 * (canvas.width / 10) + (canvas.width / 20), 5 * (canvas.height / 10) + (canvas.height / 20));
    ctx.lineTo(5 * (canvas.width / 10) + (canvas.width / 20), 2 * (canvas.height / 10) + (canvas.height / 20));
    ctx.stroke();
    // Ladder from 36 to 76
    ctx.beginPath();
    ctx.moveTo(4 * (canvas.width / 10) + (canvas.width / 20), 6 * (canvas.height / 10) + (canvas.height / 20));
    ctx.lineTo(4 * (canvas.width / 10) + (canvas.width / 20), 2 * (canvas.height / 10) + (canvas.height / 20));
    ctx.stroke();
}

// Adding the 'snakes' as simple green lines
function drawSnakes() {
    ctx.strokeStyle = "green";
    ctx.lineWidth = 5;
    // Snake from 99 to 82
    ctx.beginPath();
    ctx.moveTo(1 * (canvas.width / 10) + (canvas.width / 20), 1 * (canvas.height / 10) + (canvas.height / 20));
    ctx.lineTo(1 * (canvas.width / 10) + (canvas.width / 20), 0 * (canvas.height / 10) + (canvas.height / 20));
    ctx.stroke();
    // Snake from 87 to 14
    ctx.beginPath();
    ctx.moveTo(6 * (canvas.width / 10) + (canvas.width / 20), 8 * (canvas.height / 10) + (canvas.height / 20));
    ctx.lineTo(6 * (canvas.width / 10) + (canvas.width / 20), (canvas.height / 10) + (canvas.height / 20));
    ctx.stroke();
    // Snake from 80 to 44
    ctx.beginPath();
    ctx.moveTo(0 * (canvas.width) + (canvas.width / 20), 2 * (canvas.height / 10) + (canvas.height / 20));
    ctx.lineTo(3 * (canvas.width / 10) + (canvas.width / 20), 5 * (canvas.height / 10) + (canvas.height / 20));
    ctx.stroke();
    // Snake from 20 to 1
    ctx.beginPath();
    ctx.moveTo(0 * (canvas.width / 10) + (canvas.width / 20), 8 * (canvas.height / 10) + (canvas.height / 20));
    ctx.lineTo(0 * (canvas.width / 10) + (canvas.width / 20), 9 * (canvas.height / 10) + (canvas.height / 20));
    ctx.stroke();
}

// Setting up Player and Computer positions
let playerPosition = 1;
let playerWin = false;
let computerPosition = 1;
let computerWin = false;


function resetGame() {
    resetBoard();
    drawBoard();
    drawLadders();
    drawSnakes();
}

document.getElementById('resetBtn').addEventListener('click', () => {
    resetGame();
    document.getElementById('rollResult').innerText = `Game Reset!`;
    document.getElementById('playerEvent').innerText = '';
    document.getElementById('computerEvent').innerText = '';
    document.getElementById('scoreBoard').innerText = 'Player: 1 | Computer: 1';
    playerPosition = 1;
    playerWin = false;
    computerPosition = 1;
    computerWin = false;
    drawComputer();
    drawPlayer();
});

// Drawing a circle to represent the player
function drawPlayer() {
    const size = canvas.width / 10;
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            if (board[row][col] === playerPosition) {
                ctx.fillStyle = "red";
                ctx.beginPath();
                ctx.arc(col * size + size / 1.5, row * size + size / 1.5, size / 5, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }
}

function drawComputer() {
    const size = canvas.width / 10;
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            if (board[row][col] === computerPosition) {
                ctx.fillStyle = "blue";
                ctx.beginPath();
                ctx.arc(col * size + size / 2.5, row * size + size / 2.5, size / 5, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }
}

function updateScoreBoard() {
    document.getElementById('scoreBoard').innerText = `Player: ${playerPosition} | Computer: ${computerPosition}`;
}

function checkCurrentPosition() {
    // Check for ladders
    if (playerPosition === 4) playerPosition = 42;
    else if (playerPosition === 10) playerPosition = 90;
    else if (playerPosition === 28) playerPosition = 75;
    else if (playerPosition === 36) playerPosition = 76;

    if (computerPosition === 4) computerPosition = 42;
    else if (computerPosition === 10) computerPosition = 90;
    else if (computerPosition === 28) computerPosition = 75;
    else if (computerPosition === 36) computerPosition = 76;

    // Check for snakes
    if (playerPosition === 99) playerPosition = 82;
    else if (playerPosition === 87) playerPosition = 14;
    else if (playerPosition === 80) playerPosition = 44;
    else if (playerPosition === 20) playerPosition = 1;

    if (computerPosition === 99) computerPosition = 82;
    else if (computerPosition === 87) computerPosition = 14;
    else if (computerPosition === 80) computerPosition = 44;
    else if (computerPosition === 20) computerPosition = 1;
}

function playerSnakeLadderText(prevPos) {
    if (prevPos === 4) return `You hit a ladder and moved from 4 to 42.`;
    if (prevPos === 10) return `You hit a ladder and moved from 10 to 90.`;
    if (prevPos === 28) return `You hit a ladder and moved from 28 to 75.`;
    if (prevPos === 36) return `You hit a ladder and moved from 36 to 76.`;
    if (prevPos === 99) return `You hit a snake and moved from 99 to 82.`;
    if (prevPos === 87) return `You hit a snake and moved from 87 to 14.`;
    if (prevPos === 80) return `You hit a snake and moved from 80 to 44.`;
    if (prevPos === 20) return `You hit a snake and moved from 20 to 1.`;
    return '';
}

function computerSnakeLadderText(prevPos) {
    if (prevPos === 4) return `Computer hit a ladder and moved from 4 to 42.`;
    if (prevPos === 10) return `Computer hit a ladder and moved from 10 to 90.`;
    if (prevPos === 28) return `Computer hit a ladder and moved from 28 to 75.`;
    if (prevPos === 36) return `Computer hit a ladder and moved from 36 to 76.`;
    if (prevPos === 99) return `Computer hit a snake and moved from 99 to 82.`;
    if (prevPos === 87) return `Computer hit a snake and moved from 87 to 14.`;
    if (prevPos === 80) return `Computer hit a snake and moved from 80 to 44.`;
    if (prevPos === 20) return `Computer hit a snake and moved from 20 to 1.`;
    return '';
}

// Thx Copilot for the message duration <3
function showEventMessage(id, message, duration = 2500) {
    const el = document.getElementById(id);
    el.innerText = message;
    if (message) {
        setTimeout(() => {
            // Only clear if the message hasn't changed
            if (el.innerText === message) {
                el.innerText = '';
            }
        }, duration);
    }
}

function animateMovement(start, end, isPlayer, callback) {
    let current = start;
    const direction = end > start ? 1 : -1;
    const interval = setInterval(() => {
        current += direction;
        if (isPlayer) {
            playerPosition = current;
        } else {
            computerPosition = current;
        }
        resetGame();
        drawPlayer();
        drawComputer();
        updateScoreBoard();
        if (current === end) {
            clearInterval(interval);
            if (callback) callback();
        }
    }, 200); // 200ms per step
}

document.getElementById('rollBtn').addEventListener('click', () => {
    const roll1 = Math.floor(Math.random() * 6) + 1;
    const roll2 = Math.floor(Math.random() * 6) + 1;
    const cRoll1 = Math.floor(Math.random() * 6) + 1;
    const cRoll2 = Math.floor(Math.random() * 6) + 1;

    if (playerWin && computerWin) {
        document.getElementById('rollResult').innerText = `GAME OVER! It's a draw???`;
        return;
    }
    if (playerWin || computerWin) {
        document.getElementById('rollResult').innerText = `GAME OVER!`;
        return;
    }

    let playerTarget = playerPosition + roll1 + roll2;
    let computerTarget = computerPosition + cRoll1 + cRoll2;

    let playerText = `You rolled a ${roll1} and a ${roll2} (Total: ${roll1 + roll2})`;
    let computerText = `Computer rolled a ${cRoll1} and a ${cRoll2} (Total: ${cRoll1 + cRoll2})`;

    // Require exact roll to win
    if (playerTarget > 100) {
        playerTarget = playerPosition;
        playerText += ` You need exactly ${100 - playerPosition} to win.`;
    }
    if (computerTarget > 100) {
        computerTarget = computerPosition;
        computerText += ` Computer needs exactly ${100 - computerPosition} to win.`;
    }

    document.getElementById('rollResult').innerText = playerText + '\n' + computerText;

    // Animate player movement
    animateMovement(playerPosition, playerTarget, true, () => {
        playerPosition = playerTarget;
        if (playerPosition === 100) {
            playerWin = true;
            document.getElementById('rollResult').innerText += "\nYou Win!";
        }

        let prevPlayerPos = playerPosition;
        let playerEventMsg = '';
        if ([4, 10, 28, 36, 99, 87, 80, 20].includes(playerPosition)) {
            checkCurrentPosition();
            playerEventMsg = playerSnakeLadderText(prevPlayerPos);
        } else {
            checkCurrentPosition();
        }
        showEventMessage('playerEvent', playerEventMsg, 2500);
        resetGame();
        drawPlayer();
        drawComputer();
        updateScoreBoard();

        // Animate computer movement
        animateMovement(computerPosition, computerTarget, false, () => {
            computerPosition = computerTarget;
            if (computerPosition === 100) {
                computerWin = true;
                document.getElementById('rollResult').innerText += "\nComputer Wins!";
            }

            let prevCompPos = computerPosition;
            let computerEventMsg = '';
            if ([4, 10, 28, 36, 99, 87, 80, 20].includes(computerPosition)) {
                checkCurrentPosition();
                computerEventMsg = computerSnakeLadderText(prevCompPos);
            } else {
                checkCurrentPosition();
            }
            showEventMessage('computerEvent', computerEventMsg, 2500);
            resetGame();
            drawPlayer();
            drawComputer();
            updateScoreBoard();
        });
    });
});


resetGame();
drawComputer();
drawPlayer();