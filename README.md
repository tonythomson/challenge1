#Roshambo

A rock, paper, scissors game implemented in Meteor.

## Problem description

Build a website which allows two people to play rock-paper-scissors over the internet. It doesn’t need to allow more than one simultaneous game and you may assume that Player 1 enters the game from /player1 and Player 2 enters the game from /player2. Please implement your solution in Meteor.

### Progress

I got far enough with Meteor to implement the paths necessary for each player to have a page, and to be able to trigger server-side methods on events in the client (e.g. after a user clicks a button to make a move).

My initial approach was to send both players' moves to the server, evaluate a winner, and then update the client with the winner info. However, after looking at more Meteor docs, it seemed that a more Meteor-like way to do this might be to add player moves to a collection, and then subscribe to changes in that collection. On a change in the collection, we could check that moves existed for both players, and then display a winner. This would have all logic remain in the client, which might make things simpler in this bare-bones use case.

However, I got stuck trying to get an action to run whenever the collection is updated; I am not finding the docs very clear on how to access the published data within the subscriber callback.
