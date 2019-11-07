import { Dimensions, Letter } from "./types";
import { Slate } from "./types";

export interface State {
  containerDimensions: Dimensions.Dimensions;
  slate: Slate.Slate;
  freeLetters: Letter.Letter[];
  bag: Letter.Letter[];
}

export const create = (init: Partial<State> = {}): State => {
  const { left, drawn } = Letter.draw(7);
  return {
    ...init,
    containerDimensions: Dimensions.create(0, 0),
    slate: Slate.create(7),
    freeLetters: drawn,
    bag: left
  };
};
