import React, { useState, useContext } from "react";
import { Main, TitleContainer, ActionContainer } from "./styles";
import { SignOutIcon } from "../";
import { deleteUserSession } from "config/localStorage";
import { useHistory } from "react-router-dom";
import { GlobalContext, DispatchTypes } from "context";

const Header = ({
  title = "BillsTracker",
  subTitle = "Home",
  allowSignOut = true,
}) => {
  const context = useContext(GlobalContext);
  const [, userDispatch] = context.globalUser;

  const history = useHistory();

  const [colorChange, setColorchange] = useState(false);

  const changeNavbarColor = () => {
    setColorchange(window.scrollY >= 10);
  };

  window.addEventListener("scroll", changeNavbarColor);

  const signOut = () => {
    deleteUserSession();
    userDispatch({
      type: DispatchTypes.Global.RESET,
    });
    history.push("/");
  };

  return (
    <Main colorChange={colorChange}>
      <ActionContainer></ActionContainer>
      <TitleContainer>
        <h1>{title}</h1>
        <h2>{subTitle}</h2>
      </TitleContainer>
      {allowSignOut && (
        <ActionContainer onClick={() => signOut()}>
          <SignOutIcon />
        </ActionContainer>
      )}
    </Main>
  );
};

export default Header;
