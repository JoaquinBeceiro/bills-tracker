import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  position: fixed;
  background-color: #00000035;
  justify-content: center;
  align-items: flex-end;
  top: 0px;
  left: 0px;
  height: 100vh;
  width: 100vw;
  z-index: 1;
`;

export const Modal = styled.div`
  flex-direction: column;
  display: flex;
  background-color: #ffffff;
  padding: 23px;
  border-radius: 30px 30px 0px 0px;
  width: 100vw;
  z-index: 1;
  max-height: 80vh;
`;

export const Title = styled.h3`
  text-align: center;
  margin-bottom: 30px;
`;

export const Content = styled.div`
  overflow-y: scroll;
  flex: 1;
  padding-bottom: 20px;
`;
