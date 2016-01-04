#Roshambo

A rock, paper, scissors game implemented in Meteor.

## Problem description

Build a website which allows two people to play rock-paper-scissors over the internet. It doesn’t need to allow more than one simultaneous game and you may assume that Player 1 enters the game from /player1 and Player 2 enters the game from /player2. Please implement your solution in Meteor.

### Approach

After finally finding the 'do something when collection updates' functionality I'd been seeking in the 'autorun' command, I wound up using a strategy that didn't require it at all. For tracking moves, I settled on a single collection of 'rounds', in which the record for each round contains the moves made by each player, the round number, and, once both moves have been made, a winner. Because this strategy requires checking whether to insert a new record for the round, or to update an existing one, it seems a little awkward. Another approach might be to maintain two collections of moves, one for each player, and have the player subscribe to the collection of the other's moves.

### Open issues

#### Bugs:
Right now we're not clearing the collection at any point except server startup, and since the round is reset to 1 when the user refreshes, we can wind up with a list of previous rounds when the current round is displayed as 1.

#### Styling:
I've focused strictly on getting to know Meteor for this project, and have made no effort to style this game attractively
