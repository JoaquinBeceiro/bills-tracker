import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding-bottom: 50px;
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  > div {
    flex: 1;
    :last-child {
      display: flex;
    }
  }
`;

export const Title = styled.h2`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
`;

export const LeggendsContainer = styled.div`
  margin-top: 25px;
`;

export const SubTitleContainer = styled.div`
  margin: 20px 0px;
`;

export const SubTitle = styled.h3`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  margin: 0px;
`;

export const ResumeTotal = styled.h4`
  font-family: Roboto;
  font-weight: 300;
  font-size: 10px;
  span {
    font-weight: 500;
    color: #6fcf97;
  }
`;

export const CategoryList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  gap: 10px;
  flex-flow: row wrap;
`;
