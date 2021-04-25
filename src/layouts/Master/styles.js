import styled from "styled-components";
import bg from "../../rsc/img/bg.svg";

const Container = styled.div`
  padding-bottom: ${({ footer }) => (footer ? "50px" : "0px;")};
  padding-top: 60px;
  min-height: 100vh;
  background-color: #38b44e;
  z-index: 1;
  background: url(${bg});
  background-size: cover;
`;

const Content = styled.div`
  min-height: calc(100vh - 60px);
  display: flex;
`;

export { Container, Content };
