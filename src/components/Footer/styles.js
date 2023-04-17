import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  bottom: 0;
  height: 50px;
  width: 100%;
  max-width: inherit;
  background: #ffffff;
  box-shadow: 0px -1px 4px rgba(196, 196, 196, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MenuItem = styled.button`
  border: none;
  background: none;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 100%;
  path {
    fill: #aeaeae;
  }
  &.active path {
    fill: #000;
  }
`;

export { Container, MenuItem };
