import React, { useState, useCallback } from "react";
import * as S from "./styles";
import {
  DetailItemComponent,
  ButtonComponent,
  InputComponent,
} from "components";
import Utils from "lib/utils";
import { getSheetConfig } from "config/localStorage";
import { addRow, deleteRow } from "services/configSpreadsheet";

const { formatMoney, moneyToNumber } = Utils.Currency;

const SCHEDULE_FREQUENCY_OPTIONS = Object.entries(
  Utils.Constants.SCHEDULE_FREQUENCY
).map((value) => ({
  value: value[0],
  label: value[1],
}));

const defaultForm = {
  name: "",
  frequency: 0,
  amount: "",
};

const Schedule = ({ doc, setMainLoading, DispatchTypes, modalDispatch }) => {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(defaultForm);

  const getStartData = async (doc) => {
    setMainLoading(true);
    setMainLoading(false);
  };

  const handleAddNew = () => {
    setShowForm(true);
  };

  const hideForm = () => {
    setShowForm(false);
  };

  const schedules = getSheetConfig();

  const onChange = (name, value) => {
    if (name && value) {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const addSchedule = async () => {
    setMainLoading(true);
    try {
      const { name, frequency, amount } = form;
      await addRow(doc, name, frequency, amount);
      setForm(defaultForm);
      hideForm();
    } catch (error) {
      console.log("ERROR (addSchedule)", error);
    } finally {
      setMainLoading(false);
    }
  };

  const deleteRecord = async (id) => {
    modalDispatch({
      type: DispatchTypes.Modal.MODAL_SHOW,
      title: "Confirmation",
      content: "Do you really want to delete this record?",
      actions: [
        {
          type: "secondary",
          text: "Delete",
          action: async () => {
            modalDispatch({ type: DispatchTypes.Modal.MODAL_HIDE });
            setMainLoading(true);
            await deleteRow(doc, id);
            getStartData(doc);
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

  if (showForm) {
    return (
      <S.Content>
        <S.Form>
          <InputComponent
            type="text"
            placeholder="Schedule name"
            name="name"
            value={form.name}
            onChange={onChange}
            title="Name"
          />
          <InputComponent
            type="dropdown"
            name="frequency"
            title="Frequency"
            options={SCHEDULE_FREQUENCY_OPTIONS}
            value={
              SCHEDULE_FREQUENCY_OPTIONS &&
              form.frequency &&
              SCHEDULE_FREQUENCY_OPTIONS[form.frequency]
            }
            onChange={onChange}
            placeholder="Select frequency"
            isSearchable={false}
          />
          <InputComponent
            type="money"
            placeholder="0"
            name="amount"
            value={form.amount}
            onChange={onChange}
          />
        </S.Form>
        <ButtonComponent text="Save" action={addSchedule} />
        <ButtonComponent type="text" text="Cancel" action={hideForm} />
      </S.Content>
    );
  }

  return (
    <S.Content>
      <S.TableContainer>
        {schedules.map(({ Name, Amount, Frequency, Id }) => {
          const priceFormatted = `$${formatMoney(moneyToNumber(Amount))}`;
          const typeSchedule = Utils.Constants.SCHEDULE_FREQUENCY[Frequency];
          return (
            <DetailItemComponent
              key={Name}
              amount={priceFormatted}
              title={Name}
              description={typeSchedule}
              deleteAction={() => deleteRecord(Id)}
            />
          );
        })}
      </S.TableContainer>
      <ButtonComponent text="Add new" action={handleAddNew} />
    </S.Content>
  );
};

export default Schedule;
