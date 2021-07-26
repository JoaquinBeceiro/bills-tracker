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
