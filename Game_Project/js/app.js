var mainDeck = new CardDeck ();
var me = new Player();

$(document).ready (function(){
  me.initialDeal();

  $('#hit-btn').click(function (){
    me.hit();
  });

});
