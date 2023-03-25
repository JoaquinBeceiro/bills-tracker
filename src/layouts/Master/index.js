/* eslint-disable no-use-before-define */
import React, { useContext, useEffect, useCallback, useState } from "react";
import { Content, Container } from "./styles";
import { HeaderComponent, FooterComponent, ModalComponent } from "components";
import { GlobalContext, DispatchTypes } from "context";
import { getUserSession } from "config/localStorage";
import { withRouter } from "react-router";

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

  useEffect(() => {
    const userFromStorage = getUserSession();
    if (userFromStorage) {
      userDispatch({
        type: DispatchTypes.User.SET_USER_SUCCESS,
        user: userFromStorage,
      });
    } else {
      history.push("/onboarding");
    }
  }, [history, userDispatch]);

  return (
    <Container footer={footer}>
      <Content>{children}</Content>
      <HeaderComponent
        title={title}
        subTitle={subTitle}
        allowSignOut={allowSignOut}
      />
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
