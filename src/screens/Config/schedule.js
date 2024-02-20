import React, { useState, useCallback, useEffect } from "react";
import * as S from "./styles";
import {
  DetailItemComponent,
  ButtonComponent,
  InputComponent,
} from "components";
import Utils from "lib/utils";
import { addRow, getLocalSheetData } from "services/configSpreadsheet";
import EmptyBox from "rsc/img/emptybox.png";
import { sheetHeadersSchedule } from "config/sheet";

const { formatMoney, moneyToNumber } = Utils.Currency;

const SCHEDULE_FREQUENCY_OPTIONS = Utils.Constants.SCHEDULE_FREQUENCY.map(
  ({ key, value }) => ({
    value: key,
    label: value,
  })
);

const defaultForm = {
  name: "",
  type: "",
  frequency: 0,
  amount: "",
  description: "",
};

const Schedule = ({
  doc,
  setMainLoading,
  isLoading,
  billsTypes,
  deleteRecord,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [schedules, setSchedules] = useState(null);

  const getStartData = useCallback(async () => {
    const data = await getLocalSheetData(
      doc,
      Utils.Constants.SCHEDULE,
      sheetHeadersSchedule
    );
    setSchedules(data);
  }, [doc]);

  useEffect(() => {
    if (doc && !isLoading) {
      getStartData();
    }
  }, [doc, getStartData, isLoading]);

  const handleAddNew = () => {
    setShowForm(true);
  };

  const hideForm = () => {
    setShowForm(false);
  };

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
      const { name, type, frequency, amount, description } = form;
      const data = { name, type, frequency, amount, description };
      await addRow(doc, Utils.Constants.SCHEDULE, sheetHeadersSchedule, data);
      setForm(defaultForm);
      getStartData();
      hideForm();
    } catch (error) {
      console.log("ERROR (addSchedule)", error);
    } finally {
      setMainLoading(false);
    }
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
            type="creatableDropdown"
            name="type"
            title="Type"
            options={billsTypes}
            value={billsTypes && form.type && billsTypes[form.type]}
            onChange={onChange}
            placeholder="Write to create new type"
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
          <InputComponent
            type="bigtext"
            name="description"
            title="Description"
            placeholder="Write a description..."
            value={form.description}
            onChange={onChange}
          />
        </S.Form>
        <ButtonComponent text="Save" action={addSchedule} />
        <ButtonComponent type="text" text="Cancel" action={hideForm} />
      </S.Content>
    );
  }

  const SkeletonLoading = (isLoading) => {
    return !isLoading ? (
      <S.NoData>
        <img src={EmptyBox} alt="Empty box" />
        <p className="strong">You have not created any schedule yet.</p>
        <p>You can easily create and manage your schedules on this page.</p>
      </S.NoData>
    ) : (
      <>
        <DetailItemComponent deleteAction={true} isLoading={true} />
        <DetailItemComponent deleteAction={true} isLoading={true} />
        <DetailItemComponent deleteAction={true} isLoading={true} />
      </>
    );
  };

  return (
    <S.Content>
      <S.TableContainer>
        {schedules === null || schedules.length === 0
          ? SkeletonLoading(isLoading)
          : schedules.map(
              ({ Name, Type, Amount, Frequency, Description, Id }) => {
                const priceFormatted = `$${formatMoney(moneyToNumber(Amount))}`;
                const typeSchedule = Utils.Constants.SCHEDULE_FREQUENCY.find(
                  ({ key }) => key === Frequency
                ).value;
                return (
                  <DetailItemComponent
                    key={`${Id}-${Name}`}
                    amount={priceFormatted}
                    title={`${Name} (${typeSchedule})`}
                    subTitle={Type}
                    description={Description}
                    deleteAction={() =>
                      deleteRecord(
                        Id,
                        Utils.Constants.SCHEDULE,
                        sheetHeadersSchedule
                      )
                    }
                  />
                );
              }
            )}
      </S.TableContainer>
      <ButtonComponent
        text="Add new"
        action={handleAddNew}
        disabled={isLoading}
      />
    </S.Content>
  );
};

export default Schedule;
