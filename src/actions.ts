import { Dimensions, Select, Letter } from "./types";

export enum ActionTypes {
  SET_CONTAINER_DIMENSIONS = "SET_CONTAINER_DIMENSIONS",
  SELECT = "SELECT",
  CHOOSE_TARGET = "CHOOSE_TARGET",
  CLEAR_SELECTION = "CLEAR_SELECTION",
  FETCH_WORDS = "FETCH_WORDS",
  FETCH_WORDS_SUCCESS = "FETCH_WORDS_SUCCESS",
  FETCH_WORDS_FAILED = "FETCH_WORDS_FAILED",
  GIVE_UP = "GIVE_UP",
  NEW_GAME = "NEW_GAME",
  SHOW_SPELLED = "SHOW_SPELLED",
  SHOW_DEFINITION = "SHOW_DEFINITION"
}

export type Action =
  | SetContainerDimensions
  | Select
  | ChooseTarget
  | ClearSelection
  | FetchWords
  | FetchWordsSuccess
  | FetchWordsFailed
  | GiveUp
  | NewGame
  | ShowSpelled
  | ShowDefinition;

export interface SetContainerDimensions {
  type: ActionTypes.SET_CONTAINER_DIMENSIONS;
  dimensions: Dimensions.Dimensions;
}

export interface Select {
  type: ActionTypes.SELECT;
  selection: Select.Selection;
}

export interface ChooseTarget {
  type: ActionTypes.CHOOSE_TARGET;
  target: Select.Target;
}

export interface ClearSelection {
  type: ActionTypes.CLEAR_SELECTION;
}

export interface FetchWords {
  type: ActionTypes.FETCH_WORDS;
  letters: string;
}

export interface FetchWordsSuccess {
  type: ActionTypes.FETCH_WORDS_SUCCESS;
  words: string[];
}

export interface FetchWordsFailed {
  type: ActionTypes.FETCH_WORDS_FAILED;
}

export interface GiveUp {
  type: ActionTypes.GIVE_UP;
}

export interface NewGame {
  type: ActionTypes.NEW_GAME;
}

export interface ShowSpelled {
  type: ActionTypes.SHOW_SPELLED;
  show: boolean;
}

export interface ShowDefinition {
  type: ActionTypes.SHOW_DEFINITION;
  show: boolean;
}

export const setContainerDimensions = (
  dimensions: Dimensions.Dimensions
): SetContainerDimensions => ({
  type: ActionTypes.SET_CONTAINER_DIMENSIONS,
  dimensions
});

export const select = (selection: Select.Selection): Select => ({
  type: ActionTypes.SELECT,
  selection
});

export const chooseTarget = (target: Select.Target): ChooseTarget => ({
  type: ActionTypes.CHOOSE_TARGET,
  target
});

export const clearSelection = () => ({ type: ActionTypes.CLEAR_SELECTION });

export const fetchWords = (letters: Letter.Letter[]): FetchWords => ({
  type: ActionTypes.FETCH_WORDS,
  letters: letters.map(l => l.alpha).join("")
});

export const fetchWordsSuccess = (words: string[]): FetchWordsSuccess => ({
  type: ActionTypes.FETCH_WORDS_SUCCESS,
  words
});

export const fetchWordsFailed = (): FetchWordsFailed => ({
  type: ActionTypes.FETCH_WORDS_FAILED
});

export const giveUp = (): GiveUp => ({ type: ActionTypes.GIVE_UP });

export const newGame = (): NewGame => ({ type: ActionTypes.NEW_GAME });

export const showSpelled = (show: boolean): ShowSpelled => ({
  type: ActionTypes.SHOW_SPELLED,
  show
});

export const showDefinition = (show: boolean): ShowDefinition => ({
  type: ActionTypes.SHOW_DEFINITION,
  show
});
