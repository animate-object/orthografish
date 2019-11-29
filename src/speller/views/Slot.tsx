import React from "react";
import { Letter as LetterType, Maybe, Effect } from "../../common/types";
import Letter from "./Letter";
import classNames from "classnames";
import EmptySlot from "./EmptySlot";
import "./Slot.css";

interface StateProps {
  letter: Maybe.Maybe<LetterType.Letter>;
  isSelected: boolean;
  isTargetable: boolean;
}

interface DispatchProps {
  onTargetSlot: Effect.Effect0;
  onSelectSlot: Effect.Effect0;
  onDeselect: Effect.Effect0;
}

type Props = StateProps & DispatchProps;

export const Slot = ({
  isSelected,
  isTargetable,
  onTargetSlot,
  onSelectSlot,
  onDeselect,
  letter
}: Props): JSX.Element => {
  const handleClick = () =>
    !isSelected && isTargetable
      ? onTargetSlot()
      : isSelected
      ? onDeselect()
      : onSelectSlot();
  return (
    <div
      className={classNames("Slot", {
        Selected: isSelected,
        Targetable: isTargetable,
        Occupied: !!letter
      })}
    >
      {letter ? (
        <Letter onClick={handleClick} letter={letter} />
      ) : (
        <EmptySlot onClick={handleClick} />
      )}
    </div>
  );
};
