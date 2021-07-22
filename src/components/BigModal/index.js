import React from "react";
import * as S from "./styles";

const BigModal = ({ title, children, handleClose }) => {
  return (
    <S.Container onClick={handleClose}>
      <S.Modal>
        <S.Title>{title}</S.Title>
        <S.Content>{children}</S.Content>
      </S.Modal>
    </S.Container>
  );
};
export default BigModal;
