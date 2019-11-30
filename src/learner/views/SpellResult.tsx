import React from "react";
import "./SpellResult.css";
import { SpellState } from "../state";
import { WordLink } from "./WordLink";
import classNames from "classnames";

interface Props {
  spellState: SpellState;
  lastSpelled?: string;
}

export const SpellResult = ({
  spellState,
  lastSpelled
}: Props): JSX.Element => (
  <div
    className={classNames("SpellResult", {
      Correct: spellState === "Correct",
      Incorrect: spellState === "Incorrect",
      Previous: spellState === "Previous"
    })}
  >
    {spellState === "Correct" && lastSpelled && (
      <span>
        <WordLink>{lastSpelled}</WordLink> is a word!
      </span>
    )}
    {spellState === "Incorrect" && (
      <span>Sorry! {lastSpelled} is not a word.</span>
    )}
    {spellState === "Previous" && lastSpelled && (
      <span>
        You already spelled <WordLink>{lastSpelled}</WordLink>
      </span>
    )}
  </div>
);
