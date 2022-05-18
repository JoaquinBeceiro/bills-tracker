import React from "react";
import * as S from "./styles";
import { DeleteIcon } from "components";

const DetailItem = ({ title, date, amount, subTitle, deleteAction }) => {
  return (
    <S.Container>
      <S.Content fullWidth={true}>
        <S.Row>
          <S.Title>{title}</S.Title>
          <S.Amount>{amount}</S.Amount>
        </S.Row>
        <S.Row>
          <S.Date>{date}</S.Date>
          <S.SubTitle>{subTitle}</S.SubTitle>
        </S.Row>
      </S.Content>
      {
        deleteAction &&
        <S.ActionContainer>
          <div onClick={
            e => {
              e.preventDefault();
              e.stopPropagation();
              deleteAction()
            }
          } >
            <DeleteIcon />
          </div>
        </S.ActionContainer>
      }
    </S.Container>
  );
};

export default DetailItem;
