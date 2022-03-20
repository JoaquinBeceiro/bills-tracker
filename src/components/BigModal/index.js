import React from "react";
import * as S from "./styles";

const BigModal = ({ title, subTitle, children, handleClose }) => {
  return (
    <S.Container onClick={handleClose}>
      <S.Modal>
        {
          subTitle ?
            <S.TitleWithSubtitleContainer>
              <S.TitleWithSubtitle>{title}</S.TitleWithSubtitle>
              <S.SubTitle>{subTitle}</S.SubTitle>
            </S.TitleWithSubtitleContainer> :
            <S.Title>{title}</S.Title>
        }
        <S.Content>{children}</S.Content>
      </S.Modal>
    </S.Container>
  );
};
export default BigModal;
