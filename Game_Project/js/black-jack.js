function NewGame () {
  this.deck = new CardDeck();
  this.player = new Person ();
  this.dealer = new Dealer ();
}

// CONSTRUCTOR FUNCTION FOR EACH SUIT
function SuitObject (suitName) {
  this.suit = suitName;
  this.values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
}

// TAKES A RANDOM VALUE FROM A SUIT AND RETURNS IT, WHILE REMOVING IT FROM THE ARRAY
SuitObject.prototype.randomValue = function () {
  var randomIndex = Math.floor(Math.random() * this.values.length);
  return this.values.splice(randomIndex, 1)[0]; //Returns single value rather than an array.
};

// CONSTRUCTOR FUNCTION FOR A CARD DECK
function CardDeck () {
  var clubsArray = new SuitObject ("clubs");
  var heartsArray = new SuitObject ("hearts");
  var diamondsArray = new SuitObject ("diamonds");
  var spadesArray = new SuitObject ("spades");
  this.suits = [clubsArray, heartsArray, diamondsArray, spadesArray];
}
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
//KEEPS TRACK OF THE PLAYERS POINTS AND CARDS IN HAND

function Player () {
  this.totalPoints = 0;
  this.hand = [];
  this.status = 'Hit or Stand?';
  this.game = theGame;
}

// PERSON IS THE PERSON PLAYING THE GAME
function Person () {
  Player.call(this);
 }

//INHERITS FROM PLAYER
Person.prototype = Object.create(Player.prototype);

function Dealer () {
  Player.call(this);
}

Dealer.prototype = Object.create(Player.prototype);

Dealer.prototype.playTurn = function() {
  while (this.totalPoints < 17) {
    theGame.dealerHit();
  }
};

// DEALS OUT TWO CARDS INTO PLAYERS HANDS AND DISPLAYS IT
NewGame.prototype.initialDeal = function () {
  for (var i = 0; i < 2; i++) {
    var someCard = this.deck.randomCard();
    var someCard3 = this.deck.randomCard();
    this.player.totalPoints += someCard.pointValue;
      this.player.hand.push(someCard);
      this.dealer.totalPoints += someCard3.pointValue;
        this.dealer.hand.push(someCard3);
  }
};

//Adds a card to the players hands

NewGame.prototype.playerHit = function () {
    var someCard2 = this.deck.randomCard();
    this.player.totalPoints += someCard2.pointValue;
    this.player.hand.push(someCard2);
};

NewGame.prototype.dealerHit = function () {
  var someCard2 = this.deck.randomCard();
  this.dealer.totalPoints += someCard2.pointValue;
  this.dealer.hand.push(someCard2);
};
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

var cardPosition = 0;
// Displays INFO
Person.prototype.showHand = function () {
  $('.aCard').html('');
  $('.aCard').hide();
  this.hand.forEach(function (card) {
    cardPosition += 1;
      $('.card-'+cardPosition).show();
      $('.card-'+cardPosition).append(
      '<span><h5> Card Suit: </h5>' + card.cardSuit +
      '</span><span><h5>Face Value: </h5>' + card.faceValue +
      '</span><span><h5>Point Value: </h5>' + card.pointValue + '</span><br>');
    });
    $('.totalValue').html('<h3>Total Value: ' + this.totalPoints + '</h3>');
    $('.status').html(this.status);
    cardPosition = 0;
};


// Checks is the Dealer has a higher score than the player
NewGame.prototype.checkWinner = function () {
  if (this.player.totalPoints >= this.dealer.totalPoints || this.dealer.totalPoints >= 21 ) {
    return 'You win!';
  }
  else {
    return 'You lose...';
  }
};

// Starts New Game
NewGame.prototype.start = function() {
  this.initialDeal();
  this.player.checkStatus();
  this.player.showHand();
};

// Resets Game
NewGame.prototype.reset = function (){
  this.player = new Person ();
  this.dealer = new Dealer ();
  this.deck = new CardDeck ();
};
