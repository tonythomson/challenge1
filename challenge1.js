Moves = new Mongo.Collection('moves');


if (Meteor.isClient) {

  function checkWinner(player, move) {
    Meteor.call('declareWinner', player, move, function(error,result) {
    });
  }

  Meteor.subscribe('moves', function() {
    console.log('Got a moves event');
  });

  Template.player.helpers({
    player: function() {
      return Session.get('player');
    }
  });

  Template.player.events({
    'click button': function(e) {
      console.log('Adding move to collection');

      Moves.insert({
        player: Session.get('player'),
        move: e.target.id
      });
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

  Meteor.publish('moves', function() {
    return Moves.find();
  });

}
