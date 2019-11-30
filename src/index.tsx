import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { SpellerApp } from "./speller";
import { LearnerApp } from "./learner";
import { Route, HashRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Router>
    <Route path={["/", "/spell"]} exact={true}>
      <SpellerApp />
    </Route>
    <Route path="/learner">
      <LearnerApp />
    </Route>
  </Router>,
  document.getElementById("root")
);
