import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Slate as SlateType, Select, Effect, UUID, Dimensions } from "../types";
import { State } from "../state";
import {
  getSlate,
  getLetterDimensions,
  getSelectedId,
  getValidTargetTypes
} from "../selectors";
import { chooseTarget, select } from "../actions";
import { Slot } from "./Slot";
import "./Slate.css";

interface StateProps {
  slate: SlateType.Slate;
  dimensions: Dimensions.Dimensions;
  selected?: UUID.UUID;
  validTargetTypes: Select.TargetType[];
}

interface DispatchProps {
  onTargetSlot: Effect.Effect<UUID.UUID>;
  onSelectSlot: Effect.Effect<UUID.UUID>;
}

type Props = StateProps & DispatchProps;

export const Slate = ({
  slate,
  selected,
  validTargetTypes,
  onTargetSlot,
  onSelectSlot
}: Props): JSX.Element => {
  return (
    <div className="Slate">
      {slate.contents.map((l, idx) => {
        const slotId = SlateType.slotId(slate, idx);
        const isSelected = slotId === selected;
        const isTargetable =
          !isSelected && validTargetTypes.indexOf("SlateSlot") >= 0;
        return (
          slotId && (
            <Slot
              key={slotId}
              letter={l}
              isSelected={isSelected}
              isTargetable={isTargetable}
              onSelectSlot={() => onSelectSlot(slotId)}
              onTargetSlot={() => onTargetSlot(slotId)}
            />
          )
        );
      })}
    </div>
  );
};

export const mapStateToProps = (state: State): StateProps => ({
  slate: getSlate(state),
  dimensions: getLetterDimensions(state),
  selected: getSelectedId(state),
  validTargetTypes: getValidTargetTypes(state)
});

export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onTargetSlot: id => dispatch(chooseTarget(Select.target("SlateSlot", id))),
  onSelectSlot: id => dispatch(select(Select.selection("SlateSlot", id)))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Slate);
