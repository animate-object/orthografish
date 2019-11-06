import React from "react";
import "./App.css";
import { Dimensions, Maybe } from "./utils";

type Props = {};
interface State {
  dimensions: Maybe.Maybe<Dimensions.Dimensions>;
}

export class App extends React.PureComponent<Props, State> {
  private primaryContainerRef: React.RefObject<
    HTMLDivElement
  > = React.createRef();

  constructor(props: Props) {
    super(props);
    this.state = { dimensions: Maybe.none() };
  }

  componentDidMount() {
    window.addEventListener("resize", this.measure);
    this.measure();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.measure);
  }

  render = () => {
    const { height, width } = this.state.dimensions || {};
    return (
      <div className="App">
        <div className="Container" ref={this.primaryContainerRef}>
          {`${height} ${width}`}
        </div>
      </div>
    );
  };

  private measure = () => {
    Maybe.ifPresent(
      ref =>
        Maybe.ifPresent(div => {
          const rect = div.getBoundingClientRect();
          this.setState({
            dimensions: Dimensions.create(rect.height, rect.width)
          });
        }, ref.current),
      this.primaryContainerRef
    );
  };
}

export default App;
