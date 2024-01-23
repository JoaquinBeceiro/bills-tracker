import React from "react";
import * as S from "./styles";
import { DeleteIcon } from "components";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

const DetailItem = ({
  title,
  description,
  amount,
  subTitle,
  deleteAction,
  isLoading,
}) => {
  const SkeletonComp = () => (
    <Skeleton containerClassName="flex-1" width={"100px"} />
  );

  return (
    <S.Container>
      <S.Content fullWidth={true}>
        <S.Row>
          <S.Title>{isLoading ? <SkeletonComp /> : title}</S.Title>
          <S.Amount>{isLoading ? <SkeletonComp /> : amount}</S.Amount>
        </S.Row>
        <S.Row>
          <S.Date>{isLoading ? <SkeletonComp /> : description}</S.Date>
          <S.SubTitle>{isLoading ? <SkeletonComp /> : subTitle}</S.SubTitle>
        </S.Row>
      </S.Content>
      {deleteAction && (
        <S.ActionContainer>
          {isLoading ? (
            <Skeleton
              circle
              width={24}
              height={24}
              containerClassName="flex-1"
            />
          ) : (
            <div
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                deleteAction();
              }}
            >
              <DeleteIcon />
            </div>
          )}
        </S.ActionContainer>
      )}
    </S.Container>
  );
};

export default DetailItem;
