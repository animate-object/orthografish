import React from "react";
import { Modal } from "./design/Modal";
import { Button } from "./design/Button";
import { Effect, ArrayUtils } from "../types";
import { connect } from "react-redux";
import {
  getSpelled,
  getShowSpelled,
  getTotalWords,
  getHints
} from "../selectors";
import { Dispatch } from "redux";
import { showSpelled } from "../actions";
import { State } from "../state";
import "./SpelledModal.css";
import { Emoji } from "./design/Emoji";

interface StateProps {
  spelled: string[];
  visible: boolean;
  totalCount: number;
  hints: Record<number, number>;
}

interface DispatchProps {
  onClose: Effect.Effect0;
}

type Props = StateProps & DispatchProps;

export const SpelledModal = ({
  spelled,
  visible,
  onClose,
  hints
}: Props): JSX.Element => (
  <Modal
    title={
      <>
        Spelled so far <Emoji content="🐟" label="Spelling Fish" />
      </>
    }
    visible={visible}
    actions={
      <Button onClick={onClose}>
        Spell some more! <Emoji label="Return to game octopus" content="🐙" />
      </Button>
    }
  >
    <div className="SpelledList">
      {ArrayUtils.sorted(spelled).map(word => (
        <div key={word}>{word}</div>
      ))}
      {spelled.length <= 0 && "You haven't spelled anything yet."}
    </div>
    <div className="Hints">Need a hint ? </div>
    {Object.keys(hints)
      .map(key => (key as any) as number)
      .map((length: number) => {
        if (hints[length] === 0) {
          return (
            <div className="Hint" key={length}>
              You've spelled all the {length} letter words
            </div>
          );
        } else {
          const left = hints[length];
          return (
            <div className="Hint" key={length}>
              There {left === 1 ? "is" : "are"} {left} more {length} letter word
              {left === 1 ? "" : "s"} to spell.
            </div>
          );
        }
      })}
    <br />
  </Modal>
);

const mapStateToProps = (state: State): StateProps => ({
  spelled: getSpelled(state),
  visible: getShowSpelled(state),
  totalCount: getTotalWords(state),
  hints: getHints(state)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onClose: () => dispatch(showSpelled(false))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpelledModal);
