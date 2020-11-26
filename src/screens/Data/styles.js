import styled from "styled-components";

const AbsoluteContainerStyled = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eee;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  font-size: 10px;
  & .close {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 50px;
    background-color: #000;
    color: #fff;
    text-align: center;
    font-weight: bolder;
    padding: 5px;
    cursor: pointer;
  }
`;

export { AbsoluteContainerStyled };
