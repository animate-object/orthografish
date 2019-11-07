import React from "react";
import "./App.css";
import { Dimensions, Maybe, Effect } from "../types";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { setContainerDimensions } from "../actions";
import Letter from "./Letter";
import { Letter as LetterType } from "../types";
import * as _ from "lodash";

type Props = {
  onMeasure: Effect.Effect<Dimensions.Dimensions>;
};

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
    return (
      <div className="App">
        <div className="Container" ref={this.primaryContainerRef}>
          <Letter letter={LetterType.create("a")} />
          <Letter letter={LetterType.create("b")} />
          <Letter letter={LetterType.create("c")} />
          <Letter letter={LetterType.create("d")} />
          <Letter letter={LetterType.create("e")} />
          <Letter letter={LetterType.create("e")} />
          <Letter letter={LetterType.create("e")} />
          <Letter letter={LetterType.create("e")} />
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

export default connect(
  undefined,
  mapDispatchToProps
)(App);
