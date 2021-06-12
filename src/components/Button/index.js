import React from "react";
import { Default, Text } from "./styles";

const Button = ({ type = "default", text, action, disabled }) => {
  const handleClick = () => {
    action && action();
  };

  const defaultProps = {
    onClick: handleClick,
    disabled,
  };

  return {
    default: <Default {...defaultProps}>{text}</Default>,
    text: <Text {...defaultProps}>{text}</Text>,
  }[type];
};

export default Button;
