import React from "react";
import { Header } from "../../common/design/Header";
import "./LearnerHeader.css";
import { Effect } from "../../common/types";
import { Button } from "../../common/design";

interface Props {
  prefix?: string;
  wordLength: number;
  unspelledCount: number;
  spelledCount: number;
  onShowSpelled: Effect.Effect0;
}

export const LearnerHeader = ({
  prefix,
  wordLength,
  unspelledCount,
  spelledCount,
  onShowSpelled
}: Props): JSX.Element => (
  <Header>
    There {unspelledCount === 1 ? "is" : "are"}{" "}
    <span className="LeftToSpell">
      {unspelledCount === 0 ? "no" : unspelledCount}
    </span>{" "}
    {`more ${wordLength} letter ${unspelledCount === 1 ? "word" : "words"}
    starting with`}{" "}
    <span className="HeaderPrefix">{prefix || "..."}</span>
    {spelledCount > 0 && (
      <div>
        <Button size="Small" buttonType="Accent" onClick={onShowSpelled}>
          You've spelled {spelledCount}
        </Button>
      </div>
    )}
  </Header>
);
