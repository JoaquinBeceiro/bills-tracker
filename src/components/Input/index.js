import React from "react";
import { InputContainer, InputBox } from "./styles";

const Input = ({
  name,
  title,
  value,
  onChange,
  type = "text",
  placeholder,
}) => {
  return (
    <InputContainer>
      <label for={name}>{title}</label>
      <InputBox name={name} placeholder={placeholder} />
    </InputContainer>
  );
};

export default Input;
