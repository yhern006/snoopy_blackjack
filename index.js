//
// Simple Blackjack Game from Scrimba JavaScript Tutorial
// Updated: 07/28/2025
//

const card_data = [
    { "number": 2, "path": "images/snoopy_2.png" },
    { "number": 3, "path": "images/snoopy_3.png" },
    { "number": 4, "path": "images/snoopy_4.png" }, 
    { "number": 5, "path": "images/snoopy_5.png" }, 
    { "number": 6, "path": "images/snoopy_6.png" },
    { "number": 7, "path": "images/snoopy_7.png" },
    { "number": 8, "path": "images/snoopy_card.png" },
    { "number": 9, "path": "images/snoopy_9.png" },
    { "number": 10, "path": "images/snoopy_10.png" },
    { "number": 11, "path": "images/snoopy_card.png" }
]

let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""

const messageEl = document.getElementById("message-el")
const sumEl = document.querySelector("#sum-el")
const cardsEl = document.getElementById("cards-el")
const cardImgsEl = document.getElementById("card_imgs")
const startGameBtn = document.getElementById("start-btn")
const newCardBtn = document.getElementById("newcard-btn")

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
    hasBlackJack = false
    isAlive = true
    sum = 0
    message = ""
    resetGame()

    let firstCard = getRandomCard()
    cards = []
    cards.push(firstCard)

    //renderGame(newSum, newCardValue);
    updateBoard(firstCard)
})

function resetGame() {
    sumEl.textContent = `Sum: ${sum}`
    cardsEl.textContent = ""
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

function updateBoard(newCardValue) {
    sum += newCardValue
    sumEl.textContent = `Sum: ${sum}`
    cardsEl.textContent += `${newCardValue} `

    displayCard(newCardValue)
    updateMessage(sum)
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
    if(!newCardBtn.disabled)
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

