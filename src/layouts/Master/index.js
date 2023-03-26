/* eslint-disable no-use-before-define */
import React, { useContext, useEffect } from "react";
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
      <HeaderComponent
        title={title}
        subTitle={subTitle}
        allowSignOut={allowSignOut}
      />
      <Content>{children}</Content>
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
