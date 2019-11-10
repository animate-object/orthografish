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
  onClose
}: Props): JSX.Element => (
  <Modal
    title="Spelled so far"
    visible={visible}
    actions={<Button onClick={onClose}>Spell some more!</Button>}
  >
    {spelled.map(word => (
      <div key={word}>{word}</div>
    ))}
    {spelled.length <= 0 && "You haven't spelled anything yet."}
    <br />
  </Modal>
);

const mapStateToProps = (state: State): StateProps => ({
  spelled: getSpelled(state),
  visible: getShowSpelled(state),
  totalCount: getTotalWords(state)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onClose: () => dispatch(showSpelled(false))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpelledModal);
