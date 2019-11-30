import React from "react";
import { Header } from "../../common/design/Header";

interface Props {
  prefix?: string;
  wordLength: number;
}

export const LearnerHeader = ({ prefix, wordLength }: Props): JSX.Element => (
  <Header>{`${wordLength} letter words starting with ${prefix ||
    "..."}`}</Header>
);
