import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80px;
`;

const Content = styled.div`
  background: #ffffff;
  border-radius: 7px;
  padding: 7px 15px;
  margin: 7px;
  display: flex;
  width: fit-content;
  flex-direction: column;
  text-align: left;
  position: relative;
`;

const Title = styled.h2`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  color: #333;
  line-height: 28px;
  margin: 0px;
`;

const PrimaryValue = styled.h3`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  color: #333;
  line-height: 28px;
  margin: 0px;
`;

const SecondaryValue = styled.h3`
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  color: #aaaaaa;
  display: flex;
  align-items: center;
  > svg {
    margin-right: 3px;
  }
`;

const Info = styled.div`
  background-color: #999999;
  border-radius: 50%;
  width: 12px;
  height: 12px;
  position: absolute;
  right: 0px;
  top: 7px;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 3px;
    path {
      fill: #fff;
    }
  }
`;

export { Container, Content, PrimaryValue, SecondaryValue, Title, Info };
