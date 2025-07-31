//
// Simple Blackjack Game from Scrimba JavaScript Tutorial
// Updated: 07/30/2025
//

const card_data = [
    { "number": 2, "path": "images/snoopy_2.png" },
    { "number": 3, "path": "images/snoopy_3.png" },
    { "number": 4, "path": "images/snoopy_4.png" }, 
    { "number": 5, "path": "images/snoopy_5.png" }, 
    { "number": 6, "path": "images/snoopy_6.png" },
    { "number": 7, "path": "images/snoopy_7.png" },
    { "number": 8, "path": "images/snoopy_8.png" },
    { "number": 9, "path": "images/snoopy_9.png" },
    { "number": 10, "path": "images/snoopy_10.png" },
    { "number": 11, "path": "images/snoopy_11.png" }
]

const players = [
    {"player": "dealer", "sum": 0, "busted": false, "cards": []},
    {"player": "user", "sum": 0, "busted": false, "cards": []}
]

let gameOn = false
let message = ""

const messageEl = document.getElementById("message-el")
const sumEl = document.querySelector("#sum-el")
const cardsEl = document.getElementById("cards-el")
const cardImgsEl = document.getElementById("card_imgs")
const startGameBtn = document.getElementById("start-btn")
const newCardBtn = document.getElementById("newcard-btn")

const dealerSumEl = document.getElementById("dealer-sum-el")
const dealerCardsEl = document.getElementById("dealer-cards")
const dealerCardImgsEl = document.getElementById("dealer_card_imgs")

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

startGameBtn.addEventListener("click", function () {
    gameOn = true
    message = ""
    resetGame()
    mainGame()

    updateBoard(firstCard)
})

function resetGame() {
    players[0].sum = 0
    players[1].sum = 0

    sumEl.textContent = `Sum: ${players[0].sum}`
    dealerSumEl.textContent = `Sum: ${players[1].sum}`
    cardsEl.textContent = ""
    dealerCardsEl.textContent = ""
    newCardBtn.disabled = false

    while (cardImgsEl.hasChildNodes()) {
        cardImgsEl.removeChild(cardImgsEl.firstChild)
    }
}

function renderGame_() {
    sumEl.textContent = `Sum: ${sum}`
    cardsEl.textContent = ""

    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += `${cards[i]} `
    }
    //displayCards()
}

function mainGame() {
    if(gameOn) {
        if( !players[1].busted ) {
            playerMove(1)
            updateBusting(1)
            sumEl.textContent = `Sum: ${players[1].sum}`
        }
        
        if( !players[0].busted ) {
            playerMove(0)
            updateBusting(0)
            dealerSumEl.textContent = `Sum: ${players[0].sum}`
        }

        if( players[1].busted && players[0].busted ) {
            gameOn = false
            disableNewCardBtn() 
        }
    }
}

function playerMove(playerIndex) {
    const newCard = getRandomCard()
    players[playerIndex].cards.push(newCard)
    players[playerIndex].sum += newCard
}

function updateBusting(playerIndex) {
    if( players[playerIndex].sum >= 21 )
        players[playerIndex].busted = true
}

function updateBoard(newCardValue) {
    displayCard(newCardValue)
    updateMessage(players[1].sum)
}

function updateMessage(newSum) {
    if (newSum <= 20) {
        message = "Do you want to draw a new card?"

    } else if (newSum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
        disableNewCardBtn()

    } else {
        message = "You're out of the game!"
        isAlive = false
        disableNewCardBtn()
    }

    messageEl.textContent = message
}

function disableNewCardBtn() {
    newCardBtn.disabled = true
}

newCardBtn.addEventListener("click", function () {
    if(gameOn)
    {
        const card = getRandomCard()
        cards.push(card)
        console.log(cards)

        updateBoard(card)
    }
})

function findCardPath(cardNumber) {
    for(let i = 0; i < card_data.length; i++) {
        if( card_data[i].number === cardNumber ) {
            console.log("found")
            return card_data[i].path
        }
    }
    return ""
}

function displayCard(cardNumber) {
    const cardPath = findCardPath(cardNumber)

    if(cardPath){
        console.log(`cardpath is:: ${cardPath}`)
        let img = document.createElement("img")
        img.src = cardPath
        img.alt = `card with value ${cardNumber}`
        img.classList.add('card-img')
        
        cardImgsEl.appendChild(img)
    }
}

