import { Action, ActionTypes, select } from "./actions";
import { State, create } from "./state";
import { Select, UUID, Slate, Result, Maybe } from "./types";
import { slotId } from "./types/slate";
import { stat } from "fs";

export const reducer = (state: State = create(), action: Action): State => {
  switch (action.type) {
    case ActionTypes.SET_CONTAINER_DIMENSIONS:
      return { ...state, containerDimensions: action.dimensions };
    case ActionTypes.SELECT:
      return { ...state, selected: action.selection };
    case ActionTypes.CHOOSE_TARGET:
      return chooseTarget(state, action.target.type, action.target.id);
    case ActionTypes.CLEAR_SELECTION:
      return { ...state, selected: undefined };
    default:
      return state;
  }
};

const clearSelection = (state: State): State => ({
  ...state,
  selected: undefined
});

const chooseTarget = (
  state: State,
  targetType: Select.TargetType,
  targetId: UUID.UUID
): State => {
  if (!state.selected) {
    return state;
  }

  switch (state.selected.type) {
    case "FreeLetter":
      return targetType === "SlateSlot"
        ? fillSlotWithLetter(state, targetId, state.selected.id)
        : state;
    case "SlateSlot":
      return slotSelected(state, targetType, targetId);
    default:
      return state;
  }
};

const fillSlotWithLetter = (
  state: State,
  slotId: UUID.UUID,
  letterId: UUID.UUID
): State => {
  const letter = state.freeLetters.find(l => l.id === letterId);
  if (!letter) {
    return state;
  }
  const freeLetters = state.freeLetters.filter(l => l.id !== letterId);
  const insertResult = Slate.insert(state.slate, letter, slotId);

  if (Result.isError(insertResult)) {
    return state;
  }

  const [slate, maybePopped] = insertResult.value;

  if (maybePopped) {
    freeLetters.push(maybePopped);
  }

  return clearSelection({ ...state, freeLetters, slate });
};

const slotSelected = (
  state: State,
  targetType: Select.TargetType,
  targetId: UUID.UUID
): State => {
  switch (targetType) {
    case "FreeSpace":
      return moveSelectedSlotToFreeSpace(state);
    case "SlateSlot":
      return swapSlots(state, targetId);
    case "FreeLetter":
      return fillSlotWithLetter(state, state.selected!.id, targetId);
    default:
      return state;
  }
};

const swapSlots = (state: State, targetSlotId: UUID.UUID): State =>
  clearSelection({
    ...state,
    slate: Slate.swap(state.slate, targetSlotId, state.selected!.id)
  });

const moveSelectedSlotToFreeSpace = (state: State): State => {
  const removeResult = Slate.insert(
    state.slate,
    Maybe.none(),
    state.selected!.id
  );

  if (Result.isError(removeResult)) {
    return state;
  }

  const [slate, maybeRemoved] = removeResult.value;

  return clearSelection({
    ...state,
    slate,
    freeLetters: maybeRemoved
      ? [...state.freeLetters, maybeRemoved]
      : state.freeLetters
  });
};
