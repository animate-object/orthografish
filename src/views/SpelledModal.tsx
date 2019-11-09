import React from "react";
import { Modal } from "./Modal";
import { Button } from "./Button";
import { Effect } from "../types";
import { connect } from "react-redux";
import { getSpelled, getShowSpelled, getTotalWords } from "../selectors";
import { Dispatch } from "redux";
import { showSpelled } from "../actions";
import { State } from "../state";
import "./SpelledModal.css";

interface StateProps {
  spelled: string[];
  visible: boolean;
  totalCount: number;
}

interface DispatchProps {
  onClose: Effect.Effect0;
}

type Props = StateProps & DispatchProps;

export const SpelledModal = ({
  spelled,
  visible,
  totalCount,
  onClose
}: Props): JSX.Element => (
  <Modal visible={visible}>
    {spelled.length > 0 && (
      <div className="Title">
        You've spelled {spelled.length} of {totalCount}
      </div>
    )}
    {spelled.map(word => (
      <div>{word}</div>
    ))}
    {spelled.length <= 0 && (
      <>
        You haven't spelled anything yet.
        <br /> Maybe you should . . . <br />
      </>
    )}
    <br />
    <Button onClick={onClose}>Spell some more!</Button>
  </Modal>
);

export const mapStateToProps = (state: State): StateProps => ({
  spelled: getSpelled(state),
  visible: getShowSpelled(state),
  totalCount: getTotalWords(state)
});

export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onClose: () => dispatch(showSpelled(false))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpelledModal);
