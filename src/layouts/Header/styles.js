import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  max-height: 100%;
`;

const Content = styled.div`
  margin-top: 5px;
  background: #ffffff;
  border-radius: 30px 30px 0px 0px;
  width: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  overflow-y: auto;
  margin-bottom: 50px;
`;

export { Container, Content };
