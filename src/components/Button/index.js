import React from "react";
import * as S from "./styles";

const Button = ({ type = "default", text, action, disabled }) => {
  const handleClick = () => {
    action && action();
  };

  const defaultProps = {
    onClick: handleClick,
    disabled,
  };

  return {
    default: <S.Default {...defaultProps}>{text}</S.Default>,
    secondary: <S.Secondary {...defaultProps}>{text}</S.Secondary>,
    text: <S.Text {...defaultProps}>{text}</S.Text>,
  }[type];
};

export default Button;
