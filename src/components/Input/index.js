import React from "react";
import * as S from "./styles";

import {
  DollarIcon,
  CheckboxComponent,
  RadioButtonComponent,
} from "components";

const Input = ({
  name,
  title,
  value,
  onChange,
  type = "text",
  placeholder = "",
  options = [],
  disabled,
  isSearchable,
}) => {
  const handleChangeInput = (e) => onChange(e.target.name, e.target.value);
  const handleChangeDropdown = ({ value }) => onChange(name, value);

  const defaultProps = {
    name,
    placeholder,
    onChange:
      type === "creatableDropdown" || type === "dropdown"
        ? handleChangeDropdown
        : handleChangeInput,
    value,
    disabled,
    isSearchable,
  };

  return (
    <S.InputContainer className={type} disabled={disabled}>
      <div>
        {type === "money" ? (
          <DollarIcon />
        ) : (
          <label htmlFor={name}>{title}</label>
        )}
      </div>
      <div>
        {
          {
            text: <S.InputBox {...defaultProps} type="text" />,
            date: <S.Date {...defaultProps} type="date" />,
            money: (
              <S.TextMoney
                {...defaultProps}
                type="number"
                inputmode="numeric"
              />
            ),
            creatableDropdown: (
              <S.CreatableDropdownBox
                {...defaultProps}
                options={options}
                isCreatable
              />
            ),
            dropdown: <S.DropdownBox {...defaultProps} options={options} />,
            bigtext: <S.BigTextBox {...defaultProps} rows="2" />,
            textarea: <S.TextAreaBox {...defaultProps} />,
            checkbox: (
              <CheckboxComponent
                {...defaultProps}
                type="checkbox"
                color="#333"
                checked={value}
                label={placeholder}
              />
            ),
            option: (
              <RadioButtonComponent
                options={options}
                selected={value}
                onChange={onChange}
                disabled={disabled}
                name={name}
              />
            ),
          }[type]
        }
      </div>
    </S.InputContainer>
  );
};

export default Input;
