import React from "react";
import * as S from "./styles";

const DetailItem = ({ title, date, amount }) => {
  return (
    <S.Container>
      <S.Row>
        <S.Title>{title}</S.Title>
        <S.Amount>{amount}</S.Amount>
      </S.Row>
      <S.Row>
        <S.Date>{date}</S.Date>
      </S.Row>
    </S.Container>
  );
};

export default DetailItem;
