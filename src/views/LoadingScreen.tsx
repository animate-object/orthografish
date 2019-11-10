import React from "react";
import { FetchState, State } from "../state";
import { connect } from "react-redux";

interface StateProps {
  fetchState: FetchState;
}

type Props = StateProps;

const useInterval = (callback: VoidFunction, delay: number) => {
  const savedCallback = React.useRef<VoidFunction>();

  // Remember the latest callback.
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  React.useEffect(() => {
    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

const LoadingScreen = ({ fetchState }: Props) => {
  let [bloopCount, setBloopCount] = React.useState(1);
  useInterval(() => setBloopCount(bloopCount++), 500);
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {fetchState === "StillPending" && (
        <>
          <img src="/ms-icon-310x310.png" alt="loading fish" />
          <div>
            I'm loading some data! Bloop {`${"bloop ".repeat(bloopCount)}`}. . .
          </div>
        </>
      )}
      {fetchState === "Errored" && (
        <>
          <img src="/errorfish.jpg" alt="error fish" />
          <div>Oh no, something is quite wrong. Try refreshing?</div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state: State): StateProps => ({
  fetchState: state.fetchState
});

export default connect(mapStateToProps)(LoadingScreen);
