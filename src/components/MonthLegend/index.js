import React from "react";
import * as S from "./styles";
import Utils from "lib/utils";
import { CalendarIcon, NavigateIcon } from "components";

const MonthLegend = ({ month, year, amount, action }) => {
  const { formatMoney } = Utils.Currency;
  const { monthToText } = Utils.Date;

  const monthText = `${monthToText(month - 1).substring(0, 3)}.`;

  return (
    <S.Container onClick={action}>
      <S.IconContainer>
        <CalendarIcon />
      </S.IconContainer>
      <S.DateContainer>
        {monthText}, {year}
      </S.DateContainer>
      <S.AmountContainer>{`$${formatMoney(amount)}`}</S.AmountContainer>
      <S.NavigateContainer>
        <NavigateIcon />
      </S.NavigateContainer>
    </S.Container>
  );
};

export default MonthLegend;
