const DEFAULT_PREFIX_PARAMS = {
  prefixLength: 2,
  wordLength: 4
};

export interface PrefixParams {
  prefixLength: number;
  wordLength: number;
}

export type SpellState = "Spelling" | "Correct" | "Incorrect" | "Previous";

export interface State {
  unspelled: Set<string>;
  spelled: Set<string>;
  missed: Set<string>;
  spellState: SpellState;
  lastSpelled?: string;
  prefixParams: PrefixParams;
  blankValue: string;
  prefix?: string;
}

export const create = (init: Partial<State> = {}): State => ({
  unspelled: new Set(),
  spelled: new Set(),
  missed: new Set(),
  spellState: "Spelling",
  blankValue: "",
  prefixParams: DEFAULT_PREFIX_PARAMS,
  ...init
});

export const startNewGame = (
  state: State,
  prefix: string,
  words: string[]
): State => ({
  ...state,
  unspelled: new Set(words),
  prefix: prefix
});

export const changeInput = (state: State, newValue: string): State => {
  const maxBlankLength =
    state.prefixParams.wordLength - state.prefixParams.prefixLength;

  const trimmed = newValue.slice(0, maxBlankLength);

  return { ...state, blankValue: trimmed };
};

const newSetWithoutEntry = <T>(set: Set<T>, toRemove: T): Set<T> => {
  return new Set(Array.from(set).filter(item => item !== toRemove));
};

const newSetWithEntry = <T>(set: Set<T>, toAdd: T): Set<T> => {
  return new Set([...Array.from(set), toAdd]);
};

export const spell = (state: State): State => {
  const word = state.prefix + state.blankValue;
  const spellState: SpellState = state.unspelled.has(word)
    ? "Correct"
    : state.spelled.has(word)
    ? "Previous"
    : "Incorrect";

  switch (spellState) {
    case "Correct":
      return {
        ...state,
        unspelled: newSetWithoutEntry(state.unspelled, word),
        spelled: newSetWithEntry(state.spelled, word),
        lastSpelled: word,
        spellState
      };
    case "Previous":
      return {
        ...state,
        lastSpelled: word,
        spellState
      };
    case "Incorrect":
      return {
        ...state,
        missed: newSetWithEntry(state.missed, word),
        lastSpelled: word,
        spellState
      };
  }
};
