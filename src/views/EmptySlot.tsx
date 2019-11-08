import * as React from "react";
import { connect } from "react-redux";
import { Dimensions, Handler, Effect } from "../types";
import { State } from "../state";
import { getLetterDimensions } from "../selectors";

interface StateProps {
  dimensions: Dimensions.Dimensions;
}

interface OwnProps {
  onClick: Effect.Effect0;
}

type Props = StateProps & OwnProps;

export const EmptySlot = ({ dimensions, onClick }: Props) => (
  <div style={{ ...dimensions }} onClick={Handler.noPropagate(onClick)} />
);

const mapStateToProps = (state: State, _: OwnProps): StateProps => ({
  dimensions: getLetterDimensions(state)
});
export default connect(mapStateToProps)(EmptySlot);
