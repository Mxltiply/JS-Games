// Game 1: Your Age in Days

function ageInDays () {
    var birthYear = prompt('What year were you born... Good friend?');
    var ageInDayss = (2021 - birthYear) * 365;
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('You are ' + ageInDayss + ' days old.')
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}

function reset() {
document.getElementById('ageInDays').remove();
}

// Game 2: Cat Generator

/*
function generateCat() {
    var image = document.createElement('img');
    var div = document.getElementById("flex-cat-gen");
    image.src= "http://thecatapi.com/api/images/get?format=src&type=gif&size=small"
    div.appendChild(image);
}
*/ 

function fetchPics () {

    fetch("https://api.thecatapi.com/v1/images/search?size=small")

   // takes information from api and converts it into json
   .then(response => response.json())
  
   // takes the data collected, and makes a function
   .then((data) => {
    
        console.log(data); 

        //displays json (an object with {})
        var catsImgUrl = data[0].url

        var catsImgEl = document.createElement("img")
        catsImgEl.setAttribute('src', `${catsImgUrl}`)
    
        var catImgDiv = document.querySelector(".catImgDiv")
        catImgDiv.appendChild(catsImgEl)

    })
}

// Game 3 : Rock, Paper, Scissors 

function rpsGame(yourChoice) {

    console.log(yourChoice);

    var humanChoice, botChoice; 
    humanChoice = yourChoice.id;
    botChoice = numberToChoice(randToRpsInt()); 
    console.log('Computer choice', botChoice);

    results = decideWinner(humanChoice, botChoice); // [0, 1] human lost | bot won
    console.log(results);

    message = finalMessage(results) // ('message': 'You won!', 'color': 'green') 
    console.log(message);
    
    rpsFrontEnd(yourChoice.id, botChoice, message); 

}

function randToRpsInt() {
    return Math.floor(Math.random() * 3); 
}

function numberToChoice(number) {
    return['rock', 'paper', 'scissors'][number]
}

function decideWinner(yourChoice, computerChoice) { 
    var rpsDatabase = {
        'rock': {'scissors': 1, 'rock': 0.5, 'paper': 0},
        'paper': {'rock': 1, 'paper': 0.5, 'scissors': 0},
        'scissors': {'paper': 1, 'scissors': 0.5, 'rock': 0},
    };

    var yourScore = rpsDatabase[yourChoice][computerChoice];
    var computerScore = rpsDatabase[computerChoice][yourChoice];

    return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]) {
    if (yourScore === 0) {
        return {'message': 'You lost!', 'color': 'red'};
    } else if (yourScore === 0.5) {
        return {'message': 'You tied!', 'color': 'purple'};
    } else {
        return {'message': 'You won!', 'color': 'green'};
    }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
   
    //image storage
    var imagesDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    }

    // removing all the images
    document.getElementById('rock').remove(); 
    document.getElementById('paper').remove(); 
    document.getElementById('scissors').remove(); 

    //assigning the divs
    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "' height=200 width=200 style='box-shadow: 0px 10px 50px rgba(35,50,235,1);'>";
    messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size: 68px; padding: 30px; '>" + finalMessage['message'] + "</h1>"
    botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "' height=200 width=200 style='box-shadow: 0px 10px 50px rgba(245,40,25,1);'>";

    //displaying the human choice, bot choice, and message 
    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);


}

// Game 4: Button Color Changer

var all_buttons = document.getElementsByTagName('button');

var copyAllButtons = [];
for (let i = 0; i < all_buttons.length; i++) {
    copyAllButtons.push(all_buttons[i].classList[1]);
}

console.log(copyAllButtons);

function buttonColorChange(buttonThingy) {

    if (buttonThingy.value === 'red') {
        buttonsRed(); 
    } else if (buttonThingy.value === 'green') {
        buttonsGreen();
    } else if (buttonThingy.value === 'reset') {
        buttonColorReset();
    } else if (buttonThingy.value === 'random') {
        randomColors(); 
    }

}

function buttonsRed () {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttonsGreen () {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}

function buttonColorReset () {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function randomColors () {
    let choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning']
    
    for (let i=0; i < all_buttons.length; i++) {
        let randomNumber = Math.floor(Math.random() * 4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[randomNumber]);
    }
}

// Game 5: Blackjack

let blackjackGame = {
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cards': ['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardsMap':{'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8,'9': 9,'10': 10, 'K': 10, 'J': 10, 'Q': 10, 'A': [1,11]},
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false, 
};

//players
const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

//sounds
const hitSound = new Audio('img game 5/swish.m4a');
const winSound = new Audio('img game 5/cash.mp3');
const lossSound = new Audio('img game 5/aww.mp3');
const drawSound = new Audio('img game 5/bruh.mp3');

//button click - "ability"
document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);

document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);

document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

function blackjackHit() {
    if (blackjackGame['isStand'] === false) {
    let card = randomCard();
    showCard(card, YOU);
    updateScore(card, YOU);
    showScore(YOU);
    }    
}

function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}

function showCard(card, activePlayer) { 
    if (activePlayer['score'] <= 21) {
    let cardImage = document.createElement('img');
    cardImage.src = `img game 5/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
    }
}

function blackjackDeal() {
    if (blackjackGame['turnsOver'] === true) {

        blackjackGame['isStand'] = false; 
        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

        for (i=0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }

        for (i=0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }

        YOU['score'] = 0;
        DEALER['score'] = 0;

        //resetting text after deal button is pressed
        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').textContent = 0;
        
        document.querySelector('#your-blackjack-result').style.color = '#ffffff';
        document.querySelector('#dealer-blackjack-result').style.color = '#ffffff';
        
        document.querySelector('#blackjack-result').textContent = "Let's play!"; 
        document.querySelector('#blackjack-result').style.color = 'black';

        blackjackGame['turnsOver'] = true; 
    }
} 

function updateScore(card, activePlayer) {
    if (card === 'A') {

    //If adding 11 keeps me below 21, add 11. Otherwise, add 1.
    
     if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
        activePlayer['score'] += blackjackGame['cardsMap'][card][1];
     } else {
        activePlayer['score'] += blackjackGame['cardsMap'][card][0];
     }
    } else {
    activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic() { 
    blackjackGame['isStand'] = true;

    while(DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
        let card = randomCard(); 
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER); 
        await sleep(1000);
    }

    blackjackGame['turnsOver'] = true; 
    let winner = computeWinner(); 
    showResult(winner);  
    
}

//compute winner and return who just won
// update the wins, draws, and losses
function computeWinner() {
    let winner;

    if(YOU['score'] <= 21) {
        // condition: higher score than dealer or when dealer busts but you're 21 or under
        if (YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)) {
            blackjackGame['wins']++;
            winner = YOU;

        } else if (YOU['score'] < DEALER['score']) {
            blackjackGame['losses']++;
            winner = DEALER; 

        } else if (YOU['score'] === DEALER['score']) {
            blackjackGame['draws']++;
            winner = 'Neither'; 
        } 

    //condition: when user busts but dealer doesn't
    }  else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        blackjackGame['losses']++;
        winner = DEALER; 

    //condition: when you AND the dealer bust
    } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        blackjackGame['draws']++; 
        winner = 'Neither'; 
    }

    console.log(blackjackGame); 
    return winner; 
}

function showResult(winner) { 
    let message, messageColor; 

    if (blackjackGame['turnsOver'] === true) {

        if (winner === YOU) {
            document.querySelector('#wins').textContent = blackjackGame['wins']; 
            message = 'You won!';
            messageColor = 'green';
            winSound.play(); 

        } else if (winner === DEALER) {
            document.querySelector('#losses').textContent = blackjackGame['losses']; 
            message = 'You lost!';
            messageColor = 'red'; 
            lossSound.play(); 

        } else if (winner === 'Neither') {
            document.querySelector('#draws').textContent = blackjackGame['draws']; 
            message = 'You drew!';
            messageColor = 'gray';
            drawSound.play(); 
        }

        document.querySelector('#blackjack-result').textContent = message; 
        document.querySelector('#blackjack-result').style.color = messageColor; 
    }
}