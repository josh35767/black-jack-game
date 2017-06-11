var theGame = new NewGame();

$(document).ready (function(){

  theGame.start();

  $('#hit-btn').click(function (){
    theGame.playerHit();
    theGame.player.checkStatus();
    theGame.player.showHand();
    theGame.dealer.showHand();
    if (theGame.player.totalPoints > 21) {
      setTimeout(function (){
        alert('You lose');
        theGame.reset ();
        theGame.start ();
      }, 500);
    }


  });

  $('#stand-btn').click(function (){
    theGame.dealer.playTurn();
    theGame.player.checkStatus();
    theGame.dealer.showHand();
    $('.card2-1').removeClass('flippedOver');
    setTimeout(function () {
    alert(theGame.checkWinner()+' DealerScore: ' + theGame.dealer.totalPoints);

    theGame.reset ();
    theGame.start ();
    $('.dealerValue').html(theGame.dealer.totalPoints);
  }, 2000); // -REMOVE DEALERS SCORE
    });
  $('.dealerValue').html(theGame.dealer.totalPoints); // -REMOVE DEALERS SCORE


});
