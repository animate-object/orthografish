import React from "react";
import { LearnerModal } from "./LearnerModal";
import { Actions, Button } from "../../common/design";
import { Effect } from "../../common/types";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { showSpelled } from "../actions";
import { State } from "../state";
import { getSpelled, getShowSpelled } from "../selectors";
import { WordList } from "./WordList";

interface DispatchProps {
  onClose: Effect.Effect0;
}

interface StateProps {
  spelled: string[];
  visible: boolean;
}

type Props = StateProps & DispatchProps;

export const SpelledModal = ({ spelled, visible, onClose }: Props) => (
  <LearnerModal
    title="Spelled so far"
    visible={visible}
    actions={
      <Actions>
        <Button onClick={onClose}>Close</Button>
      </Actions>
    }
  >
    <WordList words={spelled} />
  </LearnerModal>
);

export const mapStateToProps = (state: State): StateProps => ({
  spelled: getSpelled(state),
  visible: getShowSpelled(state)
});

export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onClose: () => dispatch(showSpelled(false))
});

export default connect(mapStateToProps, mapDispatchToProps)(SpelledModal);
