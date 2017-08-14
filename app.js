/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, previousRoll, previousRollTwo, givenScore;

init();

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';


document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        getScore();
        //1. Random number
        var dice = Math.floor(Math.random() * 6) + 1;
        var diceTwo = Math.floor(Math.random() * 6) + 1;
        //2. Display result
        var diceDOM = document.querySelector('#dice-one');
        var diceTwoDOM = document.querySelector('#dice-two');
        diceDOM.style.display = 'block';
        diceTwoDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        diceTwoDOM.src = 'dice-' + diceTwo + '.png';
        
//        console.log('previousRoll: ' + previousRoll);
        console.log('dice: ' + dice);
        console.log('dice2: ' + diceTwo);
        //3.Update round IF number is not a 1
        if ((dice !== 1) && (diceTwo !== 1)) {
            //Add score
            if (((previousRollTwo === 6 || previousRoll === 6) && dice === 6) || ((previousRollTwo === 6 || previousRoll === 6) && diceTwo === 6) || (dice === 6 && diceTwo === 6)) {
//                console.log('Player ' + (activePlayer + 1) + ' rolled 2 sixes!');
                document.getElementById('score-' + activePlayer).textContent = '0';
                nextPlayer();
            } else {
                roundScore += (dice + diceTwo);
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
                previousRoll = dice;
                previousRollTwo = diceTwo;
            }
            
        } else {
            //Next player
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
        // Add current score to global score
        scores[activePlayer] += roundScore;
        // Update UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        console.log('givenScore: ' + givenScore);
        console.log('player ' + activePlayer + ' Score: ' + scores[activePlayer]);

        // Check if player won game
        if (scores[activePlayer] >= givenScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
//            document.querySelector('.dice').style.display = 'none';
            document.querySelector('#dice-one').style.display = 'none';
            document.querySelector('#dice-two').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;

        } else {
            // Next player
            nextPlayer();
        }
    }
});

function getScore() {
    console.log('givenScore in getScore: ' + givenScore);
    if (document.getElementById('given-score').value !== null) {
        givenScore = document.getElementById('given-score').value;
        console.log('givenScore window value: ' + document.getElementById('given-score').value);       console.log('got here! givenScore: ' + givenScore);
    } else {
        givenScore = 100;
    }
    
//    console.log('Score: ' + givenScore);
}

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    previousRoll = 0;
    previousRollTwo = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
        
//        document.querySelector('.player-0-panel').classList.remove('active');
//        document.querySelector('.player-1-panel').classList.add('active');
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

//    document.querySelector('.dice').style.display = 'none';
    document.querySelector('#dice-one').style.display = 'none';
    document.querySelector('#dice-two').style.display = 'none';
}

//document.querySelector('.btn-new').addEventListener('click', function() {
//    init();
//});

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    previousRoll = 0;
    previousRollTwo = 0;
    givenScore = 100;
    gamePlaying = true;
    
    document.querySelector('#dice-one').style.display = 'none';
    document.querySelector('#dice-two').style.display = 'none';
    
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    console.log('givenScore in init: ' + givenScore);
}




//console.log(dice);

//document.querySelector('#current-' + activePlayer).textContent = dice; //for plaintext
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';//to change html

//var x = document.querySelector('#score-0').textContent; //gets text value 
//console.log(x);

//document.querySelector('.dice').style.display = 'none'; //sets css property to none

//function btn() {
//    
//}
//btn();
//document.querySelector('.btn-roll').addEventListener('click', btn);
//Above is example of callback from event listener used if we want 
//to call function from somewhere else, otherwise use anonymose function below
