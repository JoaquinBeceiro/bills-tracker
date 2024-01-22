import React from "react";
import { Container, MenuItem } from "./styles";
import { useHistory, useLocation } from "react-router-dom";
import { PieChartIcon, LineChartIcon, HomeIcon, GearIcon } from "../";

const Footer = () => {
  const history = useHistory();
  const location = useLocation();

  const isActive = (navItem) => location.pathname.includes(navItem);

  const handleNavigate = (route) => {
    history.push(route);
  };

  return (
    <Container>
      <MenuItem
        onClick={() => handleNavigate("/types")}
        className={isActive("types") ? "active" : ""}
      >
        <PieChartIcon />
      </MenuItem>
      <MenuItem
        onClick={() => handleNavigate("/home")}
        className={isActive("home") ? "active" : ""}
      >
        <HomeIcon />
      </MenuItem>
      <MenuItem
        onClick={() => handleNavigate("/analytics")}
        className={isActive("analytics") ? "active" : ""}
      >
        <LineChartIcon />
      </MenuItem>

      <MenuItem
        onClick={() => handleNavigate("/config")}
        className={isActive("config") ? "active" : ""}
      >
        <GearIcon />
      </MenuItem>
    </Container>
  );
};

export default Footer;
