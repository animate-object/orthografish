import React from "react";
import { ArrayUtils, Letter } from "../../common/types";
import FreeLetter from "./FreeLetter";
import "./FreeSpace.css";

interface Props {
  freeLetters: Letter.Letter[];
}

export const FreeSpace = ({ freeLetters }: Props) => (
  <div className="FreeSpace">
    {ArrayUtils.sorted(freeLetters, Letter.sort).map(l => (
      <React.Fragment key={l.id}>
        <FreeLetter letter={l} />
      </React.Fragment>
    ))}
  </div>
);
