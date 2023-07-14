import React from "react";
import { Container, Content } from "./styles";
import { HeaderInfoComponent } from "components";

const Header = ({ children, headerBox }) => {
  return (
    <Container>
      <HeaderInfoComponent data={headerBox} />
      <Content>{children}</Content>
    </Container>
  );
};

export default Header;
