import React from "react";
import * as S from "./styles";
import { DeleteIcon, IconComponent } from "components";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

const DetailItem = ({
  title,
  description,
  amount,
  subTitle,
  icon,
  deleteAction,
  isLoading,
}) => {
  const SkeletonComp = () => (
    <Skeleton containerClassName="flex-1" width={"100px"} />
  );

  return (
    <S.Container>
      {icon &&
        (isLoading ? (
          <S.IconContainer>
            <Skeleton
              circle
              width={36}
              height={36}
              containerClassName="skeleton"
            />
          </S.IconContainer>
        ) : (
          <S.IconContainer>
            <IconComponent icon={icon} />
          </S.IconContainer>
        ))}
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
            <div>
              <Skeleton
                circle
                width={20}
                height={20}
                containerClassName="skeleton"
              />
            </div>
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
