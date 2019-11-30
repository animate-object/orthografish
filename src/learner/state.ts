export interface Params {
  length: number;
  startsWith: string;
  total: number;
}

export type SpellState = "Spelling" | "Correct" | "Incorrect";

export interface State {
  unspelled: string[];
  spelled: string[];
  missed: string[];
  spellState: SpellState;
  params?: Params;
}

export const create = (init: Partial<State> = {}): State => ({
  unspelled: [],
  spelled: [],
  missed: [],
  spellState: "Spelling",
  ...init
});
