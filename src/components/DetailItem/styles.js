import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  border-bottom: 1px solid #aeaeae;
  margin-bottom: 10px;
  padding: 10px 0;
  flex-direction: row;
  gap: 10px;
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
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    .skeleton {
      display: flex;
    }
  }
`;

export const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 18px;
  background-color: #38b44e;
  padding: 10px;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  text-align: center;
  svg path {
    fill: white;
  }

  .skeleton {
    display: flex;
  }
`;
