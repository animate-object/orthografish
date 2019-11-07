import { State } from "./state";
import { createSelector } from "reselect";
import { Dimensions } from "./types";

const getState = (state: State) => state;

export const getLetterDimensions = createSelector(
  getState,
  state => Dimensions.square(state.containerDimensions.width / 8)
);

export const getFreeLetters = createSelector(
  getState,
  state => state.freeLetters
);
