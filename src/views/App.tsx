import React from "react";
import "./App.css";
import { Dimensions, Maybe, Effect, Select } from "../types";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
  setContainerDimensions,
  clearSelection,
  chooseTarget,
  giveUp,
  newGame,
  showSpelled,
  showDefinition,
  clearSlate,
  submitWord
} from "../actions";
import { Letter as LetterType } from "../types";
import * as _ from "lodash";
import { State, SpellState } from "../state";
import {
  getFreeLetters,
  getValidTargetTypes,
  getSpells,
  getCurrentWordIsValid,
  getCurrentWordScore,
  getSpellState,
  getUnspelled,
  getSpelled,
  getShouldShowApp,
  getCanSpell
} from "../selectors";
import Slate from "./Slate";
import { Button } from "./design/Button";
import LoadingScreen from "./LoadingScreen";
import { Emoji } from "./design/Emoji";
import { FreeSpace } from "./FreeSpace";
import { GameInfo } from "./GameInfo";
import { Actions } from "./design/Actions";
import { Modals } from "./Modals";
import { Page } from "./design/Page";

interface StateProps {
  freeLetters: LetterType.Letter[];
  isTargetable: boolean;
  spells: string;
  spelled: string[];
  unspelled: string[];
  wordIsValid: boolean;
  wordScore: Maybe.Maybe<number>;
  spellState: SpellState;
  showApp: boolean;
  canSpell: boolean;
}
interface DispatchProps {
  onMeasure: Effect.Effect<Dimensions.Dimensions>;
  onClearSelection: Effect.Effect0;
  onTargetFreeSpace: Effect.Effect0;
  onGiveUp: Effect.Effect0;
  onNewGame: Effect.Effect0;
  onShowSpelled: Effect.Effect0;
  onShowDefinition: Effect.Effect0;
  onClearSlate: Effect.Effect0;
  onSubmitWord: Effect.Effect0;
}

type Props = StateProps & DispatchProps;

export class App extends React.PureComponent<Props> {
  private rulerRef: React.RefObject<HTMLDivElement> = React.createRef();

  componentDidMount() {
    window.addEventListener("resize", this.queueMeasure);
    this.queueMeasure();
  }

  componentDidUpdate(lastProps: Props) {
    if (lastProps.showApp !== this.props.showApp) {
      this.queueMeasure();
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.queueMeasure);
  }

  render = () => {
    const {
      freeLetters,
      isTargetable,
      spells,
      unspelled,
      wordIsValid,
      wordScore,
      showApp,
      spellState,
      onClearSelection,
      onTargetFreeSpace
    } = this.props;

    return (
      <div
        className="App"
        onClick={() =>
          isTargetable ? onTargetFreeSpace() : onClearSelection()
        }
      >
        {showApp ? (
          <>
            <Modals />
            <div className="Ruler" ref={this.rulerRef} />
            <Page
              header={this.secondaryActions()}
              footer={this.primaryActions()}
            >
              <FreeSpace freeLetters={freeLetters} />
              <Slate />
              <GameInfo
                spellState={spellState}
                spells={spells}
                wordScore={wordScore}
                unspelled={unspelled}
                wordIsValid={wordIsValid}
              />
            </Page>
          </>
        ) : (
          <LoadingScreen />
        )}
      </div>
    );
  };

  private secondaryActions = () => {
    const { onGiveUp, onShowSpelled } = this.props;
    return (
      <Actions
        left={
          <Button onClick={onGiveUp}>
            Give up! <Emoji label="Give up shark" content="🦈" />
          </Button>
        }
        right={
          <Button onClick={onShowSpelled} buttonType="Secondary">
            Spelled <Emoji label="Give up shark" content="🐠" />
          </Button>
        }
      />
    );
  };

  private primaryActions = () => {
    const {
      spellState,
      canSpell,
      onShowDefinition,
      onClearSlate,
      onSubmitWord
    } = this.props;
    return (
      <Actions
        left={
          <Button
            onClick={onShowDefinition}
            buttonType="Secondary"
            disabled={spellState === "Missed" || spellState === "Spelling"}
          >
            Def <Emoji label="Dictionary Dolphin" content="🐬" />
          </Button>
        }
        middle={
          <Button
            onClick={onSubmitWord}
            buttonType="Default"
            disabled={!canSpell}
          >
            Spell
          </Button>
        }
        right={
          <Button
            onClick={onClearSlate}
            buttonType="Secondary"
            disabled={!canSpell}
          >
            Clear <Emoji label="Blow up the board puffer fish" content="🐡" />
          </Button>
        }
      />
    );
  };

  private measure = () => {
    Maybe.ifPresent(
      ref =>
        Maybe.ifPresent(div => {
          const rect = div.getBoundingClientRect();
          this.props.onMeasure(Dimensions.create(rect.width, rect.height));
        }, ref.current),
      this.rulerRef
    );
  };

  private queueMeasure = _.debounce(this.measure, 100);
}

export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onMeasure: (dimensions: Dimensions.Dimensions) =>
    dispatch(setContainerDimensions(dimensions)),
  onClearSelection: () => dispatch(clearSelection()),
  onTargetFreeSpace: () =>
    dispatch(chooseTarget(Select.target("FreeSpace", "free_space"))),
  onGiveUp: () => dispatch(giveUp()),
  onNewGame: () => dispatch(newGame()),
  onShowSpelled: () => dispatch(showSpelled(true)),
  onShowDefinition: () => dispatch(showDefinition(true)),
  onClearSlate: () => dispatch(clearSlate()),
  onSubmitWord: () => dispatch(submitWord())
});

export const mapStateToProps = (state: State): StateProps => ({
  freeLetters: getFreeLetters(state),
  isTargetable: getValidTargetTypes(state).indexOf("FreeSpace") >= 0,
  spells: getSpells(state),
  spelled: getSpelled(state),
  unspelled: getUnspelled(state),
  wordIsValid: getCurrentWordIsValid(state),
  wordScore: getCurrentWordScore(state),
  spellState: getSpellState(state),
  showApp: getShouldShowApp(state),
  canSpell: getCanSpell(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
