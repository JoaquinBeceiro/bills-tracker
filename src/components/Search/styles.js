import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  position: fixed;
  background-color: #00000075;
  justify-content: center;
  top: 0px;
  left: 0px;
  height: 100vh;
  width: 100vw;
  z-index: 9999;
  padding: 25px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  max-height: 100%;
  width: 100%;
  gap: 15px;
  z-index: 99;
`;

export const SearchInputContainer = styled.div`
  border-radius: 6px;
  background: #fff;
  height: 34px;
  padding: 7px 8px;
  display: flex;
  gap: 6px;
  align-items: center;
`;

export const SearchInput = styled.input`
  font-family: Roboto;
  border: none;
  outline: none;
  font-size: 14px;
  color: #222;
  font-weight: normal;
  flex: 1;
  ::placeholder {
    font-weight: 200;
    color: #7e7e7e;
  }
  &:focus {
    outline: none;
    ::placeholder {
      color: #000;
    }
  }
`;

export const SearchResult = styled.div`
  border-radius: 6px;
  background: #fff;
  padding: 15px;
  height: fit-content;
  max-height: 100%;
  overflow-y: scroll;
`;

export const CloseContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 6px;
`;

export const NoResultsMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 200;
  color: #7e7e7e;
  flex: 1;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  img {
    width: 100%;
    padding: 0 30px;
  }
`;

export const CountContainer = styled.div`
  color: white;
  display: flex;
  justify-content: space-between;
  p {
    margin: 0;
  }
  > div:last-child {
    text-align: right;
  }
`;
