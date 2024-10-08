import React, { useContext, useEffect, useState, useCallback } from "react";
import { GlobalContext, DispatchTypes } from "context";
import { LoadingComponent, ButtonComponent, InputComponent } from "components";
import { HeaderLayout } from "layouts";
import { getTypes, addRow, createDoc, HeaderData } from "services";
import Utils from "lib/utils";
import { useHistory } from "react-router-dom";
import { isMath, evaluateMath, isNumber } from "utils/math";

const Main = () => {
  const history = useHistory();

  const { todayDate } = Utils.Date;

  const [mainLoading, setMainLoading] = useState(true);
  const [billsTypes, setBillsTypes] = useState([]);
  const [checked, setChecked] = useState(false);
  const [headerData, setHeaderData] = useState(null);

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

        const typesFormatted = types.map((type) => ({
          value: type,
          label: type,
        }));

        const headerData = await HeaderData(doc);

        setBillsTypes(typesFormatted);
        setHeaderData(headerData);

        setMainLoading(false);
      } catch (e) {
        console.log("getStartData ERROR", e);
        alertModal("Error", "There was an error. Please try again later.");
        setMainLoading(false);
      }
    },
    [alertModal]
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
      setMainLoading(false);
      history.push("/");
      console.log("createDoc ERROR", e);
    }
  }, [history, user, userDispatch]);

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

  const addBill = async () => {
    const { type, date, description } = form;
    let { amount } = form;

    const isAmountMath = isMath(amount);
    const isAmountNumber = isNumber(amount);

    if( isAmountMath ){
      try {
        amount = Math.round( evaluateMath(amount) );
      } catch (error){
        amount = "";
      }
    } 

    if( amount.length === 0 || !((isAmountNumber && !isAmountMath) || (!isAmountNumber && isAmountMath))){
      alertModal(
        "Error",
        "There was an error trying to add a new bill. The amount field is not valid."
      );
      setMainLoading(false);
      return;
    }

    if (window.gtag) {
      window.gtag("event", "add_bill", {
        ...form,
      });
    }

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
          console.log("addBill ERROR", addAction);
          alertModal(
            "Error",
            "There was an error trying to add a new bill. Please try again later."
          );
          setMainLoading(false);
        }
        setMainLoading(false);
      } catch  (error) {
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
      <HeaderLayout headerBox={headerData}>
        <InputComponent
          type="money"
          placeholder="0"
          name="amount"
          value={form.amount}
          onChange={onChange}
        />
        <InputComponent
          type="creatableDropdown"
          name="type"
          title="Type"
          options={billsTypes}
          value={billsTypes && form.type && billsTypes[form.type]}
          onChange={onChange}
          placeholder="Write to create new type"
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
