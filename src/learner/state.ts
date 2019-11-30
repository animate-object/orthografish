const DEFAULT_PREFIX_PARAMS = {
  prefixLength: 2,
  wordLength: 4
};

export interface PrefixParams {
  prefixLength: number;
  wordLength: number;
}

export type SpellState = "Spelling" | "Correct" | "Incorrect";

export interface State {
  unspelled: string[];
  spelled: string[];
  missed: string[];
  spellState: SpellState;
  prefixParams: PrefixParams;
  blankValue: string;
  prefix?: string;
}

export const create = (init: Partial<State> = {}): State => ({
  unspelled: [],
  spelled: [],
  missed: [],
  spellState: "Spelling",
  blankValue: "",
  prefixParams: DEFAULT_PREFIX_PARAMS,
  ...init
});

export const changeInput = (state: State, newValue: string): State => {
  const maxBlankLength =
    state.prefixParams.wordLength - state.prefixParams.prefixLength;

  const trimmed = newValue.slice(0, maxBlankLength);

  return { ...state, blankValue: trimmed };
};
