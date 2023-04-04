import React from "react";
import * as S from "./styles";
import { v4 as uuidv4 } from "uuid";

const Checkbox = ({ label, checked, onChange, disabled, color }) => {
  const id = uuidv4();
  return (
    <S.Cotnainer>
      <S.Label htmlFor={id} disabled={disabled}>
        <S.CheckBox
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          name={id}
          id={id}
          color={color}
        />
        <S.Indicator checked={checked} color={color} />
        {label}
      </S.Label>
    </S.Cotnainer>
  );
};

export default Checkbox;
