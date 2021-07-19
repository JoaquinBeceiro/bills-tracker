import styled from "styled-components";

export const Container = styled.div`
  display: flex;
`;

export const ChartContainer = styled.div`
  display: flex;
  flex: 0.2;
  height: 50px;
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
  padding-left: 10px;
  border-bottom: 1px solid #c4c4c4;
`;

export const TitleContainer = styled.div`
  flex: 1;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
`;

export const SubTitle = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 10px;
`;

export const DataContainer = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;
  font-family: Roboto;
  text-align: right;
  span:first-child {
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
  }
  span:last-child {
    font-style: normal;
    font-weight: 300;
    font-size: 10px;
  }
`;
