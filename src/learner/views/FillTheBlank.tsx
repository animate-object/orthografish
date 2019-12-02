import React from "react";
import { SizedInput } from "./SizedInput";
import "./FillTheBlank.css";
import { Effect } from "../../common/types";

interface Props {
  prefix: string;
  wordLength: number;
  blankValue: string;
  onChange: Effect.Effect<string>;
  onEnter: Effect.Effect<string>;
  inputRef: React.RefObject<HTMLInputElement>;
}

export class FillTheBlank extends React.PureComponent<Props> {
  render() {
    const {
      prefix,
      wordLength,
      blankValue,
      onChange,
      inputRef,
      onEnter
    } = this.props;
    return (
      <div className="FillTheBlank">
        <span>{prefix}</span>
        <SizedInput
          inputRef={inputRef}
          classes={["FillTheBlankInput"]}
          letterCount={wordLength - prefix.length}
          spacing={2}
          value={blankValue}
          onEnter={onEnter}
          onChange={val => onChange(val.toLowerCase())}
        />
      </div>
    );
  }
}
