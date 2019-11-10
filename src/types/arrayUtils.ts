export const nOf = <T>(n: number, t: T): Array<T> => new Array(n).fill(t);

export const sorted = <T>(
  unsorted: Array<T>,
  sortFn?: (a: T, b: T) => number
): Array<T> => {
  const sorted = [...unsorted];
  sorted.sort(sortFn);
  return sorted;
};
