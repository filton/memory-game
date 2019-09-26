const deck = document.getElementById("card-deck");

let flippedCard = false;
let firstCard, secondCard;
let moves;

const cards = ['check', 'certificate', 'calculator', 'bed', 'bank', 'anchor', 'cube', 'envelope'];

const cardDeck = document.getElementById('card-deck');

// Called on page load to create and shuffle card elements.
function shuffle(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
}

function startGame(reset) {
    cardDeck.innerHTML = '';
    
    setMovesValue(0);

    if (!reset) {
        cards.push(...cards);        
    } else {
        const msgDiv = document.getElementsByClassName('msg-wrapper')[0];
        msgDiv.parentNode.removeChild(msgDiv);
    }

    const shuffledCards = shuffle(cards);
    shuffledCards.forEach((item) => {
        const cardElement = document.createElement('li');
        cardElement.classList.add('card');
        cardElement.setAttribute('type', item);

        const iconElement = document.createElement('i');
        iconElement.classList.add('fa', `fa-${item}`);

        cardElement.appendChild(iconElement);
        cardElement.addEventListener('click', showCard);

        deck.appendChild(cardElement);
    });
}

window.onload = startGame();

// Show card funtionallity for card toggling.
function showCard() {
    if (firstCard && secondCard || this === firstCard) {
        return;
    }

    flipCard(this);

    if (!flippedCard) {
        flippedCard = true;
        firstCard = this;
    } else {
        flippedCard = false;
        secondCard = this;

        setMovesValue(moves + 1);

        if (firstCard.type === secondCard.type) {
            firstCard.removeEventListener('click', showCard);
            secondCard.removeEventListener('click', showCard);
            
            firstCard = secondCard = null;

            const allFlippedCards = Array.from(cardDeck.children).filter(
                c => Array.from(c.classList).includes('show')
            );

            if (cards.length === allFlippedCards.length) {
                endGame(firstCard, secondCard);
            }
        } else {
            setTimeout(
                () => {
                    flipCard(firstCard);
                    flipCard(secondCard);

                    firstCard = secondCard = null;
                }, 1000
            );
        }
    }
}

function flipCard(card) {
    card.classList.toggle('show');
    card.children[0].classList.toggle('visible');
}

function endGame(firstCard, secondCard) {
    const msg = document.createElement('h3');
    msg.innerHTML = 'Congratulations, you won!';

    const btn = document.createElement('button');
    btn.innerHTML = 'Play again?';
    btn.addEventListener('click', () => startGame(true));

    const msgWrapper = document.createElement('div');
    msgWrapper.classList.add('msg-wrapper');
    msgWrapper.appendChild(msg);
    msgWrapper.appendChild(btn);

    const content = document.getElementById('main-content');
    content.appendChild(msgWrapper);  
}

function setMovesValue(newMovesValue) {
    moves = newMovesValue;
    document.getElementById('moves').textContent = moves;
}