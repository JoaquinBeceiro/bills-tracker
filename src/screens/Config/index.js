import React, { useState } from "react";
import { NoHeaderLayout } from "layouts";
import { LoadingComponent, TabsComponent } from "components";
import * as S from "./styles";
import Schedule from "./schedule";
import Utils from "lib/utils";

const Config = () => {
  const screenLoading = false;

  const [menuItems, setMenuItems] = useState(Utils.Constants.MENU_ITEMS);

  const menuAction = (key) => {
    const newMenuItems = Utils.Constants.MENU_ITEMS.map((item) => ({
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
        <S.Container>
          {activeItem === Utils.Constants.SCHEDULE && <Schedule />}
          {activeItem === Utils.Constants.PROFILE && <>PROFILE</>}
          {activeItem === Utils.Constants.BUDGET && <>BUDGET</>}
        </S.Container>
      </NoHeaderLayout>

      {screenLoading && <LoadingComponent />}
    </>
  );
};

export default Config;
