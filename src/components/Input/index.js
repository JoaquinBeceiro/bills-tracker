import React from "react";
import {
  InputContainer,
  InputBox,
  DropdownBox,
  BigTextBox,
  TextAreaBox,
} from "./styles";

const Input = ({
  name,
  title,
  value,
  onChange,
  type = "text",
  placeholder,
}) => {
  const defaultProps = {
    name,
    placeholder,
  };

  return (
    <InputContainer className={type}>
      <label for={name}>{title}</label>
      {
        {
          text: <InputBox {...defaultProps} type="text" />,
          dropdown: <DropdownBox {...defaultProps} />,
          bigtext: <BigTextBox {...defaultProps} />,
          textarea: <TextAreaBox {...defaultProps} />,
        }[type]
      }
    </InputContainer>
  );
};

export default Input;
