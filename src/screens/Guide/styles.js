import styled from "styled-components";

export const Content = styled.div`
  height: calc(100vh - 125px);
  @media (display-mode: browser) {
    height: 100%;
  }
  display: flex;
  flex-direction: column;
  > div:first-child {
    flex: 1;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: scroll;
  width: 100%;
`;

export const ImageContainer = styled.div`
  margin: 20px 0;
  & img {
    width: 100%;
  }
`;

export const Title = styled.h1`
  font-family: "Roboto";
  font-weight: 400;
  font-size: 21px;
`;

export const Pharagraph = styled.p`
  font-family: "Roboto";
  font-weight: 300;
  font-size: 14px;
`;

export const Mark = styled.span`
  color: #38b44e;
`;

export const Strong = styled.p`
  font-family: "Roboto";
  font-weight: 500;
  font-size: 14px;
`;

export const OrderList = styled.ol`
  font-family: "Roboto";
  font-weight: 300;
  font-size: 14px;
  margin: 0;
  padding: 0 0 0 15px;
`;

export const Link = styled.a`
  color: #38b44e;
  cursor: pointer;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StepsContainer = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 3;
  margin: 0;
  padding: 0;
  height: 100%;
`;

export const Step = styled.li`
  display: block;
  background: ${(props) => (props.active ? "#38B44E" : "#C4C4C4")};
  border-radius: 50%;
  width: 12px;
  height: 12px;
  margin: 6px;
`;

export const Navigator = styled.div`
  color: #38b44e;
  font-family: "Roboto";
  font-weight: 500;
  font-size: 14px;
  flex: 1;
  text-align: ${(props) => props.next && "right"};
  height: 100%;
  cursor: pointer;
`;

export const GithubLink = styled.a`
  background: #333333;
  border-radius: 7px;
  font-family: "Roboto";
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;
  align-items: center;
  text-align: center;
  color: #ffffff;
  text-decoration: none;
  padding: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  min-width: 180px;
  margin: 10px auto;
  & img {
    padding-right: 6px;
  }
`;
