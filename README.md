# Orthografish

A vocabulary building game for the browser. Designed to run against word lambda backend (https://github.com/animate-object/word_api_lambda)



## Done

### Milestone 1: Playable Point and Click Game

- Letters auto size to fit screen
- Valid letters are drawn from a 'bag' on page load
- User can place tiles in slate by selecting tile and clicking in slate
- User can clear slate
- User sees a preview of the word they are spelling
- App calls API to retrieve list of all valid words
- When user forms a valid word, game state updates
- Something reasonable happens when a user spells all words (congratulations + new game button?)
- App provides a 'give up' button, and displays all words the user did not spell



## IN PROGRESS


### Milestone 2: Polish

- Extra parameters
  - Word must contain specified letters
    - Something like, 'all 5 letter words containing q' (might have feasibility implications)
  - Specify word length
- View Definition option (looking to integrate with wiktionary api)
- Style and theming


## TODO

### Milestone 3: Drag and Drop
- All the above functionality, but with a drag and drop interface
