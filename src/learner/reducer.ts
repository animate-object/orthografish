import { State, create, changeInput, spell, startNewGame } from "./state";
import { Action, ActionTypes } from "./actions";

export const reducer = (state: State = create(), action: Action): State => {
  switch (action.type) {
    case ActionTypes.START_NEW_GAME:
      return startNewGame(state, action.prefix, action.words);
    case ActionTypes.CHANGE_INPUT:
      return changeInput(state, action.newValue);
    case ActionTypes.SPELL:
      return spell(state);
    default:
      return state;
  }
};
