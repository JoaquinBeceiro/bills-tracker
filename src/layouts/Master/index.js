import React from "react";
import { Content, Container } from "./styles";
import { HeaderComponent, FooterComponent } from "../../components";

const Master = ({ children, footer = true, title, subTitle, allowSignOut }) => {
  return (
    <Container footer={footer}>
      <Content>{children}</Content>
      <HeaderComponent
        title={title}
        subTitle={subTitle}
        allowSignOut={allowSignOut}
      />
      {footer && <FooterComponent />}
    </Container>
  );
};

export default Master;
