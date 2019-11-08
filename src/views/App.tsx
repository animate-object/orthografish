import React from "react";
import "./App.css";
import { Dimensions, Maybe, Effect, Select } from "../types";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
  setContainerDimensions,
  clearSelection,
  chooseTarget
} from "../actions";
import { Letter as LetterType } from "../types";
import * as _ from "lodash";
import { State } from "../state";
import { getFreeLetters, getValidTargetTypes } from "../selectors";
import FreeLetter from "./FreeLetter";
import Slate from "./Slate";

interface StateProps {
  freeLetters: LetterType.Letter[];
  isTargetable: boolean;
}
interface DispatchProps {
  onMeasure: Effect.Effect<Dimensions.Dimensions>;
  onClearSelection: Effect.Effect0;
  onTargetFreeSpace: Effect.Effect0;
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

  componentWillUnmount() {
    window.removeEventListener("resize", this.queueMeasure);
  }

  render = () => {
    const {
      freeLetters,
      isTargetable,
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
        <div className="Container" ref={this.primaryContainerRef}>
          <div className="FreeSpace">
            {freeLetters.map(l => (
              <React.Fragment key={l.id}>
                <FreeLetter letter={l} />
              </React.Fragment>
            ))}
          </div>
          <Slate />
        </div>
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
    dispatch(chooseTarget(Select.target("FreeSpace", "free_space")))
});

export const mapStateToProps = (state: State): StateProps => ({
  freeLetters: getFreeLetters(state),
  isTargetable: getValidTargetTypes(state).indexOf("FreeSpace") >= 0
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
