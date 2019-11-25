import { State } from "./state";
import { createSelector } from "reselect";
import { Dimensions, Select, Letter, ArrayUtils } from "./types";
import { BAG } from "./types/letter";

const getState = (state: State) => state;

export const getLettersOnTheBoard = createSelector(
  getState,
  state => BAG.length - state.bag.length
);

export const getContainerDimensions = createSelector(
  getState,
  state => state.containerDimensions
);

export const getLetterDimensions = createSelector(
  getContainerDimensions,
  getLettersOnTheBoard,
  (containerDimensions, letterCount) =>
    Dimensions.square(containerDimensions.width / (letterCount + 1))
);

export const getFreeLetters = createSelector(
  getState,
  state => state.freeLetters
);

export const getSpellState = createSelector(
  getState,
  state => state.spellState
);

export const getSlate = createSelector(
  getState,
  state => state.slate
);

export const getSelected = createSelector(
  getState,
  state => state.selected
);

export const getSelectedId = createSelector(
  getSelected,
  selected => (selected ? selected.id : undefined)
);

export const getSpelled = createSelector(
  getState,
  state => Array.from(state.spelled)
);

export const getUnspelled = createSelector(
  getState,
  state => Array.from(state.unspelled)
);

export const getMissed = createSelector(
  getState,
  state => Array.from(state.missed)
);

export const getSpelledCount = createSelector(
  getSpelled,
  spelled => spelled.length
);

export const getUnspelledCount = createSelector(
  getUnspelled,
  unspelled => unspelled.length
);

export const getCurrentWord = createSelector(
  getState,
  state => state.spells
);

export const getCurrentWordIsValid = createSelector(
  getCurrentWord,
  getSpelled,
  (word, spelled) => spelled.indexOf(word) > -1
);

export const getCurrentWordScore = createSelector(
  getCurrentWord,
  getCurrentWordIsValid,
  (word, isValid) => (isValid ? Letter.scoreWord(word) : undefined)
);

export const getValidTargetTypes = createSelector(
  getSelected,
  (selected): Select.TargetType[] => {
    if (!selected) {
      return [];
    }

    switch (selected.type) {
      case "FreeLetter":
        return ["SlateSlot"];
      case "SlateSlot":
        return ["FreeSpace", "SlateSlot", "FreeLetter"];
    }
  }
);

export const getSpells = createSelector(
  getState,
  state => state.spells
);

export const getGaveUp = createSelector(
  getState,
  state => state.hasGivenUp
);

export type WordAndSpelled = [string, boolean];
const wordAndSpelled = (word: string, spelled: boolean): WordAndSpelled => [
  word,
  spelled
];

export const getEndGameWords = createSelector(
  getSpelled,
  getUnspelled,
  (spelled: string[], unspelled: string[]): WordAndSpelled[] => {
    return ArrayUtils.sorted([
      ...spelled.reduce(
        (acc: WordAndSpelled[], cur: string) => [
          ...acc,
          wordAndSpelled(cur, true)
        ],
        []
      ),
      ...unspelled.reduce(
        (acc: WordAndSpelled[], cur: string) => [
          ...acc,
          wordAndSpelled(cur, false)
        ],
        []
      )
    ]);
  }
);

export const getHints = createSelector(
  getUnspelled,
  unspelled =>
    unspelled.reduce(
      (acc: Record<number, number>, cur: string) => ({
        ...acc,
        [cur.length]: (acc[cur.length] || 0) + 1
      }),
      {}
    )
);

export const getShowSpelled = createSelector(
  getState,
  state => state.showSpelled
);

export const getTotalWords = createSelector(
  getUnspelledCount,
  getSpelledCount,
  (spelledCount, unspelledCount) => spelledCount + unspelledCount
);

export const getShouldShowApp = createSelector(
  getState,
  state => state.fetchState === "Fetched"
);

export const getShouldShowDefinition = createSelector(
  getState,
  state => state.showDefinition
);

export const getCanSpell = createSelector(
  getState,
  state => state.slate.contents.filter(v => v != null).length > 1
);

export const getGameRating = createSelector(
  getState,
  ({ spelled, unspelled, missed }) => {
    const totalPossible = spelled.size + unspelled.size;
    const spelledFactor = spelled.size / totalPossible;
    const missedFactor = missed.size / totalPossible;
    return 100 * spelledFactor - 100 * missedFactor;
  }
);
