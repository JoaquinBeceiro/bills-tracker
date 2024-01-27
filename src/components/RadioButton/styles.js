import styled, { keyframes } from "styled-components";

const rotate = keyframes`
 from {
    opacity: 0;
    transform: rotate(0deg);
  }
  to {
    opacity: 1;
    transform: rotate(45deg);
  }
`;

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 10px;
`;

export const Label = styled.label`
  display: flex;
  width: fit-content;
  gap: 10px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  align-items: center;
  display: flex;
  align-items: flex-start;
`;

export const RadioButton = styled.input`
  height: 0;
  width: 0;
  opacity: 0;
  z-index: -1;
`;

export const Indicator = styled.div`
  margin-top: 5px;
  padding-right: 12px;
  width: 12px;
  height: 12px;
  background: ${(props) =>
    props.checked ? props.color : "#d9d9d9"} !important;
  background-color: ${(props) =>
    props.checked ? props.color : "#d9d9d9"} !important;
  position: relative;
  border: none;
  border-radius: 2px;

  ${Label}:hover & {
    background: #ccc;
  }

  &::after {
    content: "";
    position: absolute;
    display: none;
  }

  ${RadioButton}:checked + &::after {
    display: block;
    top: 0.1em;
    left: 0.28em;
    width: 35%;
    height: 70%;
    border: solid #fff;
    border-width: 0 0.15em 0.15em 0;
    animation-name: ${rotate};
    animation-duration: 0.3s;
    animation-fill-mode: forwards;
  }

  &::disabled {
    cursor: not-allowed;
  }
`;
