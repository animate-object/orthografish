import { Maybe } from ".";

export const nOf = <T>(n: number, t: T): Array<T> => new Array(n).fill(t);

export const sorted = <T>(
  unsorted: Array<T>,
  sortFn?: (a: T, b: T) => number
): Array<T> => {
  const sorted = [...unsorted];
  sorted.sort(sortFn);
  return sorted;
};

export const nonNull = <T>(array: Array<Maybe.Maybe<T>>): Array<T> =>
  array.filter(t => t != null) as Array<T>;

export const randomItem = <T>(array: Array<T>): T =>
  array[Math.floor(Math.random() * array.length)];
