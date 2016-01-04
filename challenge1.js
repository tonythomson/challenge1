Moves = new Mongo.Collection('moves');


if (Meteor.isClient) {

  function opponent() {
    return (Session.get('player') === 1) ? 2 : 1;
  }

  function recordMove(currentMove) {
    var move = {},
      currentRound = Session.get('round');

    move['player' + Session.get('player')] = currentMove;
    Meteor.call('addMoveToRound', currentRound, move);
    Session.set('round', currentRound + 1);
  }

  Meteor.subscribe('moves');

  Template.player.helpers({
    player: function() {
      return Session.get('player');
    },

    currentRound: function() {
      return Session.get('round');
    },

    moves: function() {
      return Moves.find({});
    },

    displayWinner: function(winningPlayer) {
      return {
        'player1': 'Player 1 wins!',
        'player2': 'Player 2 wins!',
        'tie': 'Draw'
      }[winningPlayer];
    }
  });

  Template.player.events({
    'click button.move': function(e) {
      recordMove(e.target.id);
    },
    'click button#reset': function() {
      Meteor.call('resetGame');
    }
  });

  // initRound();
  Session.set('round', 1);
}

/* Server *******************************************/

if (Meteor.isServer) {

  Meteor.methods({
    resetGame: function() {
      Moves.remove({});
    },

    addMoveToRound: function(round, move) {
      var movesThisRound = Moves.findOne({round: round});

      if (movesThisRound) {
        _.extend(movesThisRound, move);
        move.winner = Meteor.call('determineWinner', movesThisRound);
        Moves.update({round: round}, {$set: move});
      } else {
        move.round = round;
        Moves.insert(move);
      }
    },

    determineWinner: function(movesThisRound) {
      var p1 = movesThisRound.player1,
        p2 = movesThisRound.player2;

      if (p1 === p2) {
        return 'tie';
      } else if (p1 === 'rock') {
        return (p2 === 'paper') ? 'player2' : 'player1';
      } else if (p1 === 'paper') {
        return (p2 === 'scissors') ? 'player2' : 'player1';
      } else if (p1 === 'scissors') {
        return (p2 === 'rock') ? 'player2' : 'player1';
      }
    }
  });

  Meteor.publish('moves', function() {
    return Moves.find();
  });

}
