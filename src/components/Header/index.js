import React, { useState, useContext } from "react";
import { Main, TitleContainer, ActionContainer } from "./styles";

import { SignOutIcon } from "../";

const Header = ({
  title = "BillsTracker",
  subTitle = "Home",
  allowSignOut = true,
}) => {
  const [colorChange, setColorchange] = useState(false);

  const changeNavbarColor = () => {
    setColorchange(window.scrollY >= 10);
  };

  window.addEventListener("scroll", changeNavbarColor);

  return (
    <Main colorChange={colorChange}>
      <ActionContainer></ActionContainer>
      <TitleContainer>
        <h1>{title}</h1>
        <h2>{subTitle}</h2>
      </TitleContainer>
      <ActionContainer>{allowSignOut && <SignOutIcon />}</ActionContainer>
    </Main>
  );
};

export default Header;
