import React from "react";
import { Actions, Button } from "../../common/design";
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
import { LearnerModal } from "./LearnerModal";
import { WordList } from "./WordList";

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
  <LearnerModal
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
          Good: rating > 70,
          Okay: rating <= 50 && rating > 25,
          Bad: rating <= 25 && rating > 0,
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
  </LearnerModal>
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
