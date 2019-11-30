import React from "react";
import { ArrayUtils } from "../../common/types";
import { WordLink } from "./WordLink";

interface Props {
  words: string[];
  link?: boolean;
}

export const WordList = ({ words, link }: Props): JSX.Element => (
  <>
    {ArrayUtils.sorted(words).map(word =>
      link ? (
        <>
          <WordLink key={word}>{word}</WordLink>
          <br />
        </>
      ) : (
        <div key={word}>{word}</div>
      )
    )}
  </>
);
