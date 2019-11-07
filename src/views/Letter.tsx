import { Dimensions } from "../types";
import * as React from "react";
import { Letter as LetterType } from "../types";
import { connect } from "react-redux";
import { State } from "../state";
import { getLetterDimensions } from "../selectors";
import "./Letter.css";

interface OwnProps {
  letter: LetterType.Letter;
}

interface StateProps {
  dimensions: Dimensions.Dimensions;
}

type Props = OwnProps & StateProps;

const Letter = ({ dimensions, letter }: Props): JSX.Element => (
  <div className="Letter" style={{ ...dimensions }}>
    <span style={{ fontSize: `${0.8 * dimensions.width}px` }}>
      {letter.alpha}
    </span>
  </div>
);

const mapStateToProps = (state: State, _: OwnProps): StateProps => ({
  dimensions: getLetterDimensions(state)
});

export default connect(mapStateToProps)(Letter);
