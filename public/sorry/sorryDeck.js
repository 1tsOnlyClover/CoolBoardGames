class Deck {
    constructor() {
        this.cards = [];
        this.createDeck();
    }

    createDeck() {
        let numbers = [1, 2, 3, 4, 5, 7, 8, 10, 11, 12, 13]; //13 is sorry card
        for (let i = 0; i < numbers.length; i++) {
            for (let j = 0; j < 4; j++) {
                this.cards.push(numbers[i]);
            }
        }
        this.cards.push(1);
        this.shuffle();
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
        console.log("Deck shuffled. Cards in deck: ", this.cards);
    }

    drawCard() {
        return this.cards.pop();
    }

    isEmpty() {
        return this.cards.length === 0;
    }
}