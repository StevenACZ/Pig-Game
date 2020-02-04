/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  document.querySelector('.dice-1').style.display = 'none';
  document.querySelector('.dice-2').style.display = 'none';

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
}

function nextPlayer() {
  // Who is the active player?
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

  roundScore = 0;
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('.dice-1').style.display = 'none';
  document.querySelector('.dice-2').style.display = 'none';
}

var scores, roundScore, activePlayer, gamePlaying, lastDice_1, lastDice_2;

init();

// NEW GAME BUTTON
document.querySelector('.btn-new').addEventListener('click', init);

// ROLL BUTTON
document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying) {
    // 1. Random rumber
    var dice_1 = Math.floor(Math.random() * 6) + 1;
    var dice_2 = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result
    var dice_1_DOM = document.querySelector('.dice-1');
    var dice_2_DOM = document.querySelector('.dice-2');

    dice_1_DOM.src = './resources/images/dice-' + dice_1 + '.png';
    dice_1_DOM.style.display = 'block';

    dice_2_DOM.src = './resources/images/dice-' + dice_2 + '.png';
    dice_2_DOM.style.display = 'block';
    
    // 3. Update the round score IF the rolled number is equal to 1
    if (dice_1 === 1 || dice_2 == 1) {
      // Next score
      nextPlayer();
    } else if (lastDice_1 === 6 && dice_1 === 6 || lastDice_2 === 6 && dice_2 === 6) {
      // Player looses his ENTIRE score when he rolls two 6 in a row
      scores[activePlayer] = 0;
      document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
    } else {
      // Add score
      roundScore += dice_1 + dice_2;
      document.getElementById('current-' + activePlayer).textContent = roundScore;
      // The last Die rolled
      lastDice_1 = dice_1;
      lastDice_2 = dice_2;
    }
    
  } 
});

// HOLD BUTTON
document.querySelector('.btn-hold').addEventListener('click', function () {
  if (gamePlaying) {
    // Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
  
    // Update the UI
  
    // Check if player won the game
    if (scores[activePlayer] >= document.getElementById('goalInput').value) {
      document.getElementById('name-' + activePlayer).textContent = 'Winner!';
      document.querySelector('.dice-1').style.display = 'none';
      document.querySelector('.dice-2').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      
      // End the game
      gamePlaying = false;
    } else {
      // Next player
      nextPlayer();
    }
  }

});

/*

YOUR 3 CHALLENGES

Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)

2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)

3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)

*/