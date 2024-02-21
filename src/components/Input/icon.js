import React, { useState, useEffect } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import * as S from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Icon = ({ name, placeholder, disabled, onChange }) => {
  const [iconPack, setIconPack] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (iconPack.length === 0) {
      import("@fortawesome/free-solid-svg-icons").then((module) => {
        const fas = { ...module.fas };
        delete fas.faCookie;
        delete fas.faFontAwesomeLogoFull;

        const icons = [
          ...new Map(
            Object.values(fas)
              .map((icon) => ({
                prefix: icon.prefix,
                icon: icon.icon,
                iconName: icon.iconName,
              }))
              .map((v) => [v.iconName, v])
          ).values(),
        ];

        library.add(...icons);
        setIconPack(icons);
      });
    }
  }, [iconPack]);

  const iconsFiltered = iconPack.filter((icon) => {
    return icon.iconName.includes(searchText.toLowerCase());
  });

  const handleSelectIcon = (iconName) => {
    onChange(iconName);
    setSearchText("");
    setOpen(false);
    setSelectedIcon(iconName);
  };

  const handleTextChange = (text) => {
    setSearchText(text);
    setOpen(true);
  };

  return (
    <S.IconBox>
      <S.IconText
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        value={searchText}
        onChange={(e) => handleTextChange(e.target.value)}
      />
      <S.IconContainer>
        {selectedIcon && <FontAwesomeIcon icon={selectedIcon} />}
      </S.IconContainer>
      {open && (
        <>
          <S.IconSearchOverlay
            onClick={() => setOpen(false)}
          ></S.IconSearchOverlay>
          <S.IconSearch>
            {iconsFiltered.map(({ prefix, iconName }, index) => (
              <div
                className="svg-icon-item"
                onClick={() => handleSelectIcon(iconName)}
                key={index + prefix + iconName}
              >
                <FontAwesomeIcon icon={iconName} />
              </div>
            ))}
          </S.IconSearch>
        </>
      )}
    </S.IconBox>
  );
};

export default Icon;
