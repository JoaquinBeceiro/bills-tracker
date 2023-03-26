import styled from "styled-components";
import bg from "../../rsc/img/bg.svg";

const Container = styled.div`
  padding-bottom: ${({ footer }) => (footer ? "50px" : "0px;")};
  height: 100vh;
  min-height: 100vh;
  @media (display-mode: browser) {
    height: var(--vh);
    max-height: var(--vh);
  }
  background-color: #38b44e;
  z-index: 1;
  background: url(${bg});
  background-size: cover;
`;

const Content = styled.div`
  display: flex;
  @media (display-mode: browser) {
    height: ${({ footer }) =>
      footer ? "calc(var(--vh) - 110px);" : "calc(var(--vh) - 60px);"};
    max-height: ${({ footer }) =>
      footer ? "calc(var(--vh) - 110px);" : "calc(var(--vh) - 60px);"};
  }
`;

export { Container, Content };
