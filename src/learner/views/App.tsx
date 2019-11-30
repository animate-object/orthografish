import React from "react";
import { Button, Page, Actions } from "../../common/design";
import { State, PrefixParams } from "../state";
import { getPrefix, getPrefixParams } from "../selectors";
import { connect } from "react-redux";
import "./App.css";
import { Header } from "../../common/design/Header";

interface StateProps {
  prefix?: string;
  prefixParams: PrefixParams;
}

interface DispatchProps {}

type Props = StateProps & DispatchProps;

export class App extends React.PureComponent<Props> {
  private inputRef: React.RefObject<HTMLInputElement> = React.createRef();

  public constructor(props: Props) {
    super(props);
  }

  public render() {
    const { prefix, prefixParams } = this.props;

    return (
      <div className="App">
        <Page
          footer={<Actions left={<Button>Spell</Button>} />}
          header={
            <Header>
              {`${
                prefixParams.wordLength
              } letter words starting with ${prefix || "..."}`}
            </Header>
          }
        >
          <div>
            <span>{prefix}</span>
            <input ref={this.inputRef} />
          </div>
        </Page>
      </div>
    );
  }
}

const mapStateToProps = (state: State): StateProps => ({
  prefix: getPrefix(state),
  prefixParams: getPrefixParams(state)
});

export default connect(mapStateToProps)(App);
