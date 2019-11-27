# Backlog

## Enhancements

#### Offline / Fast Loading Support

Could load some number of games in the background after first play.

Thinking about keeping a FIFO queue of games in the browser cache. New game always takes the last item off the queue. A separate process builds the queue up to some limit of stored data (maybe a number of games, maybe an amount of data);

Could use localstorage for storage.
Could store the queue as a list of ids, and the games as a map against those ids.

#### Previous game

Could sync game state for the current game in local storage, and offer players the option to resume on refresh, if there is a previous game.

Only need to store one of these.

Prompt should be easy to see but not intrusive (dismissable button or toast?)

#### Options menu

Should support an options menu -- app is getting crowded, so some navigation option could be employed.

Options to support

- number of letters (could invalidate stored games487\*)
- storage config

## Bugs

## Chores

#### Remove lodash dependency

Implement custom debounce function

#### Remove axios dependency

Probably can use fetch or XMLHttpRequest
