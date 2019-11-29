import * as Slate from "../slate";
import { Result, Letter } from "..";

describe("Slate", () => {
  const a = Letter.create("a");
  const b = Letter.create("b");
  const g = Letter.create("g");
  describe(Slate.insert, () => {
    const partialSlate = Slate.create(7, [
      a,
      b,
      undefined,
      undefined,
      undefined,
      g,
      undefined
    ]);

    it("inserts a value in an empty slot", () => {
      const result = Slate.insert(partialSlate, a, 3);
      if (!Result.isSuccess(result)) {
        return fail();
      }
      const [newSlate, removed] = result.value;
      expect(newSlate.contents).toEqual([
        a,
        b,
        undefined,
        a,
        undefined,
        g,
        undefined
      ]);
      expect(removed).toBeUndefined();
    });

    it("does not insert out of range values", () => {
      const negative = Slate.insert(partialSlate, a, -1);
      expect(Result.isError(negative)).toBeTruthy();

      const toBig = Slate.insert(partialSlate, a, 8);
      expect(Result.isError(toBig)).toBeTruthy();
    });

    it("replaces the letter in the slate and resturns the replaced letter", () => {
      const result = Slate.insert(partialSlate, a, 1);
      if (!Result.isSuccess(result)) {
        return fail();
      }
      const [newSlate, removed] = result.value;

      expect(newSlate.contents).toEqual([
        a,
        a,
        undefined,
        undefined,
        undefined,
        g,
        undefined
      ]);
      expect(removed).toEqual(b);
    });
  });
});
