import React, { useContext } from "react";
import { Container, Content, HeaderBox } from "./styles";
import { HeaderBoxComponent } from "../../components";

const Header = ({ children, headerBox }) => {
  return (
    <Container>
      <HeaderBoxComponent {...headerBox} />
      <Content>{children}</Content>
    </Container>
  );
};

export default Header;
