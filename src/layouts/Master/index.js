/* eslint-disable no-use-before-define */
import React, { useContext, useEffect, useCallback } from "react";
import { Content, Container } from "./styles";
import { HeaderComponent, FooterComponent, ModalComponent } from "components";
import { GlobalContext, DispatchTypes } from "context";
import { getUserSession } from "config/localStorage";
import { withRouter } from "react-router";
import { checkUser } from "utils/login";

const Master = ({
  children,
  footer = true,
  title,
  subTitle,
  allowSignOut,
  history,
}) => {
  const context = useContext(GlobalContext);
  const [modalState] = context.globalModal;
  const [, userDispatch] = context.globalUser;

  const createDoc = useCallback(
    async (user) => {
      userDispatch({
        type: DispatchTypes.User.GET_DOC_START,
      });
      try {
        const newDoc = await checkUser(user);
        if (newDoc) {
          userDispatch({
            type: DispatchTypes.User.GET_DOC_SUCCESS,
            doc: newDoc,
          });
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
    const userFromStorage = getUserSession();
    if (userFromStorage) {
      userDispatch({
        type: DispatchTypes.User.SET_USER_SUCCESS,
        user: userFromStorage,
      });
      createDoc(userFromStorage);
    } else {
      history.push("/onboarding");
    }
  }, [createDoc, history, userDispatch]);

  return (
    <Container footer={footer}>
      <HeaderComponent
        title={title}
        subTitle={subTitle}
        allowSignOut={allowSignOut}
      />
      <Content footer={footer}>{children}</Content>
      {footer && <FooterComponent />}
      {modalState.show && (
        <ModalComponent
          title={modalState.title}
          content={modalState.content}
          actions={modalState.actions}
        />
      )}
    </Container>
  );
};

export default withRouter(Master);
