import React from "react";
import "./EndGameModal.css";
import { Modal } from "./design/Modal";
import { Button } from "./design/Button";
import { Effect } from "../types";
import { newGame } from "../actions";
import { Dispatch } from "redux";
import { State } from "../state";
import classNames from "classnames";
import {
  getGaveUp,
  WordAndSpelled,
  getEndGameWords,
  getUnspelledCount,
  getGameRating,
  getMissed
} from "../selectors";
import { connect } from "react-redux";
import { Emoji } from "./design/Emoji";

interface StateProps {
  words: Array<WordAndSpelled>;
  gaveUp: boolean;
  anyUnspelled: boolean;
  rating: number;
  missed: string[];
}

interface DispatchProps {
  onNewGame: Effect.Effect0;
}

type Props = DispatchProps & StateProps;

export const EndGameModal = ({
  words,
  onNewGame,
  anyUnspelled,
  gaveUp,
  rating,
  missed
}: Props): JSX.Element => (
  <Modal
    visible={gaveUp || !anyUnspelled}
    title={
      <>
        You {anyUnspelled ? "gave up!" : "Won!"}{" "}
        <Emoji label="End game whale" content="🐋" />
      </>
    }
    actions={
      <Button className="NewGame" onClick={onNewGame}>
        New Game <Emoji label="New game whale" content="🐳" />
      </Button>
    }
  >
    <hr />
    Your score:{" "}
    <span
      className={classNames({
        ["Good"]: rating > 80,
        ["Okay"]: rating <= 80 && rating > 50,
        ["Bad"]: rating <= 50 && rating > 0,
        ["Awful"]: rating <= 0
      })}
    >
      {rating.toFixed(2)}
    </span>
    <hr />
    <div className="Info">
      You spelled the green words, and missed the red ones.
    </div>
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

      {missed.length > 0 && (
        <>
          <hr />
          <div className="Info">These ones weren't even words...</div>
          <div className="Words">
            {missed.map(word => (
              <div key={word}>{word}</div>
            ))}
          </div>
        </>
      )}
    </div>
  </Modal>
);

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onNewGame: () => dispatch(newGame())
});

const mapStateToProps = (state: State): StateProps => ({
  gaveUp: getGaveUp(state),
  words: getEndGameWords(state),
  anyUnspelled: getUnspelledCount(state) > 0,
  rating: getGameRating(state),
  missed: getMissed(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EndGameModal);
