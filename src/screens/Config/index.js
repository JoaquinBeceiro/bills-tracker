import React, { useState, useContext, useEffect, useCallback } from "react";
import { NoHeaderLayout } from "layouts";
import { TabsComponent, LoadingComponent } from "components";
import * as S from "./styles";
import Schedule from "./schedule";
import Utils from "lib/utils";
import { GlobalContext, DispatchTypes } from "context";
import { storeSheetData } from "services/configSpreadsheet";

const Config = () => {
  const context = useContext(GlobalContext);
  const [userState] = context.globalUser;
  const [, modalDispatch] = context.globalModal;

  const { doc, loading } = userState;

  const [mainLoading, setMainLoading] = useState(true);
  const [menuItems, setMenuItems] = useState(Utils.Constants.MENU_ITEMS);

  const getStartData = useCallback(async () => {
    setMainLoading(true);
    await storeSheetData(doc);
    setMainLoading(false);
  }, [doc]);

  useEffect(() => {
    getStartData();
  }, [getStartData]);

  const menuAction = (key) => {
    const newMenuItems = Utils.Constants.MENU_ITEMS.map((item) => ({
      ...item,
      active: key === item.label,
    }));
    setMenuItems(newMenuItems);
  };

  const activeItem = menuItems.find(({ active }) => active).label;

  const isLoading = loading || mainLoading;

  return (
    <>
      <NoHeaderLayout>
        <TabsComponent items={menuItems} action={menuAction} />
        <S.Container>
          {activeItem === Utils.Constants.SCHEDULE && (
            <Schedule
              doc={doc}
              setMainLoading={setMainLoading}
              DispatchTypes={DispatchTypes}
              modalDispatch={modalDispatch}
              isLoading={isLoading}
            />
          )}
          {activeItem === Utils.Constants.PROFILE && <>PROFILE</>}
          {activeItem === Utils.Constants.BUDGET && <>BUDGET</>}
        </S.Container>
      </NoHeaderLayout>
      {isLoading && <LoadingComponent />}
    </>
  );
};

export default Config;
