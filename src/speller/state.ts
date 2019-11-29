import { Slate, Dimensions, Letter, Select } from "../common/types";

export const N_LETTERS = 6;
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
  return {
    containerDimensions: Dimensions.create(0, 0),
    slate: Slate.create(N_LETTERS),
    freeLetters: [],
    bag: [],
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
