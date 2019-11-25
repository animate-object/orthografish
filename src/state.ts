import { Dimensions, Letter, Select } from "./types";
import { Slate } from "./types";

export const N_LETTERS = 5;
export type FetchState =
  | "Uninitialized"
  | "Pending"
  | "StillPending"
  | "Fetched"
  | "Errored";
export type SpellState = "New" | "Previous" | "Missed" | "Spelling";

export interface State {
  containerDimensions: Dimensions.Dimensions;
  slate: Slate.Slate;
  freeLetters: Letter.Letter[];
  bag: Letter.Letter[];
  selected?: Select.Selection;
  spells: string;
  unspelled: Set<string>;
  spelled: Set<string>;
  missed: Set<string>;
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
    unspelled: new Set(),
    spelled: new Set(),
    missed: new Set(),
    spellState: "Spelling",
    fetchState: "Uninitialized",
    hasGivenUp: false,
    showSpelled: false,
    showDefinition: false,
    ...init
  };
};
