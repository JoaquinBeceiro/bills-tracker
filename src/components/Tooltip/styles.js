import styled from "styled-components";

export const Container = styled.div`
  position: relative;
`;

export const Tooltip = styled.div`
  display: ${({ open }) => (open ? "block" : "none")};
  position: absolute;
  background-color: #fff;
  padding: 5px 4px;
  border-radius: 4px;
  left: 100%;
  top: 0;
  margin-left: 5px;
  width: 100%;
  min-width: 140px;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.25);

  h2 {
    color: #000;
    text-align: center;
    font-size: 12px;
    font-family: Roboto;
    font-weight: 600;
    margin: 0 0 3px 0;
  }

  p {
    color: #000;
    font-size: 12px;
    font-family: Roboto;
    font-weight: 300;
    margin: 0;
    line-height: 12px;
    text-align: center;
  }
`;
