import { UUID, Letter } from ".";

enum Alpha {
  A = "a",
  B = "b",
  C = "c",
  D = "d",
  E = "e",
  F = "f",
  G = "g",
  H = "h",
  I = "i",
  J = "j",
  K = "k",
  L = "l",
  M = "m",
  N = "n",
  O = "o",
  P = "p",
  Q = "q",
  R = "r",
  S = "s",
  T = "t",
  U = "u",
  V = "v",
  W = "w",
  X = "x",
  Y = "y",
  Z = "z"
}

export interface Letter {
  alpha: Alpha;
  id: UUID.UUID;
}

export const create = (alpha: Alpha | string): Letter => {
  return {
    alpha: alpha as Alpha,
    id: UUID.create()
  };
};

const SCORES: Record<Alpha, number> = {
  a: 1,
  e: 1,
  i: 1,
  o: 1,
  u: 1,
  l: 1,
  n: 1,
  s: 1,
  t: 1,
  r: 1,
  d: 2,
  g: 2,
  b: 3,
  c: 3,
  m: 3,
  p: 3,
  f: 4,
  h: 4,
  v: 4,
  w: 4,
  y: 4,
  k: 5,
  j: 8,
  x: 8,
  q: 10,
  z: 10
};

export const score = (alpha: Alpha): number => {
  return SCORES[alpha];
};

export const scoreWord = (letters: string): number => {
  return letters
    .split("")
    .map(l => l as Alpha)
    .reduce((acc: number, l: Alpha) => {
      const val = SCORES[l];
      return acc + val;
    }, 0);
};

const VOWELS: Alpha[] = [Alpha.A, Alpha.E, Alpha.I, Alpha.O, Alpha.U, Alpha.Y];

// eslint-disable-next-line
const _CLASSIC_COUNTS: Record<Alpha, number> = {
  a: 9,
  b: 2,
  c: 2,
  d: 4,
  e: 12,
  f: 2,
  g: 3,
  h: 2,
  i: 9,
  j: 1,
  k: 1,
  l: 4,
  m: 2,
  n: 6,
  o: 8,
  p: 2,
  q: 1,
  r: 6,
  s: 4,
  t: 6,
  u: 4,
  v: 2,
  w: 2,
  x: 1,
  y: 2,
  z: 1
};

const _CHALLENGE_COUNTS: Record<Alpha, number> = {
  a: 3,
  b: 2,
  c: 2,
  d: 4,
  e: 3,
  f: 2,
  g: 3,
  h: 2,
  i: 3,
  j: 1,
  k: 1,
  l: 4,
  m: 2,
  n: 3,
  o: 3,
  p: 2,
  q: 1,
  r: 6,
  s: 4,
  t: 6,
  u: 3,
  v: 2,
  w: 2,
  x: 1,
  y: 2,
  z: 1
};

export const BAG: Array<Alpha> = Object.keys(_CHALLENGE_COUNTS)
  .map(l => l as Alpha)
  .reduce((acc: Alpha[], l: Alpha) => {
    return [...acc, ...new Array(_CHALLENGE_COUNTS[l]).fill(l)];
  }, []);

export interface DrawResult {
  left: Letter[];
  drawn: Letter[];
}
export const draw = (n: number): { left: Letter[]; drawn: Letter[] } => {
  const vowel = VOWELS[Math.floor(Math.random() * VOWELS.length)];
  const firstVowel = BAG.findIndex(l => l === vowel);
  const afterVowel = [
    ...BAG.slice(0, firstVowel),
    ...BAG.slice(firstVowel + 1)
  ];

  const { left, drawn } = new Array(n - 1).fill(0).reduce(
    ({ left, drawn }: { left: Letter[]; drawn: Letter[] }, _) => {
      const idx = Math.floor(Math.random() * left.length);
      const newLeft = [...left.slice(0, idx), ...left.slice(idx + 1)];
      return {
        left: newLeft,
        drawn: [...drawn, left[idx]]
      };
    },
    { left: afterVowel, drawn: [vowel] }
  );

  return {
    left: left.map((a: Alpha) => create(a)),
    drawn: drawn.map((a: Alpha) => create(a))
  };
};

export const sort = (a: Letter, b: Letter): number =>
  a.alpha > b.alpha ? 1 : -1;

export const toString = (...letters: Letter[]): string =>
  letters.map(l => l.alpha).join("");

export const fromString = (str: string): Letter[] => str.split("").map(create);
