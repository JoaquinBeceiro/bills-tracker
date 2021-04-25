import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { MasterLayout } from "../layouts";

import Splash from "../screens/Splash";
import Onboarding from "../screens/Onboarding";

const RouterComponent = ({ children }) => (
  <Router>
    <Switch>
      <Route exact path="/">
        <Splash />
      </Route>
      <Route path="/onboarding">
        <MasterLayout footer={false} subTitle="Onboarding" allowSignOut={false}>
          <Onboarding />
        </MasterLayout>
      </Route>
    </Switch>
  </Router>
);

export default RouterComponent;
