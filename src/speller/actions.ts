import { Dimensions, Select, Letter } from "../common/types";

export enum ActionTypes {
  SET_CONTAINER_DIMENSIONS = "SET_CONTAINER_DIMENSIONS",
  SELECT = "SELECT",
  CHOOSE_TARGET = "CHOOSE_TARGET",
  CLEAR_SELECTION = "CLEAR_SELECTION",
  CLEAR_SLATE = "CLEAR_SLATE",
  FETCH_WORDS = "FETCH_WORDS",
  FETCH_IS_SLOW = "FETCH_IS_SLOW",
  FETCH_WORDS_SUCCESS = "FETCH_WORDS_SUCCESS",
  FETCH_WORDS_FAILED = "FETCH_WORDS_FAILED",
  GIVE_UP = "GIVE_UP",
  SHOW_SPELLED = "SHOW_SPELLED",
  SHOW_DEFINITION = "SHOW_DEFINITION",
  SUBMIT_WORD = "SUBMIT_WORD",
  REQUEST_NEW_GAME = "REQUEST_NEW_GAME",
  REQUEST_NEW_GAME_FAILED = "REQUEST_NEW_GAME_FAILED",
  START_NEW_GAME = "START_NEW_GAME"
}

export type Action =
  | SetContainerDimensions
  | Select
  | ChooseTarget
  | ClearSelection
  | ClearSlate
  | FetchWords
  | FetchIsSlow
  | FetchWordsSuccess
  | FetchWordsFailed
  | GiveUp
  | ShowSpelled
  | ShowDefinition
  | SubmitWord
  | RequestNewGame
  | RequestNewGameFailed
  | StartNewGame;

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

export interface ClearSlate {
  type: ActionTypes.CLEAR_SLATE;
}

export interface FetchWords {
  type: ActionTypes.FETCH_WORDS;
}

export interface FetchIsSlow {
  type: ActionTypes.FETCH_IS_SLOW;
}

export interface FetchWordsSuccess {
  type: ActionTypes.FETCH_WORDS_SUCCESS;
}

export interface FetchWordsFailed {
  type: ActionTypes.FETCH_WORDS_FAILED;
}

export interface GiveUp {
  type: ActionTypes.GIVE_UP;
}

export interface ShowSpelled {
  type: ActionTypes.SHOW_SPELLED;
  show: boolean;
}

export interface ShowDefinition {
  type: ActionTypes.SHOW_DEFINITION;
  show: boolean;
}

export interface SubmitWord {
  type: ActionTypes.SUBMIT_WORD;
}

export interface RequestNewGame {
  type: ActionTypes.REQUEST_NEW_GAME;
}

export interface RequestNewGameFailed {
  type: ActionTypes.REQUEST_NEW_GAME_FAILED;
}

export interface StartNewGame {
  type: ActionTypes.START_NEW_GAME;
  drawn: Letter.Letter[];
  bag: Letter.Letter[];
  words: string[];
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

export const clearSlate = (): ClearSlate => ({ type: ActionTypes.CLEAR_SLATE });

export const clearSelection = () => ({ type: ActionTypes.CLEAR_SELECTION });

export const fetchWords = (): FetchWords => ({
  type: ActionTypes.FETCH_WORDS
});

export const fetchIsSlow = (): FetchIsSlow => ({
  type: ActionTypes.FETCH_IS_SLOW
});

export const fetchWordsSuccess = (): FetchWordsSuccess => ({
  type: ActionTypes.FETCH_WORDS_SUCCESS
});

export const fetchWordsFailed = (): FetchWordsFailed => ({
  type: ActionTypes.FETCH_WORDS_FAILED
});

export const giveUp = (): GiveUp => ({ type: ActionTypes.GIVE_UP });

export const showSpelled = (show: boolean): ShowSpelled => ({
  type: ActionTypes.SHOW_SPELLED,
  show
});

export const showDefinition = (show: boolean): ShowDefinition => ({
  type: ActionTypes.SHOW_DEFINITION,
  show
});

export const submitWord = (): SubmitWord => ({ type: ActionTypes.SUBMIT_WORD });

export const requestNewGame = (): RequestNewGame => ({
  type: ActionTypes.REQUEST_NEW_GAME
});

export const startNewGame = (
  drawn: Letter.Letter[],
  bag: Letter.Letter[],
  words: string[]
): StartNewGame => ({
  type: ActionTypes.START_NEW_GAME,
  drawn,
  bag,
  words
});

export const requestNewGameFailed = (): RequestNewGameFailed => ({
  type: ActionTypes.REQUEST_NEW_GAME_FAILED
});
