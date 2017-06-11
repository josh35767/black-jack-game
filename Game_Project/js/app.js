var theGame = new NewGame();

$(document).ready (function(){
  $('.wrap').hide();
  $('.card-table').hide();
  $('#play-button').click(function(){
    $('.wrap').show();
    $('.card-table').show();
    $('.menu-text').hide();
    theGame.start();
  });



  // $('.wrap').removeClass('overlay');
  // $('.winner-message').hide();

  $('#hit-btn').click(function (){
    theGame.playerHit();
    theGame.player.checkStatus();
    theGame.player.showHand();
    theGame.dealer.showHand();
    if (theGame.player.totalPoints > 21) {
      $('.controls button').css('pointer-events', 'none');
      setTimeout(function () {
        $('.winner-message').html('<h1>You busted...<h1>');
        theGame.displayMessage();
      }, 1000);

    }


  });

  $('#stand-btn').click(function (){
    theGame.dealer.playTurn();
    theGame.player.checkStatus();
    theGame.dealer.showHand();
    $('.card2-1').removeClass('flippedOver');
    $('.controls button').css('pointer-events', 'none');
    $('.winner-message').html('<h1>' + theGame.checkWinner()+'<br><br>Dealer\'s Score: ' + theGame.dealer.totalPoints + '</h1>');
    setTimeout(function(){
      theGame.displayMessage();
    }, 1000);


  });


});
