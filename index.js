//
// Simple Blackjack Game from Scrimba JavaScript Tutorial
// Updated: 04/24/2025
//

let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""

let messageEl = document.getElementById("message-el")
let sumEl = document.querySelector("#sum-el")
let cardsEl = document.getElementById("cards-el")

function getRandomCard() {
    let randomNum = Math.floor( Math.random() * 13 ) + 1
    console.log(randomNum)

    if (randomNum === 1) {
        console.log(randomNum)
        console.log("returning 11")
        return 11
    }
    else if (randomNum >= 11) {
        console.log(randomNum)
        console.log("returning 10")
        return 10
    }
    else return randomNum
}

function startGame() {
    isAlive = true
    let firstCard = getRandomCard()
    cards.push(firstCard)

    sum += firstCard

    renderGame();
}

function renderGame() {
    sumEl.textContent = "Sum: " + sum
    cardsEl.textContent = "Cards: "

    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }

    if (sum <= 20) {
        message = "Do you want to draw a new card?"

    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true

    } else {
        message = "You're out of the game!"
        isAlive = false
    }

    messageEl.textContent = message
}

function newCard() {
    if(isAlive && hasBlackJack === false)
    {
        let card = getRandomCard()
        sum += card

        cards.push(card)
        console.log(cards)

        renderGame()
    }
}

