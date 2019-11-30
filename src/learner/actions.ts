import { PrefixParams } from "./state";

export enum ActionTypes {
  REQUEST_NEW_GAME = "REQUEST_NEW_GAME",
  START_NEW_GAME = "START_NEW_GAME",
  SPELL = "SPELL"
}

export type Action = RequestNewGame | StartNewGame | Spell;

export interface RequestNewGame {
  type: ActionTypes.REQUEST_NEW_GAME;
}

export interface StartNewGame {
  type: ActionTypes.START_NEW_GAME;
  words: string[];
  prefix: string;
}

export interface Spell {
  type: ActionTypes.SPELL;
  word: string;
}

export const requestNewGame = (): RequestNewGame => ({
  type: ActionTypes.REQUEST_NEW_GAME
});

export const startNewGame = (
  words: string[],
  prefix: string
): StartNewGame => ({
  type: ActionTypes.START_NEW_GAME,
  words,
  prefix
});

export const spell = (word: string): Spell => ({
  type: ActionTypes.SPELL,
  word
});
