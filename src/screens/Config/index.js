import React, { useState, useContext, useEffect, useCallback } from "react";
import { NoHeaderLayout } from "layouts";
import { TabsComponent, LoadingComponent } from "components";
import * as S from "./styles";
import Schedule from "./schedule";
import Types from "./types";
import Utils from "lib/utils";
import { GlobalContext, DispatchTypes } from "context";
import { storeSheetData, deleteRow } from "services/configSpreadsheet";
import { getTypes } from "services";
import { sheetHeadersSchedule, sheetHeadersTypes } from "config/sheet";
import { useHistory, useLocation } from "react-router-dom";

const Config = () => {
  const history = useHistory();
  const location = useLocation();

  const active = new URLSearchParams(location.search).get("active");

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

  const getStartData = useCallback(
    async (title, headers) => {
      setMainLoading(true);
      try {
        await storeSheetData(doc, title, headers);
        const types = await getTypes(doc);
        const typesFormatted = types.map((type) => ({
          value: type,
          label: type,
        }));
        setBillsTypes(typesFormatted);
      } catch (e) {
        console.log("getStartData ERROR", e);
        alertModal(
          "Error",
          `There was an error trying to obtain ${title.toLowerCase()} data. Please try again later.`
        );
        setMainLoading(false);
      }

      setMainLoading(false);
    },
    [alertModal, doc]
  );

  useEffect(() => {
    if (doc) {
      getStartData(Utils.Constants.SCHEDULE, sheetHeadersSchedule);
      getStartData(Utils.Constants.TYPES, sheetHeadersTypes);
    }
  }, [getStartData, doc]);

  const menuAction = useCallback(
    (key) => {
      const newMenuItems = Utils.Constants.MENU_ITEMS.map((item) => ({
        ...item,
        active: key === item.label,
      }));
      history.push({
        search: `?active=${key}`,
      });
      setMenuItems(newMenuItems);
    },
    [history]
  );

  const checkActivePath = useCallback(
    (activePath) => {
      const findItem = Utils.Constants.MENU_ITEMS.find(
        ({ label }) => label === activePath
      );
      if (findItem && !findItem.disabled) {
        menuAction(activePath);
      } else {
        history.push({
          search: "",
        });
      }
    },
    [history, menuAction]
  );

  useEffect(() => {
    if (active) {
      const activeMenu = menuItems.find(({ active }) => active).label;
      if (activeMenu !== active) {
        checkActivePath(active);
      }
    }
  }, [active, checkActivePath, menuItems]);

  const deleteRecord = async (id, title, headers) => {
    modalDispatch({
      type: DispatchTypes.Modal.MODAL_SHOW,
      title: title,
      content: "Do you really want to delete this record?",
      actions: [
        {
          type: "secondary",
          text: "Delete",
          action: async () => {
            modalDispatch({ type: DispatchTypes.Modal.MODAL_HIDE });
            setMainLoading(true);
            await deleteRow(doc, title, headers, id);
            getStartData(title, headers);
            setMainLoading(false);
          },
        },
        {
          type: "text",
          text: "Cancel",
          action: () => {
            modalDispatch({ type: DispatchTypes.Modal.MODAL_HIDE });
          },
        },
      ],
    });
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
              isLoading={isLoading}
              billsTypes={billsTypes}
              deleteRecord={deleteRecord}
            />
          )}
          {activeItem === Utils.Constants.TYPES && (
            <Types
              doc={doc}
              setMainLoading={setMainLoading}
              isLoading={isLoading}
              billsTypes={billsTypes}
              deleteRecord={deleteRecord}
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
