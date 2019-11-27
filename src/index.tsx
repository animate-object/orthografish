import React from "react";
import ReactDOM from "react-dom";
import App from "./views/App";
import { Provider } from "react-redux";
import { store } from "./store";
import "./index.css";
import * as selectors from "./selectors";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

(window as any).selectors = selectors;
(window as any).store = store;
