import React, { useContext, useEffect, useState, useCallback } from "react";
import { GlobalContext, DispatchTypes } from "context";
import { withRouter } from "react-router";
import { Container, Content, Title } from "./styles";
import Logo from "rsc/img/logo.svg";
import { getUserSession } from "config/localStorage";
import { checkUser } from "utils/login";

const Splash = (props) => {
  const [newRoute, setNewRoute] = useState(null);
  const [splashFinish, setSplashFinish] = useState(false);

  const { history } = props;

  const context = useContext(GlobalContext);
  const [userState, userDispatch] = context.globalUser;

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

  const createDoc = useCallback(
    async (user) => {
      userDispatch({
        type: DispatchTypes.User.GET_DOC_START,
      });
      try {
        const newDoc = checkUser(user);
        if (newDoc) {
          userDispatch({
            type: DispatchTypes.User.GET_DOC_SUCCESS,
            doc: newDoc,
          });
        } else {
          setNewRoute("/onboarding");
        }
      } catch (error) {
        userDispatch({
          type: DispatchTypes.User.GET_DOC_ERROR,
          error,
        });
      }
    },
    [userDispatch]
  );

  useEffect(() => {
    if (userState) {
      const { user, doc, loading } = userState;
      if (!loading) {
        if (user && doc === null) {
          createDoc(user);
        } else if (doc !== null) {
          setNewRoute("/home");
        } else {
          setNewRoute("/onboarding");
        }
      }
    }
  }, [createDoc, userState]);

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
