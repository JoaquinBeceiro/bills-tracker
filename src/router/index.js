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
import Main from "../screens/Main";

const RouterComponent = ({ children }) => (
  <Router>
    <Switch>
      <Route exact path="/">
        <Splash />
      </Route>
      <Route exact path="/onboarding">
        <MasterLayout footer={false} subTitle="Onboarding" allowSignOut={false}>
          <Onboarding />
        </MasterLayout>
      </Route>
      <Route exact path="/home">
        <MasterLayout footer={true} subTitle="Home" allowSignOut={false}>
          <Main />
        </MasterLayout>
      </Route>
      <Route exact path="/types">
        <MasterLayout
          footer={true}
          subTitle="Types"
          allowSignOut={false}
        ></MasterLayout>
      </Route>
      <Route exact path="/analytics">
        <MasterLayout
          footer={true}
          subTitle="Analytics"
          allowSignOut={false}
        ></MasterLayout>
      </Route>
    </Switch>
  </Router>
);

export default RouterComponent;
