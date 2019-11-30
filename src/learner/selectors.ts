import { State } from "./state";
import { createSelector } from "reselect";

export const getState = (state: State): State => state;

export const getPrefixParams = createSelector(
  getState,
  state => state.prefixParams
);

export const getPrefix = createSelector(getState, state => state.prefix);
