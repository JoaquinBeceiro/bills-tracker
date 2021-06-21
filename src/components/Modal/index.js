import React from "react";
import * as S from "./styles";
import { ButtonComponent } from "components";

const Modal = ({ title, content, actions }) => {
  return (
    <S.Container>
      <S.Modal>
        <S.Title>{title}</S.Title>
        <S.Content>{content}</S.Content>
        <S.ActionsContainer>
          {actions.map((action, key) => (
            <ButtonComponent {...action} key={`actionButton-${key}`} />
          ))}
        </S.ActionsContainer>
      </S.Modal>
    </S.Container>
  );
};
export default Modal;
