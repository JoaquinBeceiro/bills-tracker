import React, { useState, useContext, useEffect, useCallback } from "react";
import { NoHeaderLayout } from "layouts";
import { TabsComponent, LoadingComponent } from "components";
import * as S from "./styles";
import Schedule from "./schedule";
import Utils from "lib/utils";
import { GlobalContext, DispatchTypes } from "context";
import { storeSheetData } from "services/configSpreadsheet";
import { getTypes } from "services";

const Config = () => {
  const context = useContext(GlobalContext);
  const [userState] = context.globalUser;
  const [, modalDispatch] = context.globalModal;

  const { doc, loading } = userState;

  const [mainLoading, setMainLoading] = useState(true);
  const [menuItems, setMenuItems] = useState(Utils.Constants.MENU_ITEMS);
  const [billsTypes, setBillsTypes] = useState([]);

  const alertModal = useCallback(
    (title, content, actions) => {
      modalDispatch({
        type: DispatchTypes.Modal.MODAL_SHOW,
        title,
        content,
        actions: [
          {
            text: "Ok",
            action: () => {
              modalDispatch({ type: DispatchTypes.Modal.MODAL_HIDE });
              actions && actions();
            },
          },
        ],
      });
    },
    [modalDispatch]
  );

  const getStartData = useCallback(async () => {
    setMainLoading(true);
    try {
      await storeSheetData(doc);
      const types = await getTypes(doc);
      const typesFormatted = types.map((type) => ({
        value: type,
        label: type,
      }));
      setBillsTypes(typesFormatted);
    } catch (e) {
      console.log("getStartData ERROR", e);
      alertModal("Error", "There was an error. Please try again later.");
      setMainLoading(false);
    }

    setMainLoading(false);
  }, [alertModal, doc]);

  useEffect(() => {
    if (doc) {
      getStartData();
    }
  }, [getStartData, doc]);

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
              billsTypes={billsTypes}
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
