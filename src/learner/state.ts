const DEFAULT_PREFIX_PARAMS = {
  prefixLength: 2,
  wordLength: 4
};

const getParams = (): Record<string, string> => {
  const search = window.location.href.slice(
    window.location.href.indexOf("?") + 1
  );

  try {
    const paramList = search.indexOf("=") >= 0 ? search.split("&") : [];
    const params = paramList.reduce((acc: Record<string, string>, cur) => {
      if (cur.indexOf("=") >= 0) {
        const parts = cur.split("=");
        acc[parts[0]] = parts[1];
      }
      return acc;
    }, {});

    return params;
  } catch (e) {
    console.error("Failed to parse search string " + search);
    return {};
  }
};

const defaultPrefixparams = () => {
  const params = getParams();
  const prefixLengthArg = parseInt(params["p"]);
  const wordLengthArg = parseInt(params["w"]);
  const prefixLength = !Number.isNaN(prefixLengthArg)
    ? Math.min(Math.max(prefixLengthArg, 0), 4)
    : DEFAULT_PREFIX_PARAMS.prefixLength;
  const wordLength = !Number.isNaN(wordLengthArg)
    ? Math.min(Math.max(wordLengthArg, 0), 6)
    : DEFAULT_PREFIX_PARAMS.wordLength;

  return { prefixLength, wordLength };
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
  gameOver: boolean;
}

export const create = (init: Partial<State> = {}): State => ({
  unspelled: new Set(),
  spelled: new Set(),
  missed: new Set(),
  spellState: "Spelling",
  blankValue: "",
  prefixParams: defaultPrefixparams(),
  gameOver: false,
  ...init
});

export const startNewGame = (
  state: State,
  prefix: string,
  words: string[]
): State => ({
  ...create({
    unspelled: new Set(words),
    prefix: prefix,
    gameOver: false,
    prefixParams: state.prefixParams
  })
});

export const endGame = (state: State) => ({ ...state, gameOver: true });

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

  const updated = { ...state, spellState, lastSpelled: word };

  switch (spellState) {
    case "Correct":
      return {
        ...updated,
        unspelled: newSetWithoutEntry(state.unspelled, word),
        spelled: newSetWithEntry(state.spelled, word)
      };
    case "Previous":
      return updated;
    case "Incorrect":
      return {
        ...updated,
        missed: newSetWithEntry(state.missed, word)
      };
  }
};
