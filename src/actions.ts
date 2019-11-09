import { Dimensions, Select, Letter } from "./types";

export enum ActionTypes {
  SET_CONTAINER_DIMENSIONS = "SET_CONTAINER_DIMENSIONS",
  SELECT = "SELECT",
  CHOOSE_TARGET = "CHOOSE_TARGET",
  CLEAR_SELECTION = "CLEAR_SELECTION",
  FETCH_WORDS = "FETCH_WORDS",
  FETCH_WORDS_SUCCESS = "FETCH_WORDS_SUCCESS",
  FETCH_WORDS_FAILED = "FETCH_WORDS_FAILED"
}

export type Action =
  | SetContainerDimensions
  | Select
  | ChooseTarget
  | ClearSelection
  | FetchWords
  | FetchWordsSuccess
  | FetchWordsFailed;

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
