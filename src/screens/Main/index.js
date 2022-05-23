import React, { useContext, useEffect, useState, useCallback } from "react";
import { GlobalContext, DispatchTypes } from "context";
import {
  ArrowIndicatorIcon,
  LoadingComponent,
  ButtonComponent,
  InputComponent,
} from "components";
import { HeaderLayout } from "layouts";
import { getTypes, getTotalByMonth, addRow } from "services";
import Utils from "lib/utils";

const Main = () => {
  const { moneyToNumber } = Utils.Currency;
  const { nowYear, nowMonth, pastMonthYear, todayDate } = Utils.Date;

  const [mainLoading, setMainLoading] = useState(true);
  const [totalMonth, setTotalMonth] = useState(0);
  const [pastMonth, setPastMonth] = useState(0);
  const [gratherThanPastMonth, setGratherThanPastMonth] = useState(false);
  const [billsTypes, setBillsTypes] = useState([]);

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
  const [userState] = context.globalUser;
  const [, modalDispatch] = context.globalModal;
  const { user, doc, loading } = userState;


  const getStartData = useCallback(async (doc) => {
    setMainLoading(true);
    try {


      const types = await getTypes(doc);
      const pastMonthYearValue = pastMonthYear();

      const totalMonthValue = await getTotalByMonth(doc, nowMonth(), nowYear());
      const totalPastMonthValue = await getTotalByMonth(
        doc,
        pastMonthYearValue.month,
        pastMonthYearValue.year
      );

      const typesFormatted = types.map((type) => ({ value: type, label: type }));

      setBillsTypes(typesFormatted);
      setTotalMonth(totalMonthValue);
      setPastMonth(totalPastMonthValue);

      setGratherThanPastMonth(
        moneyToNumber(totalMonthValue) > moneyToNumber(totalPastMonthValue)
      );

      setMainLoading(false);
    } catch (e) {
      setMainLoading(false);

    }
  }, [moneyToNumber, nowMonth, nowYear, pastMonthYear]);

  useEffect(() => {
    if (!loading) {
      if (doc) {
        getStartData(doc);
      }
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
          modalDispatch({
            type: DispatchTypes.Modal.MODAL_SHOW,
            title: "Bill Added",
            content: "Your bill was successfully added!",
            actions: [
              {
                text: "Ok",
                action: () => {
                  modalDispatch({ type: DispatchTypes.Modal.MODAL_HIDE });
                  getStartData(doc);
                },
              },
            ],
          });
          clearForm();
        } else {
          // TODO: Error mesg
        }
        setMainLoading(false);
      } catch (error) {
        // TODO: Error mesg
        setMainLoading(false);
      }
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
