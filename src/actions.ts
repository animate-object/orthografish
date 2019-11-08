import { Dimensions, Select } from "./types";

export enum ActionTypes {
  SET_CONTAINER_DIMENSIONS = "SET_CONTAINER_DIMENSIONS",
  SELECT = "SELECT",
  CHOOSE_TARGET = "CHOOSE_TARGET",
  CLEAR_SELECTION = "CLEAR_SELECTION"
}

export type Action =
  | SetContainerDimensions
  | Select
  | ChooseTarget
  | ClearSelection;

interface SetContainerDimensions {
  type: ActionTypes.SET_CONTAINER_DIMENSIONS;
  dimensions: Dimensions.Dimensions;
}

interface Select {
  type: ActionTypes.SELECT;
  selection: Select.Selection;
}

interface ChooseTarget {
  type: ActionTypes.CHOOSE_TARGET;
  target: Select.Target;
}

interface ClearSelection {
  type: ActionTypes.CLEAR_SELECTION;
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
