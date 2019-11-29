export type Success<T> = { type: "success"; value: T };
export type Error = { type: "error"; e: any };
export type Result<T> = Success<T> | Error;

export const success = <T>(value: T): Success<T> => ({
  type: "success",
  value
});

export const error = (e?: any): Error => ({ type: "error", e });

export const isSuccess = <T>(result: Result<T>): result is Success<T> =>
  result.type === "success";

export const isError = <T>(result: Result<T>): result is Error =>
  result.type === "error";
