var theGame = new NewGame();

$(document).ready (function(){
  $('#play-button').click(function(){
    document.getElementById("loopSong").loop = true;
    document.getElementById("loopSong").play();
    document.getElementById('startShuffle').play();
    $('.winner-message').show();
    $('.menu-text').hide();
    $('.wrap').show();
    $('.card-table').show();
    theGame.start();
  });



  // $('.wrap').removeClass('overlay');
  // $('.winner-message').hide();

  $('#hit-btn').click(function (){
    document.getElementById('audio').play();
    theGame.playerHit();
    $('#double-btn').css('visibility', 'hidden');
    theGame.dealer.showHand();
    if (theGame.player.totalPoints > 21) {
      $('.controls button').css('pointer-events', 'none');
      theGame.player.chips -= 5;
      setTimeout(function () {
        document.getElementById('loseAudio').play();
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

  $('#double-btn').click(function() {
    document.getElementById('audio').play();
    theGame.playerHit();
    theGame.dealer.showHand();
    if (theGame.player.totalPoints > 21) {
      $('.controls button').css('pointer-events', 'none');
      theGame.player.chips -= 10;
      setTimeout(function () {
        document.getElementById('loseAudio').play();
        $('.winner-message').html('<h1>You busted...<h1>');
        theGame.displayMessage();
      }, 1000);
    }
    else {
        theGame.dealer.playTurn();
        theGame.dealer.showHand();
        $('.card2-1').removeClass('flippedOver');
        $('.controls button').css('pointer-events', 'none');
        setTimeout(function (){
        $('.winner-message').html('<h1>' + theGame.doubleDown()+'<br><br>Dealer\'s Score: ' + theGame.dealer.totalPoints + '</h1>');
        setTimeout(function(){
          theGame.displayMessage();
        }, 1000);
      },1000);

    }
  });


});
