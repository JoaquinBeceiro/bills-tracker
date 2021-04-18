import React, { useContext } from "react";
import { Main, Content } from "./styles";

import { HeaderComponent } from "../../components";

const Onboarding = ({ children }) => {
  return (
    <Main>
      <HeaderComponent />
      <Content>{children}</Content>
    </Main>
  );
};

export default Onboarding;
