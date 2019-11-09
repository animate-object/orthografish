import { Dimensions, Letter, Select } from "./types";
import { Slate } from "./types";

export const N_LETTERS = 6;
export type FetchState = "Uninitialized" | "Pending" | "Fetched" | "Errored";
export type SpellState = "New" | "Previous" | "Nothing";

export interface State {
  containerDimensions: Dimensions.Dimensions;
  slate: Slate.Slate;
  freeLetters: Letter.Letter[];
  bag: Letter.Letter[];
  selected?: Select.Selection;
  spells: string;
  unspelled: string[];
  spelled: string[];
  spellState: SpellState;
  fetchState: FetchState;
  hasGivenUp: boolean;
  showSpelled: boolean;
  showDefinition: boolean;
}

export const create = (init: Partial<State> = {}): State => {
  const { left, drawn } = Letter.draw(N_LETTERS);
  return {
    containerDimensions: Dimensions.create(0, 0),
    slate: Slate.create(N_LETTERS),
    freeLetters: drawn,
    bag: left,
    spells: "",
    unspelled: [],
    spelled: [],
    spellState: "Nothing",
    fetchState: "Uninitialized",
    hasGivenUp: false,
    showSpelled: false,
    showDefinition: false,
    ...init
  };
};
