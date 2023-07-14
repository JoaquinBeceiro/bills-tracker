import React from "react";
import {
  Container,
  Content,
  PrimaryValue,
  SecondaryValue,
  Title,
  Info,
} from "./styles";
import { ArrowIndicatorIcon, InfoIcon, TooltipComponent } from "components";

const HeaderBox = ({
  primaryValue,
  secondaryValue,
  title,
  arrowIcon,
  info,
}) => {
  return (
    <Container>
      <Content>
        {info && (
          <TooltipComponent id="" infoTitle="About" infoText={info}>
            <Info>
              <InfoIcon />
            </Info>
          </TooltipComponent>
        )}
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
