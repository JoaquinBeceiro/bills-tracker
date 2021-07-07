import React, { useContext, useEffect, useState } from "react";
import { GlobalContext, DispatchTypes } from "context";
import { withRouter } from "react-router";
import { Container, Content, Title } from "./styles";
import { checkCredentials } from "services";
import Logo from "rsc/img/logo.svg";
import { createDoc } from "services";
import { setUserSession, getUserSession } from "config/localStorage";

const Splash = (props) => {
  const [newRoute, setNewRoute] = useState(null);
  const [splashFinish, setSplashFinish] = useState(false);

  const { history } = props;

  const context = useContext(GlobalContext);
  const [userState, userDispatch] = context.globalUser;

  const setDoc = async (user) => {
    try {
      const { jsonFile, spreadsheetId } = user;
      const newDoc = await createDoc(jsonFile, spreadsheetId);
      setUserSession(user);
      userDispatch({
        type: DispatchTypes.User.GET_DOC_SUCCESS,
        doc: newDoc,
      });
    } catch (error) {
      userDispatch({
        type: DispatchTypes.User.GET_DOC_ERROR,
        error,
      });
    }
  };

  const checkUser = async (user) => {
    const { spreadsheetId, jsonFile } = user;
    const valid = await checkCredentials(jsonFile, spreadsheetId);
    if (valid) {
      userDispatch({
        type: DispatchTypes.User.GET_DOC_START,
      });
      setDoc(user);
    } else {
      setNewRoute("/onboarding");
    }
  };

  useEffect(() => {
    userDispatch({
      type: DispatchTypes.User.SET_USER_START,
    });

    const userFromStorage = getUserSession();
    if (userFromStorage) {
      userDispatch({
        type: DispatchTypes.User.SET_USER_SUCCESS,
        user: userFromStorage,
      });
    }
    setTimeout(() => {
      setSplashFinish(true);
    }, 1000);
  }, [userDispatch]);

  useEffect(() => {
    if (userState) {
      const { user, doc, loading } = userState;
      if (user && !loading && doc === null) {
        checkUser(user);
      } else if (doc !== null) {
        setNewRoute("/home");
      } else {
        setNewRoute("/onboarding");
      }
    }
  }, [userState]);

  useEffect(() => {
    if (newRoute && splashFinish) {
      history.push(newRoute);
    }
  }, [newRoute, splashFinish, history]);

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
