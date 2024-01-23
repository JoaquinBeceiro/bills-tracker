import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 20px 0 50px 0;
  flex: 1;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
`;

export const NoData = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  text-align: center;
  flex-direction: column;
  color: #7e7e7e;
  font-family: Roboto;
  font-size: 13px;
  font-style: normal;
  font-weight: 300;
  text-transform: uppercase;

  p {
    margin: 0;
  }
`;
