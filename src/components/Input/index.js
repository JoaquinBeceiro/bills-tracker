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
    onChange,
    value,
  };

  return (
    <InputContainer className={type}>
      <div>
        <label htmlFor={name}>{title}</label>
      </div>
      <div>
        {
          {
            text: <InputBox {...defaultProps} type="text" />,
            dropdown: <DropdownBox {...defaultProps} />,
            bigtext: <BigTextBox {...defaultProps} />,
            textarea: <TextAreaBox {...defaultProps} />,
          }[type]
        }
      </div>
    </InputContainer>
  );
};

export default Input;