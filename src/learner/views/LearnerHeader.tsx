import React from "react";
import { Header } from "../../common/design/Header";
import "./LearnerHeader.css";

interface Props {
  prefix?: string;
  wordLength: number;
  unspelledCount: number;
}

export const LearnerHeader = ({
  prefix,
  wordLength,
  unspelledCount
}: Props): JSX.Element => (
  <Header>
    There {unspelledCount === 1 ? "is" : "are"}{" "}
    <span className="LeftToSpell">{unspelledCount}</span>{" "}
    {`more ${wordLength} letter ${unspelledCount === 1 ? "word" : "words"}
    starting with ${prefix || "..."}`}
  </Header>
);
