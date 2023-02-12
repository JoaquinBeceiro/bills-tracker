import React, { useContext, useEffect, useState, useCallback } from "react";
import { GlobalContext, DispatchTypes } from "context";
import { withRouter } from "react-router";
import { Container, Content, Title } from "./styles";
import { checkCredentials, createDoc } from "services";
import Logo from "rsc/img/logo.svg";
import { setUserSession, getUserSession } from "config/localStorage";

const Splash = (props) => {
  const [newRoute, setNewRoute] = useState(null);
  const [splashFinish, setSplashFinish] = useState(false);

  const { history } = props;

  const context = useContext(GlobalContext);
  const [userState, userDispatch] = context.globalUser;

  const setDoc = useCallback(
    async (user) => {
      try {
        const { access_token, refresh_token, expires_at, spreadsheetId } = user;
        const newDoc = await createDoc(
          access_token,
          refresh_token,
          expires_at,
          spreadsheetId
        );
        setUserSession(user);
        userDispatch({
          type: DispatchTypes.User.GET_DOC_SUCCESS,
          doc: newDoc,
        });
        return true;
      } catch (error) {
        userDispatch({
          type: DispatchTypes.User.GET_DOC_ERROR,
          error,
        });
        return false;
      }
    },
    [userDispatch]
  );

  const checkUser = useCallback(
    async (user) => {
      const { access_token, expires_at, refresh_token, spreadsheetId } = user;
      const valid = await checkCredentials({
        access_token,
        expires_at,
        refresh_token,
        spreadsheetId,
      });
      if (valid) {
        userDispatch({
          type: DispatchTypes.User.GET_DOC_START,
        });
        await setDoc(user);
      } else {
        setNewRoute("/onboarding");
      }
    },
    [setDoc, userDispatch]
  );

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
    } else {
      userDispatch({
        type: DispatchTypes.User.SET_USER_FINISH,
      });
    }
    setTimeout(() => {
      setSplashFinish(true);
    }, 1000);
  }, [userDispatch]);

  useEffect(() => {
    if (userState) {
      const { user, doc, loading } = userState;
      if (!loading) {
        if (user && doc === null) {
          checkUser(user);
        } else if (doc !== null) {
          setNewRoute("/home");
        } else {
          setNewRoute("/onboarding");
        }
      }
    }
  }, [checkUser, userState]);

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
