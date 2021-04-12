import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Container = styled.div`
  display: flex;
  background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0) 100%
    ),
    #38b44e;
  width: 100%;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
`;

const Content = styled.div`
  animation: 2s ${fadeIn} ease-out;
`;

const Title = styled.h1`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 36px;
`;

export { Container, Content, Title };
