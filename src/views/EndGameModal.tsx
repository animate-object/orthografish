import React from "react";
import "./EndGameModal.css";
import { Modal } from "./Modal";
import { Button } from "./Button";
import { Effect } from "../types";
import { newGame } from "../actions";
import { Dispatch } from "redux";
import { State } from "../state";
import classNames from "classnames";
import {
  getGaveUp,
  WordAndSpelled,
  getEndGameWords,
  getUnspelledCount
} from "../selectors";
import { connect } from "react-redux";
import { Emoji } from "./Emoji";

interface StateProps {
  words: Array<WordAndSpelled>;
  gaveUp: boolean;
  anyUnspelled: boolean;
}

interface DispatchProps {
  onNewGame: Effect.Effect0;
}

type Props = DispatchProps & StateProps;

export const EndGameModal = ({
  words,
  onNewGame,
  anyUnspelled,
  gaveUp
}: Props): JSX.Element => (
  <Modal
    visible={gaveUp || !anyUnspelled}
    title={
      <>
        You ${anyUnspelled ? "gave up!" : "Won!"}{" "}
        <Emoji label="End game whale" content="🐋" />
      </>
    }
    actions={
      <Button className="NewGame" onClick={onNewGame}>
        New Game <Emoji label="New game whale" content="🐳" />
      </Button>
    }
  >
    <div className="Words">
      {words.map(([word, spelled]: WordAndSpelled) => (
        <div
          key={word}
          className={classNames({
            Unspelled: !spelled,
            Spelled: spelled
          })}
        >
          {word}
        </div>
      ))}
    </div>
  </Modal>
);

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onNewGame: () => dispatch(newGame())
});

const mapStateToProps = (state: State): StateProps => ({
  gaveUp: getGaveUp(state),
  words: getEndGameWords(state),
  anyUnspelled: getUnspelledCount(state) > 0
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EndGameModal);
