import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Splash from "../screens/Splash";
import Onboarding from "../screens/Onboarding";

const RouterComponent = ({ children }) => (
  <Router>
    <Switch>
      <Route exact path="/">
        <Splash />
      </Route>
      <Route path="/onboarding">
        <Onboarding />
      </Route>
    </Switch>
    {children}
  </Router>
);

export default RouterComponent;
