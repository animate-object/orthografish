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
    </span>
    {spellState === "New" && (
      <span className="Score">{`${wordScore} points!`}</span>
    )}
    {spellState === "Previous" && (
      <span className="PreviouslySpelled">You already spelled this word.</span>
    )}
    {spellState === "Missed" && (
      <span className="Missed">That's not a word!</span>
    )}
    {spellState === "Spelling" && <span>Letp's spell!</span>}
    <span>You have {unspelled.length} words to go.</span>
  </>
);
