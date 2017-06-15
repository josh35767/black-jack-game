var theGame = new NewGame();

$(document).ready (function(){
  $('.aCard').hide();
  $('.winner-message').hide();
    // $('.instruction-container').hide();
  $('#play-button').click(function(){
    clickLook(this);
    $('.start-menu').hide();
    $('body').css('user-select', 'none');
    document.getElementById("loopSong").loop = true;
    document.getElementById("loopSong").play();
    document.getElementById('startShuffle').play();
    $('.menu').hide();
    theGame.start();
  });
  // OPENS INSTRUCTIONS MENU AND KEEPS TRACK OF WHAT INSTRUCTION YOU'RE ON
  var instructionIndex = 0;
  document.getElementById("instLoop").loop = true;
  $('#instructions').click(function(){
    document.getElementById("instLoop").play();
    $('body').css('user-select', 'none');
    $('.instruction-container').show();
    $('.menu-text').hide();
    $('.current-text').html(instructions[instructionIndex]);
    $('#back').hide();
  });
// BACK BUTTON FOR INSTRUCTIONS
  $('#back').click(function(){
    clickLook(this);
    instructionIndex -= 1;
    $('#next').show();
    $('.current-text').html(instructions[instructionIndex]);
    if (instructionIndex === 0) {
      $('#back').hide();
    }
  });
// NEXT BUTTON FOR INSTRUCTIONS
  $('#next').click(function(){
    clickLook(this);
    $('#back').show();
    instructionIndex += 1;
    $('.current-text').html(instructions[instructionIndex]);
    if (instructionIndex === instructions.length - 1){
      $('#next').hide();
    }
  });
// Takes you back to main menu from instructions
  $('#menu').click (function() {
    clickLook(this);
    $('.instruction-container').hide();
    $('.menu-text').show();
    document.getElementById("instLoop").pause();
  });



// Deals with "hits"

  $('#hit-btn').click(function (){
    clickLook(this);
    document.getElementById('audio').play();
    $('#double-btn').css('visibility', 'hidden');
    theGame.playerHit();
    theGame.dealer.showHand();
    if (theGame.player.totalPoints > 21) {
      $('.controls button').css('pointer-events', 'none');
      theGame.player.chips -= 5;
      setTimeout(function () {
        theGame.player.showHand();
        document.getElementById('loseAudio').play();
        $('.winner-message').html('<h1>You busted...<h1>');
        theGame.displayMessage();
      }, 1000);

    }


  });
// Deals with the stand button
  $('#stand-btn').click(function (){
    clickLook(this);
    theGame.dealer.playTurn();
    theGame.player.checkStatus();
    theGame.dealer.showHand();
    $('.card2-1').removeClass('flippedOver');
    $('.controls button').css('pointer-events', 'none');
    $('.winner-message').html('<h1>' + theGame.checkWinner(5)+'<br><br>Dealer\'s Score: ' + theGame.dealer.totalPoints + '</h1>');
    setTimeout(function(){
      theGame.displayMessage();
    }, 1000);
  });
// Deals with Double Down Operations
  $('#double-btn').click(function() {
    clickLook(this);
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
        $('.winner-message').html('<h1>' + theGame.checkWinner(10)+'<br><br>Dealer\'s Score: ' + theGame.dealer.totalPoints + '</h1>');
        setTimeout(function(){
          theGame.displayMessage();
        }, 1000);
      },1000);
    }
  });
// Togles mute of music
  var isMuted = false;
  $('#mute').click(function(){
    clickLook(this);
    if(isMuted ) {
      document.getElementById("loopSong").play();
      isMuted = false;
    }
    else {
      document.getElementById("loopSong").pause();
      isMuted = true;
    }
  });


});
