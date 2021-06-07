import React from "react";
import styled from "styled-components";
import CreatableSelect from "react-select/creatable";

const InputContainer = styled.div`
  box-sizing: border-box;
  margin-bottom: 25px;
  border-bottom: 1px solid #c4c4c4;
  width: 100%;
  display: flex;
  align-items: center;
  color: #333333;
  label {
    font-weight: 300;
    font-size: 11px;
    color: #000;
  }

  &.text {
    height: 45px;
    overflow: hidden;
  }
  &.date {
    color: #333333;
  }
  &.textarea,
  &.bigtext {
    border: none;
    flex-direction: column;
    align-items: flex-start;
    div:first-child {
      min-height: 25px;
    }
    label {
      margin-bottom: 0px;
    }
  }

  &.money {
    border-color: #38b44e;
  }

  > div {
    display: flex;
    min-height: 45px;
    :first-child {
      align-items: center;
    }
    :last-child {
      flex: 1;
      align-items: center;
      width: 100%;
    }
  }

  &.text:focus-within {
    border-bottom: 2px solid #38b44e;
  }
`;

const InputBox = styled.input`
  font-family: Roboto;
  border: 0px;
  width: 100%;
  height: 100%;
  text-align: right;
  flex: 1;
  font-weight: normal;
  font-size: 18px;
  ::placeholder {
    color: #7e7e7e;
  }
  &:focus {
    outline: none;
    /* border-bottom: 2px solid #38b44e; */
    ::placeholder {
      color: #000;
    }
  }
`;

const TextMoney = styled(InputBox)`
  color: #38b44e;
  font-size: 32px;
  font-weight: bold;
  &:focus {
    outline: none;
    /* border-bottom: 2px solid #38b44e; */
    ::placeholder {
      color: #7e7e7e;
    }
  }
`;

const Date = styled(InputBox)`
  color: #333333;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  ::-webkit-calendar-picker-indicator {
    color: #333333;
  }
`;

const SelectComponent = (props) => (
  <CreatableSelect classNamePrefix="Select" {...props} />
);

const DropdownBox = styled(SelectComponent)`
  border: none;
  border-style: unset;
  & .Select__control {
    border: none;
    border-style: unset;
  }

  & .Select__value-container {
    text-align: right;
    justify-content: flex-end;
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
  font-weight: normal;
  font-size: 13px;
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

const BigTextBox = styled.textarea`
  overflow: hidden;
  font-family: Roboto;
  resize: vertical;
  border: none;
  border: 1px solid #dedede;
  border-radius: 7px;
  width: 100%;
  padding: 10px;
  font-weight: normal;
  font-size: 13px;
  ::placeholder {
    color: #7e7e7e;
  }
  &:focus {
    outline: none;
    border-bottom: 2px solid #38b44e;
    ::placeholder {
      color: #000;
    }
  }
`;

const TextAreaBox = styled(BigTextBox)`
  min-height: 88px;
`;

export {
  InputContainer,
  InputBox,
  DropdownBox,
  BigTextBox,
  TextAreaBox,
  TextMoney,
  Date,
};
