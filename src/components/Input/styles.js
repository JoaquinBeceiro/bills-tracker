import styled from "styled-components";

const InputContainer = styled.div`
  margin-bottom: 30px;
  border-bottom: 1px solid #c4c4c4;
  width: 100%;
  min-height: 45px;
  display: flex;
  align-items: center;
  label {
    font-weight: 300;
    font-size: 11px;
    color: #000;
  }

  &.textarea,
  &.bigtext {
    border: none;
    flex-direction: column;
    align-items: flex-start;
    label {
      margin-bottom: 8px;
    }
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
    border-bottom: 2px solid #38b44e;
    ::placeholder {
      color: #000;
    }
  }
`;

const DropdownBox = styled.select`
  font-family: Roboto;
  border: none;
  border-radius: 7px;
  width: 100%;
  padding: 10px;
  font-weight: normal;
  font-size: 13px;
  ::placeholder {
    color: #7e7e7e;
  }
  &:focus {
    border-bottom: 2px solid #38b44e;
    ::placeholder {
      color: #000;
    }
  }
`;

const BigTextBox = styled.textarea`
  height: 40px;
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
    border-bottom: 2px solid #38b44e;
    ::placeholder {
      color: #000;
    }
  }
`;

const TextAreaBox = styled(BigTextBox)`
  min-height: 88px;
`;

export { InputContainer, InputBox, DropdownBox, BigTextBox, TextAreaBox };
