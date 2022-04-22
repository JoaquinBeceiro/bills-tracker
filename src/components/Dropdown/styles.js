import React from "react";
import styled from "styled-components";
import Select from "react-select";

const SelectComponent = (props) => (
  <Select classNamePrefix="Select" {...props} />
);

const Dropdown = styled(SelectComponent)`
  border: none;
  border-style: unset;
  & .Select__control {
    border: 1px solid #aaaaaa;
    border-radius: 0px;
  }

  & .Select__value-container {
    text-align: right;
    justify-content: flex-end;
    min-width: 70px;
  }

  & .Select__indicator-separator,
  .Select__clear-indicator {
    display: none;
  }

  & .Select__control--is-focused {
    box-shadow: none;
  }

  & .Select__option {
    text-align: right;
  }

  font-family: Roboto;
  border: none;
  border-radius: 7px;
  width: 100%;
  font-style: normal;
  font-weight: normal;
  font-size: 11px;
  ::placeholder {
    color: #7e7e7e;
  }
  &:focus {
    outline: none;
    ::placeholder {
      color: #000;
    }
  }
`;

export const Default = styled(Dropdown)`
  display: flex;
  justify-content: flex-end;
  z-index: 400;
`;
