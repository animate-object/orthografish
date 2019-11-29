import React from "react";
import { Modal, Button } from "../../common/design";
import { State } from "../state";
import { getCurrentWord, getShouldShowDefinition } from "../selectors";
import { Dispatch } from "redux";
import { showDefinition } from "../actions";
import { Effect } from "../../common/types";
import { connect } from "react-redux";
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
  <Modal
    title={"Definition"}
    visible={visible}
    actions={
      <Button className="Close" onClick={onClose}>
        Back to the Game
      </Button>
    }
  >
    <iframe
      title="Thanks Jimmy Wales"
      className="GuestContent"
      src={`https://en.wiktionary.org/wiki/${word}#English`}
    />
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
