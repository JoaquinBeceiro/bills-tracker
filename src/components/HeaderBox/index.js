import React from "react";
import { Container, Content, PrimaryValue, SecondaryValue } from "./styles";

const HeaderBox = ({ primaryValue, secondaryValue, icon }) => {
  return (
    <Container>
      <Content>
        <PrimaryValue>{primaryValue}</PrimaryValue>
        <SecondaryValue>
          {icon} {secondaryValue}
        </SecondaryValue>
      </Content>
    </Container>
  );
};

export default HeaderBox;
