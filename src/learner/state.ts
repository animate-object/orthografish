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
  prefix?: string;
}

export const create = (init: Partial<State> = {}): State => ({
  unspelled: [],
  spelled: [],
  missed: [],
  spellState: "Spelling",
  prefixParams: DEFAULT_PREFIX_PARAMS,
  ...init
});
