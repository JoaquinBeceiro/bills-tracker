import React from "react";
import {
  Container,
  Content,
  PrimaryValue,
  SecondaryValue,
  Title,
} from "./styles";
import { ArrowIndicatorIcon } from "components";

const HeaderBox = ({ primaryValue, secondaryValue, title, arrowIcon }) => {
  return (
    <Container>
      <Content>
        {title && <Title>{title}</Title>}
        {primaryValue && <PrimaryValue>{primaryValue}</PrimaryValue>}
        {secondaryValue && (
          <SecondaryValue>
            {arrowIcon && (
              <ArrowIndicatorIcon up={arrowIcon.up} color={arrowIcon.color} />
            )}
            {secondaryValue}
          </SecondaryValue>
        )}
      </Content>
    </Container>
  );
};

export default HeaderBox;
