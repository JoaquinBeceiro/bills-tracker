import styled from "styled-components";

const Main = styled.div`
  height: 60px;
  color: white;
  display: flex;
  align-items: center;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  text-align: center;
  h1 {
    font-weight: bold;
    font-size: 18px;
    margin: 0;
  }

  h2 {
    font-weight: normal;
    font-size: 13px;
    margin: 0;
  }
`;

const ActionContainer = styled.div`
  width: 50px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export { Main, TitleContainer, ActionContainer };
