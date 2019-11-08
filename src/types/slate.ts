import { Letter, Maybe, Result, UUID } from "./index";

export interface Slate {
  contents: Array<Maybe.Maybe<Letter.Letter>>;
  slotIds: UUID.UUID[];
  size: number;
}

export const create = (
  size: number,
  contents?: Array<Maybe.Maybe<Letter.Letter>>
): Slate => ({
  contents: contents || new Array(size).fill(undefined),
  slotIds: new Array(size).fill(undefined).map(() => UUID.create()),
  size
});

export const slotId = (slate: Slate, n: number): Maybe.Maybe<UUID.UUID> => {
  if (n <= slate.size && n >= 0) {
    return slate.slotIds[n];
  }
};

type InsertData = [Slate, Maybe.Maybe<Letter.Letter>];
export const insert = (
  { size, contents, slotIds }: Slate,
  letter: Maybe.Maybe<Letter.Letter>,
  slotId: UUID.UUID
): Result.Result<InsertData> => {
  const idx = slotIds.indexOf(slotId);

  if (idx >= 0 && idx < size) {
    const newContents = [
      ...contents.slice(0, idx),
      letter,
      ...contents.slice(idx + 1)
    ];
    const newSlate = { size, contents: newContents, slotIds };
    const oldLetterAtIdx = contents[idx] || undefined;
    return Result.success([newSlate, oldLetterAtIdx]);
  } else {
    return Result.error();
  }
};

export const swap = (
  { contents, slotIds, size }: Slate,
  firstId: UUID.UUID,
  secondId: UUID.UUID
): Slate => {
  const firstIdx = slotIds.indexOf(firstId);
  const secondIdx = slotIds.indexOf(secondId);

  if (firstIdx >= 0 && secondIdx >= 0) {
    return {
      slotIds,
      size,
      contents: contents.map((c, idx) =>
        idx === firstIdx
          ? contents[secondIdx]
          : idx === secondIdx
          ? contents[firstIdx]
          : c
      )
    };
  } else {
    return { slotIds, size, contents };
  }
};
