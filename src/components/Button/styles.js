import styled from "styled-components";

const Button = styled.button`
  border-radius: 15px;
  width: 100%;
  height: 60px;
  border: none;
  color: white;
  text-transform: uppercase;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:disabled {
    background-color: #c4c4c4;
    cursor: not-allowed;
  }
`;

export const Default = styled(Button)`
  background: #38b44e;
  &:hover {
    background-color: #6fc97f;
  }
`;

export const Secondary = styled(Button)`
  background: #333333;
  color: #ffffff;
  &:hover {
    background-color: #6fc97f;
  }
`;

export const Text = styled(Button)`
  background: none;
  color: #333;
`;
