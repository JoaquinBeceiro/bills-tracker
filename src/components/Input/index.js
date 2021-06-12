import React from "react";
import * as S from "./styles";

import { DollarIcon } from "components";

const Input = ({
  name,
  title,
  value,
  onChange,
  type = "text",
  placeholder = "",
  options = [],
}) => {
  const handleChangeInput = (e) => onChange(e.target.name, e.target.value);
  const handleChangeDropdown = ({value}) => onChange(name, value);

  const defaultProps = {
    name,
    placeholder,
    onChange: type === "dropdown" ? handleChangeDropdown : handleChangeInput,
    value,
  };

  return (
    <S.InputContainer className={type}>
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
            money: <S.TextMoney {...defaultProps} type="text" />,
            dropdown: (
              <S.DropdownBox {...defaultProps} options={options} isClearable />
            ),
            bigtext: <S.BigTextBox {...defaultProps} rows="2" />,
            textarea: <S.TextAreaBox {...defaultProps} />,
          }[type]
        }
      </div>
    </S.InputContainer>
  );
};

export default Input;
