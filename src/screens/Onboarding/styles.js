import styled from "styled-components";

export const Content = styled.div`
  height: calc(100vh - 125px);
  display: flex;
  flex-direction: column;
  >div:first-child {
    flex:1;
  }
  .googleButton {
    width: 100%;
    height: 60px;
    margin-top: 30px;
    div {
      position: absolute;
    }
    span {
      text-align: center;
      width: 100%;
    }
  }
`;

export const GoogleDisclaimer = styled.p`
  margin-top: 30px;
  color: #AEAEAE;
  font-weight: 400;
  font-size: 12px;
  text-align: center;
`;
