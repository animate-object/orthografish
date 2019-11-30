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

export const getUnspelled = createSelector(getState, state => state.unspelled);

export const getSpelled = createSelector(getState, state => state.spelled);

export const getUnspelledCount = createSelector(
  getUnspelled,
  unspelled => unspelled.length
);

export const getSpelledCount = createSelector(
  getSpelled,
  spelled => spelled.length
);
