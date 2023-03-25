import React, { useContext, useEffect, useState, useCallback } from "react";
import { GlobalContext, DispatchTypes } from "context";
import {
  ArrowIndicatorIcon,
  LoadingComponent,
  ButtonComponent,
  InputComponent,
} from "components";
import { HeaderLayout } from "layouts";
import { getTypes, getTotalByMonth, addRow, createDoc } from "services";
import Utils from "lib/utils";

const Main = () => {
  const { moneyToNumber } = Utils.Currency;
  const { nowYear, nowMonth, pastMonthYear, todayDate } = Utils.Date;

  const [mainLoading, setMainLoading] = useState(true);
  const [totalMonth, setTotalMonth] = useState(0);
  const [pastMonth, setPastMonth] = useState(0);
  const [gratherThanPastMonth, setGratherThanPastMonth] = useState(false);
  const [billsTypes, setBillsTypes] = useState([]);
  const [checked, setChecked] = useState(false);

  const defaultForm = {
    amount: "",
    type: "",
    date: todayDate(),
    description: "",
  };
  const [form, setForm] = useState(defaultForm);

  const clearForm = () => setForm(defaultForm);

  const addBillDisabled = !(form.amount && form.type && form.date);

  const onChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const context = useContext(GlobalContext);
  const [userState, userDispatch] = context.globalUser;
  const [, modalDispatch] = context.globalModal;
  const { user, doc, loading } = userState;

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
    async (doc) => {
      setMainLoading(true);
      try {
        const types = await getTypes(doc);
        const pastMonthYearValue = pastMonthYear();

        const totalMonthValue = await getTotalByMonth(
          doc,
          nowMonth(),
          nowYear()
        );
        const totalPastMonthValue = await getTotalByMonth(
          doc,
          pastMonthYearValue.month,
          pastMonthYearValue.year
        );

        const typesFormatted = types.map((type) => ({
          value: type,
          label: type,
        }));

        setBillsTypes(typesFormatted);
        setTotalMonth(totalMonthValue);
        setPastMonth(totalPastMonthValue);

        setGratherThanPastMonth(
          moneyToNumber(totalMonthValue) > moneyToNumber(totalPastMonthValue)
        );

        setMainLoading(false);
      } catch (e) {
        console.log("getStartData ERROR", e);
        alertModal("Error", "There was an error. Please try again later.");
        setMainLoading(false);
      }
    },
    [alertModal, moneyToNumber, nowMonth, nowYear, pastMonthYear]
  );

  const createDocHandler = useCallback(async () => {
    try {
      const { access_token, refresh_token, expires_at, spreadsheetId } = user;
      const normalizedId = Utils.Common.getSpreadsheetId(spreadsheetId);

      const newDoc = await createDoc(
        access_token,
        refresh_token,
        expires_at,
        normalizedId
      );
      if (newDoc) {
        userDispatch({
          type: DispatchTypes.User.GET_DOC_SUCCESS,
          doc: newDoc,
        });
      }
    } catch (e) {
      console.log("createDoc ERROR", e);
    }
  }, [user, userDispatch]);

  useEffect(() => {
    if (doc === null && user && !checked) {
      setChecked(true);
      createDocHandler();
    }
  }, [doc, user, checked, createDocHandler]);

  useEffect(() => {
    if (!loading && doc) {
      getStartData(doc);
    }
  }, [doc, loading, getStartData]);

  const headerBoxProps = {
    primaryValue: `$${totalMonth}`,
    secondaryValue: `$${pastMonth} past month`,
    icon: <ArrowIndicatorIcon up={gratherThanPastMonth} />,
  };

  const addBill = async () => {
    const { amount, type, date, description } = form;

    if (amount && type && date && user.name) {
      setMainLoading(true);
      try {
        const addAction = await addRow(
          doc,
          date,
          user.name,
          amount,
          type,
          description
        );
        if (addAction) {
          const modalActionOk = () => getStartData(doc);
          alertModal(
            "Bill Added",
            "Your bill was successfully added!",
            modalActionOk
          );
          clearForm();
        } else {
          alertModal(
            "Error",
            "There was an error trying to add a new bill. Please try again later."
          );
          setMainLoading(false);
        }
        setMainLoading(false);
      } catch (error) {
        console.log("addBill ERROR", error);
        alertModal(
          "Error",
          "There was an error trying to add a new bill. Please try again later."
        );
        setMainLoading(false);
      }
    } else {
      console.log("addBill ERROR no user", user);
      alertModal(
        "Error",
        "There was an error trying to add a new bill. Please try again later."
      );
    }
  };

  const screenLoading = mainLoading || loading;

  return (
    <>
      <HeaderLayout headerBox={headerBoxProps}>
        <InputComponent
          type="money"
          placeholder="0"
          name="amount"
          value={form.amount}
          onChange={onChange}
        />
        <InputComponent
          type="dropdown"
          name="type"
          title="Type"
          options={billsTypes}
          value={billsTypes && form.type && billsTypes[form.type]}
          onChange={onChange}
        />
        <InputComponent
          type="date"
          name="date"
          title="Date"
          value={form.date}
          onChange={onChange}
        />
        <InputComponent
          type="bigtext"
          name="description"
          title="Description"
          placeholder="Write a description..."
          value={form.description}
          onChange={onChange}
        />
        <div>
          <ButtonComponent
            action={addBill}
            text="Add bill"
            disabled={addBillDisabled}
          />
        </div>
      </HeaderLayout>

      {screenLoading && <LoadingComponent />}
    </>
  );
};

export default Main;
