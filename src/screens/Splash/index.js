import React, { useContext, useEffect } from "react";
import UserContext from "../../config/userContext";
import { createDoc, getTypes } from "../../services";
import { withRouter } from "react-router";
import { Container, Content, Title } from "./styles";

import Logo from "../../rsc/img/logo.svg";

const Splash = (props) => {
  const { history } = props;

  const userContext = useContext(UserContext);
  const { user, doc } = userContext;

  const setupDoc = async () => {
    const { jsonFile, spreadsheetId, name } = user;
    const newDoc = await createDoc(jsonFile, spreadsheetId, name);
    history.push("/main");
  };

  useEffect(() => {
    if (user) {
      setupDoc();
    } else {
      setTimeout(() => {
        history.push("/onboarding");
      }, 1000);
    }
  }, []);

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
