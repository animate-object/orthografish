import { Dimensions, Letter, Select } from "./types";
import { Slate } from "./types";

export const N_LETTERS = 7;

export interface State {
  containerDimensions: Dimensions.Dimensions;
  slate: Slate.Slate;
  freeLetters: Letter.Letter[];
  bag: Letter.Letter[];
  selected?: Select.Selection;
}

export const create = (init: Partial<State> = {}): State => {
  const { left, drawn } = Letter.draw(N_LETTERS);
  return {
    ...init,
    containerDimensions: Dimensions.create(0, 0),
    slate: Slate.create(N_LETTERS),
    freeLetters: drawn,
    bag: left
  };
};
