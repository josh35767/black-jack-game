
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
}
// DEALS OUT TWO CARDS INTO PLAYERS HANDS AND DISPLAYS IT
Player.prototype.initialDeal = function () {
  for (var i = 0; i < 2; i++) {
    var someCard = mainDeck.randomCard();
    this.totalPoints += someCard.pointValue;

    $('.displayCards').append(
    '<span><h5> Card Suit: </h5>' + someCard.cardSuit +
    '</span><span><h5>Face Value: </h5>' + someCard.faceValue +
    '</span><span><h5>Point Value: </h5>' +someCard.pointValue + '</span><br>');

    $('.totalValue').html('<h3>Total Value: ' + this.totalPoints + '</h3>');

    this.hand.push(someCard);
  }
};

//Adds a card to the players hands 

Player.prototype.hit = function () {
    var someCard2 = mainDeck.randomCard();
    this.totalPoints += someCard2.pointValue;
    this.hand.push(someCard2);
};
