import styled from "styled-components";

const Container = styled.div`
  background: #ffffff;
  border-radius: 7px;
  padding: 7px 15px;
  margin: 12px;
  display: flex;
  justify-content: center;
`;

const Content = styled.div``;

const PrimaryValue = styled.h2`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  color: #333;
  line-height: 28px;
  margin: 0px;
`;

const SecondaryValue = styled.h3`
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 9px;
  color: #aaaaaa;
  display: flex;
  align-items: center;
  > svg {
    margin-right: 3px;
  }
`;

export { Container, Content, PrimaryValue, SecondaryValue };
