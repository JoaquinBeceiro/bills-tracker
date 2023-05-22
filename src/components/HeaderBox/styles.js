import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  background: #ffffff;
  border-radius: 7px;
  padding: 7px 15px;
  margin: 7px;
  display: flex;
  width: fit-content;
  flex-direction: column;
  text-align: left;
`;

const Title = styled.h2`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  color: #333;
  line-height: 28px;
  margin: 0px;
`;

const PrimaryValue = styled.h3`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  color: #333;
  line-height: 28px;
  margin: 0px;
`;

const SecondaryValue = styled.h3`
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  color: #aaaaaa;
  display: flex;
  align-items: center;
  > svg {
    margin-right: 3px;
  }
`;

export { Container, Content, PrimaryValue, SecondaryValue, Title };
