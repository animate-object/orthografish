import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";

export const LearnerApp = () => (
  <Provider store={store}>
    <div>Learner</div>
  </Provider>
);
