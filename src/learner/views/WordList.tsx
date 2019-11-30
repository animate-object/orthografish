import React from "react";
import { ArrayUtils } from "../../common/types";

export const WordList = (props: { words: string[] }): JSX.Element => (
  <>
    {ArrayUtils.sorted(props.words).map(word => (
      <div key={word}>{word}</div>
    ))}
  </>
);
