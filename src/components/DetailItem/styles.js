import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  border-bottom: 1px solid #aeaeae;
  margin-bottom: 10px;
  padding: 10px 0;
  flex-direction: row;
`;

export const Row = styled.div`
  display: flex;
`;

export const Title = styled.h3`
  display: flex;
  flex: 1;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  margin-bottom: 0px;
`;

export const Amount = styled.div`
  display: flex;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
`;

export const Date = styled.div`
  display: flex;
  flex: 1;
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 13px;
`;

export const SubTitle = styled.div`
  display: flex;
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 13px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 18px;
`;