export const nOf = <T>(n: number, t: T): Array<T> => new Array(n).fill(t);

export const sorted = <T>(unsorted: Array<T>): Array<T> => {
  const sorted = [...unsorted];
  sorted.sort();
  return sorted;
};
