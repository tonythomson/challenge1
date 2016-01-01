if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.player.helpers({
    player: function () {
      return Session.get('player');
    }
  });

  Template.player.events({
    'click button': function (e) {
      // increment the counter when button is clicked
      Session.set('roshambo' + Session.get('player'), e.target.id);
      console.log(e.target.id);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
