Router.route('/', function() {
  'use strict';
  this.render('hello');
});

Router.route('/player1', function() {
  'use strict';
  Session.set('player', 1);
  this.render('player');
});

Router.route('/player2', function() {
  'use strict';
    Session.set('player', 2);
  this.render('player');
})
