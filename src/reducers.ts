import { Action, ActionTypes } from "./actions";
import { State, create } from "./state";

export const reducer = (state: State = create(), action: Action): State => {
  switch (action.type) {
    case ActionTypes.SET_CONTAINER_DIMENSIONS:
      return { ...state, containerDimensions: action.dimensions };
    default:
      return state;
  }
};
