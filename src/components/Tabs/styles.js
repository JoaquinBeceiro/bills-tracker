import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
`;

export const Menu = styled.ul`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0;
  margin: 0;
`;

export const MenuItem = styled.li`
  display: flex;
  color: #444;
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  text-transform: uppercase;
  text-underline-offset: 4px;
  cursor: pointer;

  &.active {
    color: #000;
    font-weight: 400;
    text-decoration: underline;
  }

  &.disabled {
    color: #ccc;
    font-weight: 300;
    cursor: not-allowed;
  }
`;
