import React from "react";
import "./App.css";
import { Dimensions, Maybe, Effect, Select, ArrayUtils } from "../types";
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
  clearSlate
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
  getShowClearSlateButton
} from "../selectors";
import FreeLetter from "./FreeLetter";
import Slate from "./Slate";
import classNames from "classnames";
import EndGameModal from "./EndGameModal";
import { Button } from "./Button";
import SpelledModal from "./SpelledModal";
import ProbablyLegalDefinitionModal from "./DefinitionModal";
import LoadingScreen from "./LoadingScreen";
import { Emoji } from "./Emoji";

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
  showClearSlate: boolean;
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
}

type Props = StateProps & DispatchProps;

export class App extends React.PureComponent<Props> {
  private primaryContainerRef: React.RefObject<
    HTMLDivElement
  > = React.createRef();

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
      showClearSlate,
      onClearSelection,
      onTargetFreeSpace,
      onGiveUp,
      onShowSpelled,
      onShowDefinition,
      onClearSlate
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
            <EndGameModal />
            <SpelledModal />
            <ProbablyLegalDefinitionModal />
            <div className="Container" ref={this.primaryContainerRef}>
              <div className="FreeSpace">
                {ArrayUtils.sorted(freeLetters, LetterType.sort).map(l => (
                  <React.Fragment key={l.id}>
                    <FreeLetter letter={l} />
                  </React.Fragment>
                ))}
              </div>
              <Slate />

              <span
                className={classNames("Spells", {
                  NewScore: wordIsValid && spellState === "New"
                })}
              >
                {spells}
                {wordIsValid &&
                  (spellState === "New" ? (
                    <span className="Score">{`${wordScore} points!`}</span>
                  ) : (
                    <span className="PreviouslySpelled">
                      You already spelled this word.
                    </span>
                  ))}
              </span>
              <span>You have {unspelled.length} words left to spell.</span>
              <Button className="GiveUp" onClick={onGiveUp}>
                Give up! <Emoji label="Give up shark" content="🦈" />
              </Button>
              <Button
                className="ShowSpelled"
                onClick={onShowSpelled}
                buttonType="Secondary"
              >
                Spelled <Emoji label="Give up shark" content="🐠" />
              </Button>
              {spellState !== "Nothing" && (
                <Button
                  className="ShowDefinition"
                  onClick={onShowDefinition}
                  buttonType="Secondary"
                >
                  Dictionary <Emoji label="Dictionary Dolphin" content="🐬" />
                </Button>
              )}
              {showClearSlate && (
                <Button
                  className="ClearSlate"
                  onClick={onClearSlate}
                  buttonType="Secondary"
                >
                  Clear Slate{" "}
                  <Emoji label="Blow up the board puffer fish" content="🐡" />
                </Button>
              )}
            </div>
          </>
        ) : (
          <LoadingScreen />
        )}
      </div>
    );
  };

  private measure = () => {
    Maybe.ifPresent(
      ref =>
        Maybe.ifPresent(div => {
          const rect = div.getBoundingClientRect();
          this.props.onMeasure(Dimensions.create(rect.width, rect.height));
        }, ref.current),
      this.primaryContainerRef
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
  onClearSlate: () => dispatch(clearSlate())
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
  showClearSlate: getShowClearSlateButton(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
