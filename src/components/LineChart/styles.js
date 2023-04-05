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
  p {
    margin: 0 0 10px 0;
    font-size: 16px;
    font-weight: 600;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      display: flex;
      justify-content: space-between;
      gap: 10px;
      span {
        font-weight: 300;
        :first-child {
          font-weight: 400;
        }
      }
    }
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
