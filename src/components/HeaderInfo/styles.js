import styled from "styled-components";

export const Container = styled.div`
  max-width: 100%;
  .carousel-slider {
    padding-bottom: 15px;
  }
  .control-dots {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    bottom: -10px;
  }
`;

export const Indicator = styled.li`
  width: ${({ isSelected }) => (isSelected ? "13.6px" : "6.8px")};
  height: 6.8px;
  background: ${({ isSelected }) => (isSelected ? "#fff" : "#d9d9d9")};
  border-radius: 6px;
  margin: 3px;
  transition: all 0.5s ease;
`;
