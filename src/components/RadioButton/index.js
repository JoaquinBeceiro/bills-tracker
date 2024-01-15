import React, { Fragment } from "react";
import * as S from "./styles";

const RadioButton = ({ options, selected, onChange, disabled, name }) => {
  return (
    <S.Cotnainer>
      {options.map(({ label, value }) => (
        <Fragment key={`${label}-${value}`}>
          <S.Label htmlFor={value} disabled={disabled}>
            <S.RadioButton
              type="radio"
              onChange={onChange}
              disabled={disabled}
              name={name}
              value={value}
              id={value}
              checked={selected === value}
            />
            <S.Indicator checked={selected === value} color="#333" />
            {label}
          </S.Label>
        </Fragment>
      ))}
    </S.Cotnainer>
  );
};

export default RadioButton;
