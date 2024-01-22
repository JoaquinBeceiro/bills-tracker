import React, { useState } from "react";
import { NoHeaderLayout } from "layouts";
import { LoadingComponent, TabsComponent } from "components";
import * as S from "./styles";

const defaultMenuItems = [
  { label: "schedule", active: true },
  { label: "profile", active: false },
  { label: "budget", active: false },
  { label: "types", active: false, disabled: true },
];

const Config = () => {
  const screenLoading = false;

  const [menuItems, setMenuItems] = useState(defaultMenuItems);

  const menuAction = (key) => {
    const newMenuItems = defaultMenuItems.map((item) => ({
      ...item,
      active: key === item.label,
    }));
    setMenuItems(newMenuItems);
  };

  const activeItem = menuItems.find(({ active }) => active).label;

  return (
    <>
      <NoHeaderLayout>
        <TabsComponent items={menuItems} action={menuAction} />
        <S.Container>Config {activeItem}</S.Container>
      </NoHeaderLayout>

      {screenLoading && <LoadingComponent />}
    </>
  );
};

export default Config;
