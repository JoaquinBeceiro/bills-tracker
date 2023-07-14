import React, { useState, useEffect, useRef } from "react";
import { Container, Tooltip } from "./styles";

const CustomTooltip = ({ children, infoTitle, infoText }) => {
  const [open, setOpen] = useState(false);

  const ref = useRef(null);

  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Container ref={ref}>
      <span onClick={handleOpen}>{children}</span>
      <Tooltip open={open}>
        {infoTitle && <h2>{infoTitle}</h2>}
        {infoText && <p>{infoText}</p>}
      </Tooltip>
    </Container>
  );
};

export default CustomTooltip;
