import React from "react";
import { SpellState } from "../state";
import classNames from "classnames";
import { Maybe } from "../types";
import "./GameInfo.css";

interface Props {
  wordIsValid: boolean;
  spellState: SpellState;
  spells: string;
  wordScore: Maybe.Maybe<number>;
  unspelled: string[];
}

export const GameInfo = ({
  wordIsValid,
  spellState,
  spells,
  wordScore,
  unspelled
}: Props) => (
  <>
    <span
      className={classNames("Spells", {
        NewScore: wordIsValid && spellState === "New"
      })}
    >
      {spells}
      {wordIsValid &&
        (spellState === "New" ? (
          <span className="Score">{`${wordScore} points!`}</span>
        ) : (
          <span className="PreviouslySpelled">
            You already spelled this word.
          </span>
        ))}
    </span>
    <span>You have {unspelled.length} words left to spell.</span>
  </>
);
