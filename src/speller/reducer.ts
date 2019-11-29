import { Action, ActionTypes } from "./actions";
import { State, create, N_LETTERS } from "./state";
import {
  Select,
  UUID,
  Slate,
  Result,
  Maybe,
  ArrayUtils
} from "../common/types";

export const reducer = (state: State = create(), action: Action): State => {
  console.log(action);
  switch (action.type) {
    case ActionTypes.SET_CONTAINER_DIMENSIONS:
      return { ...state, containerDimensions: action.dimensions };
    case ActionTypes.SELECT:
      return { ...state, selected: action.selection };
    case ActionTypes.CHOOSE_TARGET:
      const updated = chooseTarget(state, action.target.type, action.target.id);
      return {
        ...updated,
        spells: Slate.spells(updated.slate),
        spellState: "Spelling"
      };
    case ActionTypes.SUBMIT_WORD:
      return updateSpelled(state);
    case ActionTypes.CLEAR_SELECTION:
      return { ...state, selected: undefined };
    case ActionTypes.CLEAR_SLATE:
      return {
        ...state,
        freeLetters: [
          ...state.freeLetters,
          ...ArrayUtils.nonNull(state.slate.contents)
        ],
        slate: Slate.create(N_LETTERS),
        spells: "",
        spellState: "Spelling"
      };
    case ActionTypes.FETCH_WORDS:
      return { ...state, fetchState: "Pending" };
    case ActionTypes.FETCH_IS_SLOW:
      return { ...state, fetchState: "StillPending" };
    case ActionTypes.FETCH_WORDS_SUCCESS:
      return {
        ...state,
        fetchState: "Fetched"
      };
    case ActionTypes.FETCH_WORDS_FAILED:
      return { ...state, fetchState: "Errored" };
    case ActionTypes.GIVE_UP:
      return { ...state, hasGivenUp: true };
    case ActionTypes.REQUEST_NEW_GAME:
      return create({ containerDimensions: state.containerDimensions });
    case ActionTypes.START_NEW_GAME:
      return {
        ...state,
        freeLetters: action.drawn,
        bag: action.bag,
        unspelled: new Set(action.words)
      };
    case ActionTypes.SHOW_SPELLED:
      return { ...state, showSpelled: action.show };
    case ActionTypes.SHOW_DEFINITION:
      return {
        ...state,
        showDefinition:
          state.spellState === "New" || state.spellState === "Previous"
            ? action.show
            : false
      };
    default:
      return state;
  }
};

const clearSelection = (state: State): State => ({
  ...state,
  selected: undefined
});

const updateSpelled = (state: State): State => {
  const inUnspelled = state.unspelled.has(state.spells);
  const inSpelled = state.spelled.has(state.spells);
  const newUnspelled = new Set(state.unspelled);
  const newSpelled = new Set(state.spelled);
  const newMissed = new Set(state.missed);

  if (inUnspelled && !inSpelled) {
    newUnspelled.delete(state.spells);
    newSpelled.add(state.spells);
    return {
      ...state,
      unspelled: newUnspelled,
      spelled: newSpelled,
      spellState: "New"
    };
  } else if (inSpelled) {
    return { ...state, spellState: "Previous" };
  } else {
    newMissed.add(state.spells);
    return { ...state, spellState: "Missed", missed: newMissed };
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
