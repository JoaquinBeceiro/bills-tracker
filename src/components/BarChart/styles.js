import styled from "styled-components";

export const Tooltip = styled.div`
  background: #ffffff;
  border-radius: 4px;
  padding: 9px 4px;
  filter: drop-shadow(0px 0px 7px rgba(0, 0, 0, 0.25));
  min-width: 50px;
  text-align: center;
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 11px;
  :before {
    content: "";
    position: absolute;
    left: calc(50% - 8px);
    bottom: -8px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid #fff;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
