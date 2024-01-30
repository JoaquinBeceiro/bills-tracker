import React from "react";
import * as S from "./styles";
import clsx from "clsx";

const Tabs = ({ items, action }) => {
  return (
    <S.Container>
      <S.Menu>
        {items.map(({ label, active, disabled }) => (
          <S.MenuItem
            className={clsx(active && "active", disabled && "disabled")}
            key={label}
            onClick={() => !disabled && action(label)}
          >
            {label}
          </S.MenuItem>
        ))}
      </S.Menu>
    </S.Container>
  );
};

export default Tabs;
