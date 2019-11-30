import React from "react";
import { Button, Page, Actions } from "../../common/design";
import { State, PrefixParams, SpellState } from "../state";
import {
  getPrefix,
  getPrefixParams,
  getBlankValue,
  getUnspelledCount,
  getLastSpelled,
  getSpellState,
  getCanSpell
} from "../selectors";
import { connect } from "react-redux";
import "./App.css";
import { LearnerHeader } from "./LearnerHeader";
import { FillTheBlank } from "./FillTheBlank";
import { Effect } from "../../common/types";
import { Dispatch } from "redux";
import { changeInput, spell, endGame } from "../actions";
import { SpellResult } from "./SpellResult";
import GameEndedModal from "./GameEndedModal";

interface StateProps {
  prefix?: string;
  prefixParams: PrefixParams;
  blankValue: string;
  unspelledCount: number;
  spellState: SpellState;
  lastSpelled?: string;
  canSpell: boolean;
}

interface DispatchProps {
  onChangeBlankValue: Effect.Effect<string>;
  onSpell: Effect.Effect0;
  onEndGame: Effect.Effect0;
}

type Props = StateProps & DispatchProps;

export class App extends React.PureComponent<Props> {
  public constructor(props: Props) {
    super(props);
  }

  public render() {
    const {
      prefix,
      prefixParams,
      blankValue,
      unspelledCount,
      lastSpelled,
      spellState,
      canSpell,
      onChangeBlankValue,
      onSpell,
      onEndGame
    } = this.props;

    return (
      <div className="LearnerApp">
        <GameEndedModal />
        <Page
          footer={
            <Actions
              left={
                unspelledCount !== 0 && (
                  <Button onClick={onSpell} disabled={!canSpell}>
                    Spell
                  </Button>
                )
              }
              right={
                <Button onClick={onEndGame} buttonType="Secondary">
                  {unspelledCount === 0 ? "End Game" : "Give Up"}
                </Button>
              }
            />
          }
          header={
            <LearnerHeader
              unspelledCount={unspelledCount}
              prefix={prefix}
              wordLength={prefixParams.wordLength}
            />
          }
        >
          {prefix ? (
            <>
              <FillTheBlank
                prefix={prefix}
                wordLength={prefixParams.wordLength}
                blankValue={blankValue}
                onChange={onChangeBlankValue}
              />
              <SpellResult spellState={spellState} lastSpelled={lastSpelled} />
            </>
          ) : (
            "Loading . . ."
          )}
        </Page>
      </div>
    );
  }
}

const mapStateToProps = (state: State): StateProps => ({
  prefix: getPrefix(state),
  prefixParams: getPrefixParams(state),
  blankValue: getBlankValue(state),
  unspelledCount: getUnspelledCount(state),
  spellState: getSpellState(state),
  lastSpelled: getLastSpelled(state),
  canSpell: getCanSpell(state)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onChangeBlankValue: value => dispatch(changeInput(value)),
  onSpell: () => dispatch(spell()),
  onEndGame: () => dispatch(endGame())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
