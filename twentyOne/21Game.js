
    let deck, playerHand, dealerHand, playerScore, dealerScore;

    function initializeGame() {
        deck = createDeck();
        shuffleDeck(deck);
        playerHand = [];
        dealerHand = [];
        playerScore = 0;
        dealerScore = 0;
        document.getElementById('message').textContent = '';
        dealInitialCards();
        updateScores();
    }

    function createDeck() {
        const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        let deck = [];
        for (let suit of suits) {
            for (let value of values) {
                deck.push({ value, suit });
            }
        }
        return deck;
    }

    function shuffleDeck(deck) {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
    }

    function dealInitialCards() {
        playerHand.push(deck.pop());
        playerHand.push(deck.pop());
        dealerHand.push(deck.pop());
        dealerHand.push(deck.pop());
        updateScores();
        displayCards();
    }

function displayCards() {
    document.getElementById('playerCards').innerHTML = 'Player Cards: ' + playerHand.map(card => `${card.value} of ${card.suit}`).join(', ');
    document.getElementById('dealerCards').innerHTML = 'Dealer Cards: ' + dealerHand.map(card => `${card.value} of ${card.suit}`).join(', ');

    const playerVisuals = document.getElementById('playerCardVisuals');
    playerVisuals.innerHTML = '';
    playerHand.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'player-card-visual';
        cardDiv.textContent = `${card.value} ${card.suit[0]}`; 
        playerVisuals.appendChild(cardDiv);
    });

    const dealerVisuals = document.getElementById('dealerCardVisuals');
    dealerVisuals.innerHTML = '';
    dealerHand.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'dealer-card-visual';
        cardDiv.textContent = `${card.value} ${card.suit[0]}`;
        dealerVisuals.appendChild(cardDiv);
    });
}

    function updateScores() {
        playerScore = calculateScore(playerHand);
        dealerScore = calculateScore(dealerHand);
        document.getElementById('playerScore').textContent = playerScore;
        document.getElementById('dealerScore').textContent = dealerScore;
        checkGameStatus();
    }

    function calculateScore(hand) {
        let score = 0;
        let aces = 0;
        for (let card of hand) {
            if (card.value === 'A') {
                aces++;
                score += 11; // Initially count Ace as 11
            } else if (['K', 'Q', 'J'].includes(card.value)) {
                score += 10;
            } else {
                score += parseInt(card.value);
            }
        }
        // Adjust for Aces
        while (score > 21 && aces > 0) {
            score -= 10;
            aces--;
        }
        return score;
    }

    function checkGameStatus() {
        if (playerScore > 21) {
            document.getElementById('message').textContent = 'You busted! Dealer wins!';
            disableButtons();
        } else if (dealerScore > 21) {
            document.getElementById('message').textContent = 'Dealer busted! You win!';
            disableButtons();
        }
    }

    function disableButtons() {
        document.getElementById('hit').disabled = true;
        document.getElementById('stand').disabled = true;
    }

    document.getElementById('hit').onclick = function() {
        playerHand.push(deck.pop());
        updateScores();
        displayCards();
    };

    document.getElementById('stand').onclick = function() {
        while (dealerScore < 17) {
            dealerHand.push(deck.pop());
            updateScores();
            displayCards();
        }
        if (dealerScore <= 21) {
            if (dealerScore > playerScore) {
                document.getElementById('message').textContent = 'Dealer wins!';
            } else if (dealerScore < playerScore) {
                document.getElementById('message').textContent = 'You win!';
            } else {
                document.getElementById('message').textContent = 'It\'s a tie!';
            }
        } else {
            document.getElementById('message').textContent = 'Dealer busted! You win!';
        }
        disableButtons();
    };

    document.getElementById('reset').onclick = function() {
        initializeGame();
        document.getElementById('hit').disabled = false;
        document.getElementById('stand').disabled = false;
    };

    // Start the game
    initializeGame();
