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
  getCanSpell,
  getSpelledCount
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
import { showSpelled } from "../../speller/actions";
import SpelledModal from "./SpelledModal";

interface StateProps {
  prefix?: string;
  prefixParams: PrefixParams;
  blankValue: string;
  unspelledCount: number;
  spelledCount: number;
  spellState: SpellState;
  lastSpelled?: string;
  canSpell: boolean;
}

interface DispatchProps {
  onChangeBlankValue: Effect.Effect<string>;
  onSpell: Effect.Effect0;
  onEndGame: Effect.Effect0;
  onShowSpelled: Effect.Effect0;
}

type Props = StateProps & DispatchProps;

export class App extends React.PureComponent<Props> {
  private blankInputRef: React.RefObject<HTMLInputElement> = React.createRef();

  public constructor(props: Props) {
    super(props);
  }

  public render() {
    const {
      prefix,
      prefixParams,
      blankValue,
      unspelledCount,
      spelledCount,
      lastSpelled,
      spellState,
      canSpell,
      onChangeBlankValue,
      onEndGame,
      onShowSpelled
    } = this.props;

    return (
      <div className="LearnerApp">
        <GameEndedModal />
        <SpelledModal />
        <Page
          footer={
            <Actions
              left={
                unspelledCount !== 0 && (
                  <Button onClick={this.handleSpell} disabled={!canSpell}>
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
              onShowSpelled={onShowSpelled}
              spelledCount={spelledCount}
            />
          }
        >
          {prefix ? (
            <>
              <FillTheBlank
                inputRef={this.blankInputRef}
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

  private handleSpell = () => {
    this.props.onSpell();
    if (this.blankInputRef.current !== null) {
      this.blankInputRef.current.focus();
    }
  };
}

const mapStateToProps = (state: State): StateProps => ({
  prefix: getPrefix(state),
  prefixParams: getPrefixParams(state),
  blankValue: getBlankValue(state),
  unspelledCount: getUnspelledCount(state),
  spelledCount: getSpelledCount(state),
  spellState: getSpellState(state),
  lastSpelled: getLastSpelled(state),
  canSpell: getCanSpell(state)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onChangeBlankValue: value => dispatch(changeInput(value)),
  onSpell: () => dispatch(spell()),
  onEndGame: () => dispatch(endGame()),
  onShowSpelled: () => dispatch(showSpelled(true))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
