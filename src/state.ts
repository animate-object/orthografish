import { Dimensions } from "./types";
import { Slate } from "./types";

export interface State {
  containerDimensions: Dimensions.Dimensions;
  slate: Slate.Slate;
}

export const create = (init: Partial<State> = {}): State => ({
  ...init,
  containerDimensions: Dimensions.create(0, 0),
  slate: Slate.create(7)
});
