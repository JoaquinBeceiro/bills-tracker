import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../config/userContext";
import { withRouter } from "react-router";
import { Container, Content, Title } from "./styles";
import { checkCredentials } from "../../services";
import Logo from "../../rsc/img/logo.svg";

const Splash = (props) => {
  const [newRoute, setNewRoute] = useState(null);
  const [splashFinish, setSplashFinish] = useState(false);

  const { history } = props;

  const userContext = useContext(UserContext);
  const { user, loading } = userContext;

  const checkUser = async (jsonFile, spreadsheetId) => {
    const valid = await checkCredentials(jsonFile, spreadsheetId);
    if (valid) {
      setNewRoute("/home");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setSplashFinish(true);
    }, 1000);
  }, []);

  useEffect(() => {
    if (!loading) {
      if (user) {
        const { jsonFile, spreadsheetId } = user;
        checkUser(jsonFile, spreadsheetId);
      } else {
        setNewRoute("/onboarding");
      }
    }
  }, [loading, user]);

  useEffect(() => {
    if (newRoute && splashFinish) {
      history.push(newRoute);
    }
  }, [newRoute, splashFinish]);

  return (
    <Container>
      <Content>
        <img src={Logo} alt="Logo" />
        <Title>BillsTracker</Title>
      </Content>
    </Container>
  );
};

export default withRouter(Splash);
