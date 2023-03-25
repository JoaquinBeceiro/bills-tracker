import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MasterLayout } from "layouts";
import {
  SplashScreen,
  OnboardingScreen,
  MainScreen,
  TypeScreen,
  AnalyticsScreen,
  GuideScreen,
} from "screens";

const RouterComponent = ({ children }) => (
  <Router>
    <Switch>
      <Route exact path="/">
        <SplashScreen />
      </Route>
      <Route exact path="/onboarding">
        <MasterLayout footer={false} subTitle="Onboarding" allowSignOut={false}>
          <OnboardingScreen />
        </MasterLayout>
      </Route>
      <Route exact path="/guide">
        <MasterLayout footer={false} subTitle="Guide" allowSignOut={false}>
          <GuideScreen />
        </MasterLayout>
      </Route>
      <Route exact path="/home">
        <MasterLayout footer={true} subTitle="Home" allowSignOut={true}>
          <MainScreen />
        </MasterLayout>
      </Route>
      <Route exact path="/types">
        <MasterLayout footer={true} subTitle="Types" allowSignOut={true}>
          <TypeScreen />
        </MasterLayout>
      </Route>
      <Route exact path="/analytics">
        <MasterLayout footer={true} subTitle="Analytics" allowSignOut={true}>
          <AnalyticsScreen />
        </MasterLayout>
      </Route>
    </Switch>
  </Router>
);

export default RouterComponent;
