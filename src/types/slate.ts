import { Letter, Maybe, Result } from "./index";

export interface Slate {
  contents: Letter.Letter[];
  size: number;
}

export const create = (
  size: number,
  contents?: Array<Maybe.Maybe<Letter.Letter>>
): Slate => ({
  contents: contents || new Array(size),
  size
});

type InsertData = [Slate, Maybe.Maybe<Letter.Letter>];
export const insert = (
  { size, contents }: Slate,
  letter: Letter.Letter,
  idx: number
): Result.Result<InsertData> => {
  if (idx > 0 && idx < size) {
    const newContents = [
      ...contents.slice(0, idx),
      letter,
      ...contents.slice(idx + 1)
    ];
    const newSlate = create(size, newContents);
    const oldLetterAtIdx = contents[idx] || undefined;
    return Result.success([newSlate, oldLetterAtIdx]);
  } else {
    return Result.error();
  }
};
