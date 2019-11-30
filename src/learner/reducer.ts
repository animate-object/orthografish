import {
  State,
  create,
  changeInput,
  spell,
  startNewGame,
  endGame,
  showSpelled
} from "./state";
import { Action, ActionTypes } from "./actions";

export const reducer = (state: State = create(), action: Action): State => {
  switch (action.type) {
    case ActionTypes.START_NEW_GAME:
      return startNewGame(state, action.prefix, action.words);
    case ActionTypes.CHANGE_INPUT:
      return changeInput(state, action.newValue);
    case ActionTypes.SPELL:
      return spell(state);
    case ActionTypes.END_GAME:
      return endGame(state);
    case ActionTypes.SHOW_SPELLED:
      return showSpelled(state, action.show);
    default:
      return state;
  }
};
