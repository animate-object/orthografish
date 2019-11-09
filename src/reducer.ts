import { Action, ActionTypes } from "./actions";
import { State, create } from "./state";
import { Select, UUID, Slate, Result, Maybe } from "./types";

export const reducer = (state: State = create(), action: Action): State => {
  switch (action.type) {
    case ActionTypes.SET_CONTAINER_DIMENSIONS:
      return { ...state, containerDimensions: action.dimensions };
    case ActionTypes.SELECT:
      return { ...state, selected: action.selection };
    case ActionTypes.CHOOSE_TARGET:
      const updated = chooseTarget(state, action.target.type, action.target.id);
      const spells = { ...updated, spells: Slate.spells(updated.slate) };
      return updateSpelled(spells);
    case ActionTypes.CLEAR_SELECTION:
      return { ...state, selected: undefined };
    case ActionTypes.FETCH_WORDS:
      return { ...state, fetchState: "Pending" };
    case ActionTypes.FETCH_WORDS_SUCCESS:
      return { ...state, unspelled: action.words, spelled: [] };
    case ActionTypes.FETCH_WORDS_FAILED:
      return { ...state, fetchState: "Errored" };
    case ActionTypes.GIVE_UP:
      return { ...state, hasGivenUp: true };
    case ActionTypes.NEW_GAME:
      return create({ containerDimensions: state.containerDimensions });
    case ActionTypes.SHOW_SPELLED:
      return { ...state, showSpelled: action.show };
    default:
      return state;
  }
};

const clearSelection = (state: State): State => ({
  ...state,
  selected: undefined
});

const updateSpelled = (state: State): State => {
  const unspelledIdx = state.unspelled.indexOf(state.spells);
  const spelledIdx = state.spelled.indexOf(state.spells);

  if (unspelledIdx >= 0 && spelledIdx < 0) {
    return {
      ...state,
      unspelled: state.unspelled.filter(word => word !== state.spells),
      spelled: [...state.spelled, state.spells],
      spellState: "New"
    };
  } else if (spelledIdx >= 0) {
    return { ...state, spellState: "Previous" };
  } else {
    return { ...state, spellState: "Nothing" };
  }
};

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
