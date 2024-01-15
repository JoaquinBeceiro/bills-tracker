import styled from "styled-components";

export const Content = styled.div`
  height: calc(100vh - 125px);
  @media (display-mode: browser) {
    height: 100%;
  }
  display: flex;
  flex-direction: column;
  > div:first-child {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .googleButton {
    height: 60px;
    margin-top: 40px;
    span {
      text-align: center;
      width: 100%;
      color: #757575;
      font-weight: 500;
      font-size: 14px;
    }
  }

  .buttonDisabled {
    span {
      opacity: 0.4;
    }
  }
`;

export const GoogleDisclaimer = styled.p`
  margin-top: 30px;
  color: #aeaeae;
  font-weight: 400;
  font-size: 12px;
  text-align: center;
`;
