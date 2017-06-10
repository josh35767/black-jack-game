var theGame = new NewGame();

$(document).ready (function(){

  theGame.start();

  $('#hit-btn').click(function (){
    theGame.playerHit();
    theGame.player.checkStatus();
    theGame.player.showHand();
    setTimeout (function (){
      if (theGame.player.totalPoints > 21 ){
        alert('You lose');
        theGame.reset ();
        theGame.start ();
      }
    }, 500);

  });

  $('#stand-btn').click(function (){
    theGame.dealer.playTurn();
    theGame.player.checkStatus();
    alert(theGame.checkWinner()+' DealerScore: ' + theGame.dealer.totalPoints);
    theGame.reset ();
    theGame.start ();
  });
  $('.dealerValue').html(theGame.dealer.totalPoints);


});
