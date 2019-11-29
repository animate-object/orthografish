import React from "react";
import App from "./views/App";
import { Provider } from "react-redux";
import { store } from "./store";
import * as selectors from "./selectors";

export const SpellerApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

(window as any).speller = {
  selectors,
  store
};
