import React from "react";
import "./App.css";
import { Dimensions, Maybe, Effect } from "../types";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { setContainerDimensions } from "../actions";
import Letter from "./Letter";
import { Letter as LetterType } from "../types";
import * as _ from "lodash";
import { State } from "../state";
import { getFreeLetters } from "../selectors";

interface StateProps {
  freeLetters: LetterType.Letter[];
}
interface DispatchProps {
  onMeasure: Effect.Effect<Dimensions.Dimensions>;
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
    const { freeLetters } = this.props;
    return (
      <div className="App">
        <div className="Container" ref={this.primaryContainerRef}>
          {freeLetters.map(l => (
            <React.Fragment key={l.id}>
              <Letter letter={l} />
            </React.Fragment>
          ))}
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

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  onMeasure: (dimensions: Dimensions.Dimensions) =>
    dispatch(setContainerDimensions(dimensions))
});

export const mapStateToProps = (state: State): StateProps => ({
  freeLetters: getFreeLetters(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
