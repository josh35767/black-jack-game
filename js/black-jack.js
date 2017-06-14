function NewGame () {
  this.deck = new CardDeck();
  this.player = new Person ();
  this.dealer = new Dealer ();
}

// DEALS OUT TWO CARDS INTO PLAYERS HANDS AND DISPLAYS IT
NewGame.prototype.initialDeal = function () {


  for ( i = 0; i < 2; i++) {
    var someCardPlayer = this.deck.randomCard();
    var someCardDealer = this.deck.randomCard();
    if (someCardPlayer.faceValue === 'A') {
      this.player.aces += 1;
    }
    if (someCardDealer.faceValue === 'A') {
      this.dealer.aces += 1;
    }
    this.player.totalPoints += someCardPlayer.pointValue;
    this.player.hand.push(someCardPlayer);
    this.dealer.totalPoints += someCardDealer.pointValue;
    this.dealer.hand.push(someCardDealer);
  }
  $('.deckTop').html('<h3>Deck: <br>' + this.countDeck() + '</h3>');
};

NewGame.prototype.countDeck = function () {
  var totalCards = 0;
  this.deck.suits.forEach(function(suit){
    totalCards += suit.values.length;
  });
  return totalCards;
};

//Adds a card to the players hands

NewGame.prototype.playerHit = function () {
    var someCard2 = this.deck.randomCard();
    if (someCard2.faceValue === 'A') {
      this.player.aces += 1;
    }
    this.player.totalPoints += someCard2.pointValue;
    this.player.hand.push(someCard2);
    this.player.checkAces();
    $('.deckTop').html('<h3>Deck: <br>' + this.countDeck() + '</h3>');
    theGame.player.checkStatus();
    theGame.player.showHand();
};

//ADDS A CARD TO THE DEALERS HAND
NewGame.prototype.dealerHit = function () {
  var someCard2 = this.deck.randomCard();
  if (someCard2.faceValue === 'A') {
    this.dealer.aces += 1;
  }
  this.dealer.totalPoints += someCard2.pointValue;
  this.dealer.hand.push(someCard2);
  this.dealer.checkAces();
  $('.deckTop').html('<h3>Deck: <br>' + this.countDeck() + '</h3>');

};
// DOUBLE DOWN FUNCTION
NewGame.prototype.doubleDown = function () {
  if (this.player.totalPoints > this.dealer.totalPoints || this.dealer.totalPoints > 21 ) {
    setTimeout(function (){
        document.getElementById('winAudio').play();
    }, 1000);
    this.player.chips += 10;
    return 'You win the round.';
  }
  else if (this.player.totalPoints === this.dealer.totalPoints) {
    setTimeout(function (){
        document.getElementById('winAudio').play();
    }, 1000);
    return 'Tie, bets are returned.';
  }
  else {
    setTimeout(function (){
        document.getElementById('loseAudio').play();
    }, 1000);
    this.player.chips -= 10;
    return 'You lose the round.';
  }
};

// Checks is the Dealer has a higher score than the player
NewGame.prototype.checkWinner = function () {
  if (this.player.totalPoints > this.dealer.totalPoints || this.dealer.totalPoints > 21 ) {
    setTimeout(function (){
        document.getElementById('winAudio').play();
    }, 1000);
    this.player.chips += 5;
    return 'You win the round.';
  }
  else if(this.player.totalPoints == this.dealer.totalPoints) {
    setTimeout(function (){
        document.getElementById('winAudio').play();
    }, 1000);
    return 'Tie, bets are returned.';
  }
  else {
    setTimeout(function (){
        document.getElementById('loseAudio').play();
    }, 1000);
    this.player.chips -= 5;
    return 'You lose the round.';
  }
};

// Starts New Game
NewGame.prototype.start = function() {
  this.initialDeal();
  this.player.checkAces();
  this.dealer.checkAces();
  this.player.checkStatus();
  this.player.showHand();
  this.dealer.showHand();
  this.checkBlackJack();
};
// Checks for a black jack/ natural
NewGame.prototype.checkBlackJack = function () {
  if (this.player.totalPoints === 21) {
    setTimeout(function (){
        document.getElementById('winAudio').play();
    }, 2000);
    this.player.chips += 5;
    $('.controls button').css('pointer-events', 'none');
    $('.winner-message').html('<h1>Black Jack!<br> You win the round!</h1>');
    setTimeout(function(){
      theGame.displayMessage();
    }, 2000);
  }
  else if(this.dealer.totalPoints === 21) {
    setTimeout(function (){
        $('.card2-1').removeClass('flippedOver');
    },1000);

    setTimeout(function (){
        document.getElementById('loseAudio').play();
    }, 3000);
    this.player.chips -= 5;
    $('.controls button').css('pointer-events', 'none');
    $('.winner-message').html('<h1>Dealer\'s got a Black Jack... </br> Sorry </h1>');
    setTimeout(function(){
      theGame.displayMessage();
    }, 3000);
  }
};

var gameOver = false;
// Checks if the player has above 100chips or above or is out of chip
NewGame.prototype.checkGameOver = function () {
  if (this.player.chips >= 100) {
    document.getElementById("loopSong").pause();
    document.getElementById('gameWin').play();
    $('.winner-message').html('<h1 class="winnerText">Congratulations! <br> You beat the dealer.<br> Resetting the game! <h1>');
    this.displayMessage();
    gameOver = true;
    setTimeout(function(){
        location.reload();
    },7000);
  }
  else if (this.player.chips <= 0) {
      document.getElementById("loopSong").pause();
    document.getElementById('gameOver').play();
    $('.winner-message').html('<h1>Sorry <br> You\'re out of chips <br> Resetting the game! <h1>');
    this.displayMessage();
    gameOver = true;
    setTimeout(function(){
        location.reload();
    },5000);
  }
};


// Resets Game and any CSS changes, such as overlapping cards
NewGame.prototype.reset = function (){
  this.player.totalPoints = 0;
  this.player.hand = [];
  this.player.status = 'Hit or Stand?';
  this.player.totalPoints = 0;
  this.player.aces = 0;
  if (this.countDeck() < 15) {
    this.deck = new CardDeck();
    document.getElementById('startShuffle').play();
  }
  this.dealer = new Dealer ();
  this.checkGameOver();
  $('#double-btn').css('visibility', 'visible');
  $('.card-hand-2 .aCard ').css('margin-left', '0');
  $('.card-hand .aCard ').css('margin-left', '0');
  $('.aCard').removeClass('overlap');
  $('.aCard').removeClass('red');
  $('.start-menu').hide();
  $('.card2-1').removeClass('flippedOver');
  $('.controls button').css('pointer-events', 'auto');
};
//Displays text for win message

NewGame.prototype.displayMessage = function () {
  $('.start-menu').show();
  $('.menu-text').hide();
  $('.winner-message').show();
  setTimeout (function (){
    $('.winner-message').hide();

    theGame.reset ();
    if (!gameOver) {
      theGame.start ();
    }

  }, 2000);

};

// ---------------------------------------

// CONSTRUCTOR FUNCTION FOR EACH SUIT
function SuitObject (suitName, color) {
  this.suit = suitName;
  this.values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  this.color = color;
}

// TAKES A RANDOM VALUE FROM A SUIT AND RETURNS IT, WHILE REMOVING IT FROM THE ARRAY
SuitObject.prototype.randomValue = function () {
  var randomIndex = Math.floor(Math.random() * this.values.length);
  return this.values.splice(randomIndex, 1)[0]; //Returns single value rather than an array.
};

// CONSTRUCTOR FUNCTION FOR A CARD DECK
function CardDeck () {
  var clubsArray = new SuitObject ("clubs", "black");
  var heartsArray = new SuitObject ("hearts", "red");
  var diamondsArray = new SuitObject ("diams", "red");
  var spadesArray = new SuitObject ("spades", "black");
  this.suits = [clubsArray, heartsArray, diamondsArray, spadesArray];
}
//TAKES A RANDOM SUIT, AND GETS A RANDOM VALUE FROM THE SUIT (SELECTING RANDOM CARD)
CardDeck.prototype.randomCard = function() {
  var randomIndex2 = Math.floor(Math.random() * this.suits.length);
  var randomCardValue = this.suits[randomIndex2].randomValue();
  var suitValue = this.suits[randomIndex2].suit;
  if (this.suits[randomIndex2].values.length <= 0) {  // Challenge? Splicing BEFORE returning
    this.suits.splice(randomIndex2, 1);
  }
  return new SingleCard(suitValue, randomCardValue, checkPointValue(randomCardValue));
};
// CREATES A CARD WITH THE GIVEN PARAMETERS, ALLOWS FOR EASY MANIPULATION
function SingleCard (suit, faceValue, pointValue) {
  this.cardSuit = suit;
  this.faceValue = faceValue;
  this.pointValue = pointValue;
}

// CHECKS THE POINT VALUE OF ANY GIVEN CARD
function checkPointValue (value) {
  if (value == 'J' || value == 'Q' || value == 'K') {
    return 10;
  }
  else if (value == 'A') {
    return 11;
  }
  else {
    return Number(value);
  }
}

// --------------------------------

//KEEPS TRACK OF THE PLAYERS POINTS AND CARDS IN HAND

function Player () {
  this.totalPoints = 0;
  this.hand = [];
  this.status = 'Hit or Stand?';
  this.game = theGame;
  this.aces = 0;
}
//Makes message for player
Player.prototype.checkStatus = function(){
  if (this.totalPoints > 21) {
    this.status = 'Busted';
  }
  else if (this.totalPoints === 21) {
    this.status = 'Twenty-one!';
  }
  else {
    this.status = 'Hit or Stand?';
  }
};
//Checks for aces and makes them one if goint to bust,
Player.prototype.checkAces = function (){
  if(this.totalPoints > 21 && this.aces > 0) {
    this.totalPoints -= 10;
    this.aces -= 1;
  }
};



//----------- PERSON IS THE PERSON PLAYING THE GAME


function Person () {
  Player.call(this);
  this.chips = 50;
 }

//INHERITS FROM PLAYER
Person.prototype = Object.create(Player.prototype);

var cardPosition = 0;
// Displays INFO
Person.prototype.showHand = function () {
  $('.card-hand .aCard').html('');
  $('.card-hand .aCard').hide();
  $('.deckCards .aCard').show();
  this.hand.forEach(function (card) {
    cardPosition += 1;
    if (cardPosition > 3) {
      $('.card-1').css('margin-left', '50px');
      $('.card-hand .aCard').addClass('overlap');
      $('.card-'+cardPosition).addClass('last');

    }
    if (card.cardSuit === 'diams' || card.cardSuit === 'hearts'){
      $('.card-'+cardPosition).addClass('red');
    }
    $('.card-'+cardPosition).append(
    '<span class="suitPic">&' + card.cardSuit + ';' +
    '</span><br><span class="valuePic">' + card.faceValue +
    '</span><br><span class="suitPic">&' + card.cardSuit + ';');
    $('.card-'+cardPosition).show();
    });
  $('.chipText').html('Chips:<br> ' + '$' + this.chips);

  $('.totalValue').html('Total Value: ' + this.totalPoints);
  $('.status').html(this.status);
  cardPosition = 0;
};



// --------------- CREATES A DEALER --------------------


function Dealer () {
  Player.call(this);
}

Dealer.prototype = Object.create(Player.prototype);
//DEALER MUST HIT UNTIL HIS HAND VALUE IS 17 OR HIGHER, THEN STAYS
Dealer.prototype.playTurn = function() {
  while (this.totalPoints < 17) {
    theGame.dealerHit();
  }
};

Dealer.prototype.showHand = function() {
  $('.card-hand-2 .aCard').html('');
  $('.card-hand-2 .aCard').hide();
  this.hand.forEach(function (card) {
    cardPosition += 1;
    $('.card2-1').addClass('flippedOver');
    if (cardPosition > 3) {
      $('.card-hand-2 .aCard').css('margin-left', '-100px');
      $('.card2-1').css('margin-left', '50px');
      $('.card-hand-2 .aCard').addClass('overlap');
      $('.card2-'+cardPosition).removeClass('overlap');
    }
    if (card.cardSuit === 'diams' || card.cardSuit === 'hearts'){
      $('.card2-'+cardPosition).addClass('red');
    }
      $('.card2-'+cardPosition).show();
      $('.card2-'+cardPosition).append(
      '<span class="suitPic">&' + card.cardSuit + ';' +
      '</span><br><span class="valuePic">' + card.faceValue +
      '</span><br><span class="suitPic">&' + card.cardSuit + ';');
    });
    cardPosition = 0;
};


//-------------------------------


// Array for the instruction text
var instructions = [
  "Welcome to Black Jack, for those who don't know how to play, the rules are simple.",
  "Your goal is to get more points than the dealer, however, if your hand value reaches over 21, you're out.",
  "Each card is worth its numerical value, face cards are worth 10, and aces are worth 11 or 1.",
  "Each round you are dealt 2 cards and given a choice to hit or stand. Hitting will give you another card, standing ends your turn.",
  "If you start the round with 21, you get a 'Black Jack' and automatically win the round. However, if you don't have one, and the dealer does, he automatically wins. ",
  "Another option is after the initial deal is to Double Down, you will be given one more card, and you will immediately end your turn. Your bet, however is doubled.",
  "At the end of each turn your hand will be compared with the dealers, if the dealer's hand is higher, you lose your bet.",
  "On normal plays, you automatically bet $5, double downs will double your bet, but it's a riskier move.",
  "The goal is to get to $100 in chips, reach 0 and game over.",
  "Good luck!"
];

function changeBackground (){
  setInterval (function(

  ){}, 1000);
}
