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

function decideWinner (yourChoice, computerChoice) { 
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

// Game 5: Blackjack!

let blackjackGame = {
    'you': 
}

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);

function blackjackHit() {
    alert('ouch!');
}