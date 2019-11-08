import { Dimensions, Letter, Select } from "./types";
import { Slate } from "./types";

export const N_LETTERS = 7;
export type FetchState = "Uninitialized" | "Pending" | "Fetched" | "Errored";

export interface State {
  containerDimensions: Dimensions.Dimensions;
  slate: Slate.Slate;
  freeLetters: Letter.Letter[];
  bag: Letter.Letter[];
  selected?: Select.Selection;
  spells: string;
  unspelled: string[];
  spelled: string[];
  fetchState: FetchState;
}

export const create = (init: Partial<State> = {}): State => {
  const { left, drawn } = Letter.draw(N_LETTERS);
  return {
    ...init,
    containerDimensions: Dimensions.create(0, 0),
    slate: Slate.create(N_LETTERS),
    freeLetters: drawn,
    bag: left,
    spells: "",
    unspelled: [],
    spelled: [],
    fetchState: "Uninitialized"
  };
};