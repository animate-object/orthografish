import React from "react";
import { Modal } from "./Modal";
import { State } from "../state";
import { getCurrentWord, getShouldShowDefinition } from "../selectors";
import { Dispatch } from "redux";
import { showDefinition } from "../actions";
import { Effect } from "../types";
import { connect } from "react-redux";
import { Button } from "./Button";
import "./DefinitionModal.css";

interface StateProps {
  word: string;
  visible: boolean;
}

interface DispatchProps {
  onClose: Effect.Effect0;
}

type Props = StateProps & DispatchProps;

export const ProbablyLegalDefinitionModal = ({
  word,
  visible,
  onClose
}: Props): JSX.Element => (
  <Modal visible={visible}>
    <iframe
      title="Thanks Jimmy Wales"
      className="GuestContent"
      src={`https://en.wiktionary.org/wiki/${word}#English`}
    />
    <Button className="Close" onClick={onClose}>
      Back to the Game
    </Button>
  </Modal>
);

const mapStateToProps = (state: State): StateProps => ({
  word: getCurrentWord(state),
  visible: getShouldShowDefinition(state)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onClose: () => dispatch(showDefinition(false))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProbablyLegalDefinitionModal);
