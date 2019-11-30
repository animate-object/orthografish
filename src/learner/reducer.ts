import { State, create } from "./state";
import { Action, ActionTypes } from "./actions";

export const reducer = (state: State = create(), action: Action): State => {
  switch (action.type) {
    case ActionTypes.START_NEW_GAME:
      return { ...state, unspelled: action.words, prefix: action.prefix };
    default:
      return state;
  }
};
