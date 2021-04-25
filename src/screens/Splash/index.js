import React, { useContext, useEffect } from "react";
import UserContext from "../../config/userContext";
import { createDoc, getTypes } from "../../services";
import { withRouter } from "react-router";
import { Container, Content, Title } from "./styles";
import { checkCredentials } from "../../services";
import Logo from "../../rsc/img/logo.svg";

const Splash = (props) => {
  const { history } = props;

  const userContext = useContext(UserContext);
  const { user, loading } = userContext;

  const checkUser = async (jsonFile, spreadsheetId) => {
    const valid = await checkCredentials(jsonFile, spreadsheetId);
    if (valid) {
      history.push("/home");
    }
  };

  useEffect(() => {
    if (!loading) {
      if (user) {
        const { jsonFile, spreadsheetId } = user;
        checkUser(jsonFile, spreadsheetId);
      } else {
        history.push("/onboarding");
      }
    }
  }, [loading, user]);

  return (
    <Container>
      <Content>
        <img src={Logo} />
        <Title>BillsTracker</Title>
      </Content>
    </Container>
  );
};

export default withRouter(Splash);
