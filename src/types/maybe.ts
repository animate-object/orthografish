export type Maybe<T> = T | undefined | null;

export const of = <T>(value: T | undefined | null): Maybe<T> => value;
export const none = <T>(): Maybe<T> => undefined;
export const withDefault = <T>(maybe: Maybe<T>, default_: T): T =>
  maybe != null ? maybe : default_;
export const map = <T, R>(f: (t: T) => R, maybe: Maybe<T>): Maybe<R> =>
  maybe != null ? f(maybe) : undefined;

export const ifPresent = <T>(f: (t: T) => void, maybe: Maybe<T>): void => {
  if (maybe) {
    f(maybe);
  }
};
