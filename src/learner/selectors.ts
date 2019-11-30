import { State } from "./state";
import { createSelector } from "reselect";

export const getState = (state: State): State => state;

export const getPrefixParams = createSelector(
  getState,
  state => state.prefixParams
);

export const getPrefix = createSelector(getState, state => state.prefix);

export const getBlankValue = createSelector(
  getState,
  state => state.blankValue
);

export const getBlankValueLength = createSelector(
  getState,
  state => state.prefixParams.wordLength - state.prefixParams.prefixLength
);

export const getUnspelled = createSelector(getState, state =>
  Array.from(state.unspelled)
);

export const getSpelled = createSelector(getState, state =>
  Array.from(state.spelled)
);

export const getUnspelledCount = createSelector(
  getUnspelled,
  unspelled => unspelled.length
);

export const getSpelledCount = createSelector(
  getSpelled,
  spelled => spelled.length
);

export const getSpellState = createSelector(
  getState,
  state => state.spellState
);

export const getLastSpelled = createSelector(
  getState,
  state => state.lastSpelled
);

export const getCanSpell = createSelector(
  getBlankValue,
  getBlankValueLength,
  (value, length) => value.length === length
);
