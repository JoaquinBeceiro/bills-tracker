import React from "react";
import * as S from "./styles";

const Dropdown = ({
  type = "default",
  placeholder,
  options,
  onChange,
  disabled,
  value,
}) => {
  const defaultProps = {
    onChange,
    disabled,
  };

  return {
    default: (
      <S.Default
        options={options}
        {...defaultProps}
        placeholder={placeholder}
        value={value}
      />
    ),
  }[type];
};

export default Dropdown;
