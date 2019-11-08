import { Dimensions, Effect, Maybe, Handler } from "../types";
import * as React from "react";
import { Letter as LetterType } from "../types";
import { connect } from "react-redux";
import { State } from "../state";
import { getLetterDimensions } from "../selectors";
import "./Letter.css";
import classNames from "classnames";

interface OwnProps {
  letter: LetterType.Letter;
  isSelected?: boolean;
  isTargetable?: boolean;
  onClick?: Effect.Effect0;
}

interface StateProps {
  dimensions: Dimensions.Dimensions;
}

type Props = OwnProps & StateProps;

const Letter = ({
  dimensions,
  isSelected,
  isTargetable,
  letter,
  onClick
}: Props): JSX.Element => (
  <div
    className={classNames("Letter", {
      Selected: isSelected,
      Targetable: isTargetable
    })}
    style={{ ...dimensions }}
    onClick={Handler.noPropagate(() => onClick && onClick())}
  >
    <span style={{ fontSize: `${0.8 * dimensions.width}px` }}>
      {letter && letter.alpha}
    </span>
  </div>
);

const mapStateToProps = (state: State, _: OwnProps): StateProps => ({
  dimensions: getLetterDimensions(state)
});

export default connect(mapStateToProps)(Letter);
