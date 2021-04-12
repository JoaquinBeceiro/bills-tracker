import styled from "styled-components";

const InputContainer = styled.div`
  border-bottom: 1px solid #c4c4c4;
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  label {
    font-weight: 300;
    font-size: 11px;
    color: #000;
  }
`;

const InputBox = styled.input`
  border: 0px;
  width: 100%;
  height: 100%;
  text-align: right;
  flex: 1;
  font-weight: normal;
  font-size: 18px;
`;

export { InputContainer, InputBox };
