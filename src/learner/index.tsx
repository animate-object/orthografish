import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import * as selectors from "./selectors";
import App from "./views/App";

export const LearnerApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

(window as any).lr = {
  store,
  selectors
};
