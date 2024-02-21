import React from "react";
import styled from "styled-components";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";

const InputContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  margin-bottom: 20px;
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
    height: 45px;
    color: #333333;
    z-index: 300;
    input {
      background-color: transparent;
      z-index: 300;
    }
  }

  &.checkbox,
  &.bigtext,
  &.option {
    margin-bottom: 0;
  }

  &.textarea,
  &.checkbox,
  &.option,
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
  &.option {
    label {
      font-size: 14px;
    }
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

  &.bigtext:focus-within {
    margin-bottom: 24px;
  }

  &.text:focus-within,
  &.date:focus-within,
  &.type:focus-within,
  &.money:focus-within,
  &.dropdown:focus-within {
    border-bottom: 2px solid #38b44e;
    margin-bottom: 20px;
  }

  ${(props) =>
    props.disabled &&
    `
    label {
      color: #999;
    }

    input::placeholder,
    textarea::placeholder 
    {
      color: #ccc;
    }
`}
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
    ::placeholder {
      color: #7e7e7e;
    }
  }
`;

const Date = styled(InputBox)`
  min-height: 45px;
  color: #333333;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  text-align: right;
  ::-webkit-calendar-picker-indicator {
    color: #333333;
    margin-left: 10px;
    text-align: right;
  }
  ::-webkit-date-and-time-value {
    text-align: right;
  }
`;

const CreateButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CreateButton = styled.div`
  width: fit-content;
  border-radius: 9px;
  padding: 4px 14px;
  border: none;
  color: white;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  background-color: #6fc97f;
`;

const CreatableSelectComponent = (props) => (
  <CreatableSelect
    classNamePrefix="Select"
    formatCreateLabel={(input) => (
      <CreateButtonContainer>
        <CreateButton>
          <strong>Create type</strong> {`"${input}"`}
        </CreateButton>
      </CreateButtonContainer>
    )}
    {...props}
  />
);

const SelectComponent = (props) => {
  return <Select classNamePrefix="Select" {...props} />;
};

const CreatableDropdownBox = styled(CreatableSelectComponent)`
  border: none;
  border-style: unset;
  z-index: 500;
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

const DropdownBox = styled(SelectComponent)`
  border: none;
  border-style: unset;
  z-index: 400;
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
  margin-bottom: 20px;
  ::placeholder {
    color: #7e7e7e;
  }
  &:focus {
    outline: none;
    border-bottom: 2px solid #38b44e;
    margin-bottom: 15px;
    ::placeholder {
      color: #000;
    }
  }
`;

const TextAreaBox = styled(BigTextBox)`
  min-height: 88px;
`;

const IconBox = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const IconText = styled.input`
  font-family: Roboto;
  border: 0px;
  width: 100%;
  height: 100%;
  text-align: right;
  flex: 1;
  font-weight: normal;
  font-size: 18px;
  z-index: 20;
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

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 100%;
`;

const IconSearchOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: #00000010;
  z-index: 10;
`;

const IconSearch = styled.div`
  position: absolute;
  height: 200px;
  width: 100%;
  left: 0;
  top: 45px;
  border-radius: 7px;
  background-color: #fff;
  padding: 10px;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.25);
  overflow-y: scroll;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25px, 1fr));
  grid-template-rows: 25px;
  grid-auto-rows: 25px;
  z-index: 20;

  > div {
    z-index: 100;
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }
`;

export {
  InputContainer,
  InputBox,
  DropdownBox,
  CreatableDropdownBox,
  BigTextBox,
  TextAreaBox,
  TextMoney,
  Date,
  IconBox,
  IconText,
  IconContainer,
  IconSearch,
  IconSearchOverlay,
};
