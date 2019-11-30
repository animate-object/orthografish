import React from "react";
import _ from "lodash";
import { Maybe, Effect } from "../../common/types";
import classNames from "classnames";

interface Props {
  value: string;
  onChange: Effect.Effect<string>;
  letterCount: number;
  spacing?: number;
  classes?: string[];
}

interface State {
  letterWidthPx: number;
}

export class SizedInput extends React.PureComponent<Props, State> {
  private measureRef: React.RefObject<HTMLSpanElement> = React.createRef();

  constructor(props: Props) {
    super(props);
    this.state = { letterWidthPx: 20 };
  }

  componentDidMount() {
    window.addEventListener("resize", this.queueMeasure);
    this.queueMeasure();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.queueMeasure);
  }

  public render() {
    const { letterWidthPx } = this.state;
    const { letterCount, spacing: maybeSpacing, classes, value } = this.props;
    const spacing = maybeSpacing || 0;
    console.log(letterWidthPx, letterCount);

    return (
      <>
        <span
          className={classNames(classes)}
          ref={this.measureRef}
          style={{
            height: 0,
            overflow: "hidden",
            display: "inline-block",
            position: "absolute",
            zIndex: -1
          }}
        >
          w
        </span>
        <input
          className={classNames(classes)}
          style={{
            width: letterWidthPx * letterCount,
            paddingRight: spacing,
            paddingLeft: spacing
          }}
          value={value}
          onChange={this.handleChange}
        />
      </>
    );
  }

  private handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(evt.target.value);
  };

  private measure() {
    Maybe.ifPresent(
      ref =>
        Maybe.ifPresent(span => {
          const rect = span.getBoundingClientRect();
          this.setState({
            letterWidthPx: rect.width
          });
        }, ref.current),
      this.measureRef
    );
  }

  private queueMeasure = _.debounce(this.measure, 100);
}
