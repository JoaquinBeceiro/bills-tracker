import React from "react";
import { Default, Text } from "./styles";

const Input = ({ type = "default", text, action }) => {
  const handleClick = () => {
    action && action();
  };

  const defaultProps = {
    onClick: handleClick,
  };

  return {
    default: <Default {...defaultProps}>{text}</Default>,
    text: <Text {...defaultProps}>{text}</Text>,
  }[type];
};

export default Input;
