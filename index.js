//
// Simple Blackjack Game from Scrimba JavaScript Tutorial
// Updated: 08/29/2025
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
    {"player": "dealer", "sum": 0, "inPlay": false, "busted": false, "cards": []},
    {"player": "user", "sum": 0, "inPlay": false, "busted": false, "cards": []}
]

let gameOn = false
let message = ""

const messageEl = document.getElementById("message-el")
const sumEl = document.querySelector("#sum-el")
const cardsEl = document.getElementById("cards-el")
const cardImgsEl = document.getElementById("card_imgs")

const startGameBtn = document.getElementById("start-btn")
const newCardBtn = document.getElementById("newcard-btn")
const hitBtn = document.getElementById("hit-btn")

const dealerSumEl = document.getElementById("dealer-sum-el")
const dealerCardsEl = document.getElementById("dealer-cards")
const dealerCardImgsEl = document.getElementById("dealer_card_imgs")


startGameBtn.addEventListener("click", function () {
    gameOn = true
    resetGame()
    mainGame()
})

newCardBtn.addEventListener("click", function () {
    mainGame()
})

hitBtn.addEventListener("click", function() {
    players[1].busted = true
    disableBtns(true)

    //while(gameOn)
        mainGame()
})

function getRandomCard() {
    let randomNum = Math.floor( Math.random() * 13 ) + 1

    if (randomNum === 1) {
        return 11
    }
    else if (randomNum >= 11) {
        return 10
    }
    else return randomNum
}

function resetGame() {
    resetPlayers()
    resetTextContent()
    disableBtns(false)
    message = ""
    resetCardImgs()

}

function resetPlayers() {
    players[0].sum = 0
    players[0].inPlay = true
    players[0].busted = false
    players[0].cards = []

    players[1].sum = 0
    players[1].inPlay = true
    players[1].busted = false
    players[1].cards = []
}

function resetTextContent() {
    sumEl.textContent = `Sum: ${players[0].sum}`
    dealerSumEl.textContent = `Sum: ${players[1].sum}`
    cardsEl.textContent = ""
    dealerCardsEl.textContent = ""
}

function resetCardImgs() {
    while (cardImgsEl.hasChildNodes()) {
        cardImgsEl.removeChild(cardImgsEl.firstChild)
    }
    while (dealerCardImgsEl.hasChildNodes())
        dealerCardImgsEl.removeChild(dealerCardImgsEl.firstChild)
}

function mainGame() {
    if(gameOn) {
        // when user's turn
        if( !players[1].busted ) {
            messageEl.textContent = "Your turn"
            playerMove(1)
        }

        // when dealer's turn
        if( !players[0].busted ) {
            messageEl.textContent = "Dealer's turn! Please wait..."
            disableBtns(true)

            setTimeout(function(){        
                playerMove(0)
                checkGameOver()
            }, 3000)
        }
        else checkGameOver()
    }
}

function checkGameOver() {
    if(players[1].busted && !newCardBtn.disabled)
        disableBtns(true)

    if( players[1].busted && players[0].busted ) {
        gameOn = false
        //disableBtns(true)
        messageEl.textContent = "Game Over!"
    }
    else{
        messageEl.textContent = "Continue? Your turn..."
        disableBtns(false)
    }
}

function playerMove(playerIndex) {
    messageEl.textContent = `${players[playerIndex].player}'s turn!`
    // get new card

    const newCard = getRandomCard()
    players[playerIndex].cards.push(newCard)

    updateSum(playerIndex, newCard)
    updateBusting(playerIndex)
    displayCard(playerIndex, newCard)
}

function updateBusting(playerIndex) {
    if( players[playerIndex].sum >= 21 )
        players[playerIndex].busted = true
}

function updateSum(playerIndex, newCard){
    players[playerIndex].sum += newCard

    const newTextContent = `Sum: ${players[playerIndex].sum}`
    if(playerIndex === 0)
        dealerSumEl.textContent = newTextContent
    else
        sumEl.textContent = newTextContent
}

function updateBoard(newCardValue) {
    displayCard(newCardValue)
    updateMessage(players[1].sum)
}

function updateMessage() {
    if (players[1].sum < 21) {
        message = "Do you want to draw a new card?"

    } else if (players[1].sum === 21) {
        message = "You've got Blackjack!"
        gameOn = false
        disableBtns()

    } else {
        message = "You're out of the game!"
        disableBtns()
    }

    messageEl.textContent = message
}

function disableBtns(disable) {
    newCardBtn.disabled = disable
    hitBtn.disabled = disable
}

function findCardPath(cardNumber) {
    for(let i = 0; i < card_data.length; i++) {
        if( card_data[i].number === cardNumber ) {
            return card_data[i].path
        }
    }
    return ""
}

function displayCard(playerIndex, cardNumber) {
    const cardPath = findCardPath(cardNumber)

    if(cardPath){
        const img = document.createElement("img")
        img.src = cardPath
        img.alt = `card with value ${cardNumber}`
        img.classList.add('card-img')
        
        if(playerIndex === 0)    // dealer
            dealerCardImgsEl.appendChild(img)
        else        // user
            cardImgsEl.appendChild(img)

    }
}

