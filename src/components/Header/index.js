import React, { useState, useContext } from "react";
import { Main, TitleContainer, ActionContainer } from "./styles";
import { SignOutIcon } from "../";
import { deleteUserSession } from "config/localStorage";
import { useHistory } from "react-router-dom";
import { GlobalContext, DispatchTypes } from "context";
import { getAuth, signOut } from "firebase/auth";

const Header = ({
  title = "BillsTracker",
  subTitle = "Home",
  allowSignOut = true,
}) => {
  const context = useContext(GlobalContext);
  const [, userDispatch] = context.globalUser;
  const [, modalDispatch] = context.globalModal;

  const app = context.getApp;

  const history = useHistory();

  const logOutSuccess = () => {
    deleteUserSession();
    userDispatch({
      type: DispatchTypes.Global.RESET,
    });
    history.push("/");
  };
  const signOutAction = () => {
    if (app) {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          logOutSuccess();
          return true;
        })
        .catch((error) => {
          return false;
        });
    }
  };

  const [colorChange, setColorchange] = useState(false);

  const changeNavbarColor = () => {
    setColorchange(window.scrollY >= 10);
  };

  window.addEventListener("scroll", changeNavbarColor);

  const handleSignOut = () => {
    modalDispatch({
      type: DispatchTypes.Modal.MODAL_SHOW,
      title: "Are you sure?",
      content: "If you sign out, you will need to setup the credentials again.",
      actions: [
        {
          type: "secondary",
          text: "Cancel",
          action: () => {
            modalDispatch({ type: DispatchTypes.Modal.MODAL_HIDE });
          },
        },
        {
          type: "text",
          text: "Sign Out",
          action: () => {
            modalDispatch({ type: DispatchTypes.Modal.MODAL_HIDE });
            signOutAction();
          },
        },
      ],
    });
  };

  return (
    <Main colorChange={colorChange}>
      {allowSignOut && <ActionContainer></ActionContainer>}
      <TitleContainer>
        <h1>{title}</h1>
        <h2>{subTitle}</h2>
      </TitleContainer>
      {allowSignOut && (
        <ActionContainer onClick={() => handleSignOut()}>
          <SignOutIcon />
        </ActionContainer>
      )}
    </Main>
  );
};

export default Header;
