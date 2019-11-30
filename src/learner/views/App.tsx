import React from "react";
import { Button, Page, Actions } from "../../common/design";
import { State, PrefixParams } from "../state";
import { getPrefix, getPrefixParams, getBlankValue } from "../selectors";
import { connect } from "react-redux";
import "./App.css";
import { LearnerHeader } from "./LearnerHeader";
import { FillTheBlank } from "./FillTheBlank";
import { Effect } from "../../common/types";
import { Dispatch } from "redux";
import { changeInput } from "../actions";

interface StateProps {
  prefix?: string;
  prefixParams: PrefixParams;
  blankValue: string;
}

interface DispatchProps {
  onChangeBlankValue: Effect.Effect<string>;
}

type Props = StateProps & DispatchProps;

export class App extends React.PureComponent<Props> {
  public constructor(props: Props) {
    super(props);
  }

  public render() {
    const { prefix, prefixParams, blankValue, onChangeBlankValue } = this.props;

    return (
      <div className="LearnerApp">
        <Page
          footer={<Actions left={<Button>Spell</Button>} />}
          header={
            <LearnerHeader
              prefix={prefix}
              wordLength={prefixParams.wordLength}
            />
          }
        >
          {prefix ? (
            <FillTheBlank
              prefix={prefix}
              wordLength={prefixParams.wordLength}
              blankValue={blankValue}
              onChange={onChangeBlankValue}
            />
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
  blankValue: getBlankValue(state)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onChangeBlankValue: value => dispatch(changeInput(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
