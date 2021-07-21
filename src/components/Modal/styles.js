import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  position: fixed;
  background-color: #00000035;
  justify-content: center;
  align-items: center;
  top: 0px;
  left: 0px;
  height: 100vh;
  width: 100vw;
`;

export const Modal = styled.div`
  flex-direction: column;
  display: flex;
  background-color: #ffffff;
  padding: 23px;
  border-radius: 7px;
  max-width: 90vw;
`;

export const Title = styled.h3`
  text-align: center;
`;

export const Content = styled.div`
  text-align: center;
`;

export const ActionsContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  button {
    margin: 5px 0;
    height: 30px;
    font-weight: 500;
    font-size: 12px;
    max-width: 150px;
  }
`;
