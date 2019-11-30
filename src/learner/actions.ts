export enum ActionTypes {
  REQUEST_NEW_GAME = "REQUEST_NEW_GAME",
  START_NEW_GAME = "START_NEW_GAME"
}

export type Action = RequestNewGame;

export interface RequestNewGame {
  type: ActionTypes.REQUEST_NEW_GAME;
}

export interface StartNewGame {
  type: ActionTypes.START_NEW_GAME;
}

export const requestNewGame = () => ({ type: ActionTypes.REQUEST_NEW_GAME });
export const startNewGame = () => ({ type: ActionTypes.START_NEW_GAME });
