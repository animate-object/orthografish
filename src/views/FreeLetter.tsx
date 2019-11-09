import * as React from "react";
import { UUID, Maybe, Letter as LetterType, Effect, Select } from "../types";
import { State } from "../state";
import { getSelectedId, getValidTargetTypes } from "../selectors";
import { connect } from "react-redux";
import Letter from "./Letter";
import { Dispatch } from "redux";
import { select, chooseTarget } from "../actions";

interface StateProps {
  selected: Maybe.Maybe<UUID.UUID>;
  validTargetTypes: Select.TargetType[];
}

interface DispatchProps {
  onSelect: Effect.Effect<UUID.UUID>;
  onTarget: Effect.Effect<UUID.UUID>;
}

interface OwnProps {
  letter: LetterType.Letter;
}

type Props = StateProps & DispatchProps & OwnProps;

export const FreeLetter = ({
  selected,
  letter,
  onSelect,
  onTarget,
  validTargetTypes
}: Props): JSX.Element => {
  const isTargetable = validTargetTypes.indexOf("FreeLetter") >= 0;
  return (
    <Letter
      isSelected={selected === letter.id}
      isTargetable={isTargetable}
      letter={letter}
      onClick={() => (isTargetable ? onTarget(letter.id) : onSelect(letter.id))}
    ></Letter>
  );
};

const mapStateToProps = (state: State, _: OwnProps): StateProps => ({
  selected: getSelectedId(state),
  validTargetTypes: getValidTargetTypes(state)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onSelect: id => dispatch(select(Select.selection("FreeLetter", id))),
  onTarget: id => dispatch(chooseTarget(Select.target("FreeLetter", id)))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FreeLetter);
