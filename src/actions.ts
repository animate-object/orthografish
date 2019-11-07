import { Dimensions } from "./types";

export enum ActionTypes {
  SET_CONTAINER_DIMENSIONS = "SET_CONTAINER_DIMENSIONS"
}

export type Action = SetContainerDimensions;

interface SetContainerDimensions {
  type: ActionTypes.SET_CONTAINER_DIMENSIONS;
  dimensions: Dimensions.Dimensions;
}

export const setContainerDimensions = (
  dimensions: Dimensions.Dimensions
): SetContainerDimensions => ({
  type: ActionTypes.SET_CONTAINER_DIMENSIONS,
  dimensions
});
