import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

const Icon = ({ icon }) => {
  const [findIcon, setFindIcon] = useState(null);

  useEffect(() => {
    if (icon) {
      import("@fortawesome/free-solid-svg-icons").then((module) => {
        const fas = { ...module.fas };
        delete fas.faCookie;
        delete fas.faFontAwesomeLogoFull;

        const find = Object.values(fas).find(
          ({ iconName }) => iconName === icon
        );

        if (find) {
          library.add(find);
          setFindIcon(find);
        }
      });
    }
  }, [icon]);

  if (findIcon === null) {
    return <></>;
  }

  return <FontAwesomeIcon icon={findIcon} />;
};

export default Icon;
