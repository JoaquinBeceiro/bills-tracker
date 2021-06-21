import React from "react";
import * as S from "./styles";

const Modal = ({ title, content, actions }) => {
  return (
    <S.Container>
      <S.Modal>
        <S.Title>{title}</S.Title>
        <S.Content>{content}</S.Content>
      </S.Modal>
    </S.Container>
  );
};
export default Modal;
