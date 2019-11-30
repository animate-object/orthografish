import React from "react";
import { Modal, Actions, Button } from "../../common/design";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { State } from "../state";
import {
  getGameEnded,
  getGaveUp,
  getUnspelled,
  getSpelled,
  getMissed,
  getGameRating
} from "../selectors";
import { Effect, ArrayUtils } from "../../common/types";
import { requestNewGame } from "../actions";
import "./GameEndedModal.css";
import classNames from "classnames";

interface StateProps {
  gameEnded: boolean;
  gaveUp: boolean;
  unspelled: string[];
  spelled: string[];
  missed: string[];
  rating: number;
}

interface DispatchProps {
  onNewGame: Effect.Effect0;
}

type Props = StateProps & DispatchProps;

export const GameEndedModal = ({
  gameEnded,
  gaveUp,
  unspelled,
  spelled,
  missed,
  rating,
  onNewGame
}: Props): JSX.Element => (
  <Modal
    classes={["GameEndedModal"]}
    title={gaveUp ? "You gave up!" : "You won!"}
    visible={gameEnded}
    actions={
      <Actions>
        <Button onClick={onNewGame}>New Game</Button>
      </Actions>
    }
  >
    <div>
      Your Score:{" "}
      <span
        className={classNames({
          Good: rating > 80,
          Okay: rating <= 80 && rating > 50,
          Bad: rating <= 50 && rating > 0,
          Awful: rating <= 0
        })}
      >
        {rating.toFixed(2)}
      </span>
    </div>
    {spelled.length > 0 && (
      <div>
        <hr />
        You spelled these words:{" "}
        <div className="Spelled">
          <WordList words={spelled} />
        </div>
      </div>
    )}
    {unspelled.length > 0 && (
      <div>
        <hr />
        You didn't spell these words:{" "}
        <div className="Unspelled">
          <WordList words={unspelled} />
        </div>
      </div>
    )}
    {missed.length > 0 && (
      <div>
        <hr />
        And you made these ones up!{" "}
        <div className="Missed">
          <WordList words={missed} />
        </div>
      </div>
    )}
  </Modal>
);

const WordList = (props: { words: string[] }): JSX.Element => (
  <>
    {ArrayUtils.sorted(props.words).map(word => (
      <div key={word}>{word}</div>
    ))}
  </>
);

export const mapStateToProps = (state: State): StateProps => ({
  gameEnded: getGameEnded(state),
  gaveUp: getGaveUp(state),
  unspelled: getUnspelled(state),
  spelled: getSpelled(state),
  missed: getMissed(state),
  rating: getGameRating(state)
});
export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onNewGame: () => dispatch(requestNewGame())
});

export default connect(mapStateToProps, mapDispatchToProps)(GameEndedModal);
