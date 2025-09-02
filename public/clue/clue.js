
const suspects = ["Colonel Mustard", "Professor Plum", "Miss Scarlett", "Reverend Green", "Mrs. Peacock", "Mrs. White"];
const weapons = ["Candlestick", "Dagger", "Lead Pipe", "Revolver", "Rope", "Wrench"];
const rooms = ["Kitchen", "Ballroom", "Conservatory", "Dining Room", "Billiard Room", "Library", "Lounge", "Hall", "Study"];


const solution = {
    //randomize
    // suspect: suspects[Math.floor(Math.random() * suspects.length)],
    // weapon: weapons[Math.floor(Math.random() * weapons.length)],
    // room: rooms[Math.floor(Math.random() * rooms.length)]
    suspect: "Colonel Mustard",
    weapon: "Dagger",
    room: "Kitchen"
};

const cards = {
    suspects: suspects.filter(s => s !== solution.suspect),
    weapons: weapons.filter(w => w !== solution.weapon),
    rooms: rooms.filter(r => r !== solution.room)
};

const diceRoll = () => Math.floor(Math.random() * 6) + 1;

const boardLayout = [
    ['R0', 'H', 'R1', 'H', 'R2'], 
    ['H', null, 'H', null, 'H'],  
    ['R3', 'H', 'R4', 'H', 'R5'], 
    ['H', null, 'H', null, 'H'],
    ['R6', 'H', 'R7', 'H', 'R8']  
];


const boardLayoutCorrected = [
    ['R0', 'H', 'R1', 'H', 'R2'], 
    ['H', null, 'H', null, 'H'],
    ['R3', 'H', 'R4', 'H', 'R5'], 
    ['H', null, 'H', null, 'H'],
    ['R6', 'H', 'R7', 'H', 'R8'] 
];


let playerLocation = null; 

// DOM Elements
const clueBoard = document.getElementById('clue-board');
const currentLocationSpan = document.getElementById('current-location');
const suspectSelect = document.getElementById('suspect-select');
const weaponSelect = document.getElementById('weapon-select');
const roomSelect = document.getElementById('room-select');
const suggestButton = document.getElementById('suggest-button');
const gameMessage = document.getElementById('game-message');

function createBoard() {
    clueBoard.innerHTML = ''; 
    boardLayoutCorrected.forEach((row, rowIndex) => {
        row.forEach((cellType, colIndex) => {
            const cell = document.createElement('div');
            cell.classList.add('board-cell');

            if (cellType === 'H') {
                cell.classList.add('hallway');

            } else if (cellType && cellType.startsWith('R')) {
                const roomIndex = parseInt(cellType.substring(1));
                const roomName = rooms[roomIndex];
                cell.classList.add('room');
                cell.textContent = roomName;
                cell.dataset.roomName = roomName; 
                cell.addEventListener('click', () => movePlayer(roomName, cell));
            }
            clueBoard.appendChild(cell);
        });
    });
}

function populateDropdown(selectElement, options) {
    selectElement.innerHTML = ''; 
    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option;
        opt.textContent = option;
        selectElement.appendChild(opt);
    });
}

function initializeGame() {
    createBoard();
    populateDropdown(suspectSelect, suspects);
    populateDropdown(weaponSelect, weapons);
    updatePlayerLocationDisplay(null); 
    updateSuggestionControls();
    gameMessage.textContent = 'Click a room to start!';
}


function movePlayer(roomName, clickedCell) {

    const prevLocationCell = document.querySelector('.player-location');
    if (prevLocationCell) {
        prevLocationCell.classList.remove('player-location');
    }

    clickedCell.classList.add('player-location');
    playerLocation = roomName;
    updatePlayerLocationDisplay(roomName);
    updateSuggestionControls();
    gameMessage.textContent = `You are now in the ${roomName}. Make a suggestion!`;
}

function updatePlayerLocationDisplay(location) {
    currentLocationSpan.textContent = location || 'Start';
}

function updateSuggestionControls() {
    if (playerLocation) {
        
        suggestButton.disabled = false;
        roomSelect.disabled = false;
        populateDropdown(roomSelect, [playerLocation]); 
    } else {
        suggestButton.disabled = true;
        roomSelect.disabled = true;
        roomSelect.innerHTML = '<option value="">(Enter a room)</option>';
    }
}

function makeSuggestion() {
    if (!playerLocation) {
        gameMessage.textContent = "You must be in a room to make a suggestion!";
        gameMessage.style.color = '#e74c3c';
        return;
    }

    const suggestedSuspect = suspectSelect.value;
    const suggestedWeapon = weaponSelect.value;
    const suggestedRoom = roomSelect.value; 

    gameMessage.textContent = `You suggest: ${suggestedSuspect} with the ${suggestedWeapon} in the ${suggestedRoom}.`;

    if (suggestedSuspect === solution.suspect &&
        suggestedWeapon === solution.weapon &&
        suggestedRoom === solution.room) {
        gameMessage.textContent += " YOU SOLVED THE MYSTERY! Congratulations!";
        gameMessage.style.color = '#2ecc71'; // 
        suggestButton.disabled = true; 
    } else {
        gameMessage.textContent += " That's not it. Keep investigating!";
        gameMessage.style.color = '#e74c3c'; 
    }
}

// function dealCards() {
//     const playerCards = {
//         suspects: [],
//         weapons: [],
//         rooms: []
//     };

//     // Deal one card from each category to the player
//     playerCards.suspects.push(cards.suspects.pop());
//     playerCards.weapons.push(cards.weapons.pop());
//     playerCards.rooms.push(cards.rooms.pop());

//     return playerCards;
// };

suggestButton.addEventListener('click', makeSuggestion);

initializeGame();
