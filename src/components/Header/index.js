import React, { useContext } from "react";
import { Main, TitleContainer, ActionContainer } from "./styles";

import { SignOutIcon } from "../";

const Header = ({
  title = "BillsTracker",
  subTitle = "Home",
  allowSignOut = true,
}) => {
  return (
    <Main>
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
