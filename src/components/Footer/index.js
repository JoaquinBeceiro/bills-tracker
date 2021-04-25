import React from "react";
import { Container, MenuItem } from "./styles";
import { useHistory } from "react-router-dom";
import { PieChartIcon, LineChartIcon, HomeIcon } from "../";

const Footer = () => {
  const history = useHistory();

  const handleNavigate = (route) => {
    history.push(route);
  };

  return (
    <Container>
      <MenuItem onClick={() => handleNavigate("/types")}>
        <PieChartIcon />
      </MenuItem>
      <MenuItem onClick={() => handleNavigate("/home")}>
        <HomeIcon />
      </MenuItem>
      <MenuItem onClick={() => handleNavigate("/analytics")}>
        <LineChartIcon />
      </MenuItem>
    </Container>
  );
};

export default Footer;
