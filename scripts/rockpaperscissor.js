let game = JSON.parse(localStorage.getItem('game')) || {
    wins: 0,
    loose: 0,
    ties: 0

};
update();
function update() {
    const htElement = document.querySelector('.js-score');
    htElement.innerHTML = `Wins: ${game.wins}, Lose: ${game.loose}, Tie: ${game.ties}`;

}
const roc = document.querySelector('.rock-button');
roc.addEventListener('click', () => {
    playGame('rock');
})

const pap = document.querySelector('.paper-button');
pap.addEventListener('click', () => {
    playGame('paper');
});

const sic = document.querySelector('.scissor-button');
sic.addEventListener('click', () => {
    playGame('scissors');
});
document.body.addEventListener('keydown',(event) => {
    if (event.key==='r'){
        playGame('rock');
    }
    else if (event.key==='p'){
        playGame('paper');
    }
    else if (event.key==='s'){
        playGame('scissors');
    }
});

let playing = false;
let intervalId;

function autoPlay() {
    if (!playing) {
        intervalId = setInterval(
            function () {
                const move = pickChoice();
                playGame(move);
            }, 1000)
        playing = true;
    }
    else {
        clearInterval(intervalId);
        playing = false;
    }

}


function playGame(move) {
    const computerMove = pickChoice();
    let result = '';
    if (move === 'rock') {
        if (computerMove === 'rock') {
            result = 'Tie';
        }
        else if (computerMove === 'paper') {
            result = 'You loose';
        }
        else if (computerMove === 'scissors') {
            result = 'You win';
        }
    }
    else if (move === 'paper') {
        if (computerMove === 'rock') {
            result = 'You win';
        }
        else if (computerMove === 'paper') {
            result = 'Tie';
        }
        else if (computerMove === 'scissors') {
            result = 'You loose';
        }

    }
    else if (move === 'scissors') {
        if (computerMove === 'rock') {
            result = 'You loose';
        }
        else if (computerMove === 'paper') {
            result = 'You win';
        }
        else if (computerMove === 'scissors') {
            result = 'Tie';
        }


    }

    if (result === 'You win') {
        game.wins += 1;
    }
    else if (result === "You loose") {
        game.loose += 1
    }
    else if (result === 'Tie') {
        game.ties += 1
    }

    localStorage.setItem('game', JSON.stringify(game));
    update();
    const firstElement = document.querySelector('.js-status');
    const secondElement = document.querySelector('.js-takes');
    firstElement.innerHTML = `${result}`;
    secondElement.innerHTML = `You <img src="emojis/${move}-emoji.png">-<img src="emojis/${computerMove}-emoji.png"> Computer`;
    //             alert(`You chose ${move},Computer chose ${computerMove}.${result}
    // Wins: ${game.wins}, Lose: ${game.loose}, Tie: ${game.ties}`);


}
function pickChoice() {
    const randNum = Math.random();
    let computerChoice = '';

    if (randNum >= 0 && randNum < 1 / 3) {
        computerChoice = "rock";
    }
    else if (randNum >= 1 / 3 && randNum < 2 / 3) {
        computerChoice = "paper";
    }
    else if (randNum >= 2 / 3 && randNum < 1) {
        computerChoice = "scissors";
    }
    else {
        computerChoice = "paper";
    }
    return computerChoice;

}

