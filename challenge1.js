if (Meteor.isClient) {

  function checkWinner(player, move) {
    Meteor.call('declareWinner', player, move, function(error,result) {
    });
  }


  Template.player.helpers({
    player: function() {
      return Session.get('player');
    }
  });

  Template.player.events({
    'click button': function(e) {
      var player = Session.get('player'),
        move = e.target.id;

      Session.set('roshambo' + player, move);
      checkWinner(player, move);
    }
  });
}

if (Meteor.isServer) {
  Meteor.methods({
    declareWinner: function(player, move){
      console.log('Received move ' + move + ' from player ' + player);
      return false;
    },
  });

}
