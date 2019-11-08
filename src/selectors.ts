import { State } from "./state";
import { createSelector } from "reselect";
import { Dimensions, Select, Maybe } from "./types";

const getState = (state: State) => state;

export const getLetterDimensions = createSelector(
  getState,
  state => Dimensions.square(state.containerDimensions.width / 8)
);

export const getFreeLetters = createSelector(
  getState,
  state => state.freeLetters
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
