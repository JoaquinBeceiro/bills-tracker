import React, { useState } from "react";
import * as S from "./styles";
import {
  DetailItemComponent,
  ButtonComponent,
  InputComponent,
} from "components";
import Utils from "lib/utils";
import { getSheetConfig } from "config/localStorage";

const { formatMoney } = Utils.Currency;

const SCHEDULE_FREQUENCY_OPTIONS = Object.entries(
  Utils.Constants.SCHEDULE_FREQUENCY
).map((value) => ({
  value: value[0],
  label: value[1],
}));

const defaultForm = {
  name: "",
  frequency: 0,
  amount: 1,
};

const Schedule = () => {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(defaultForm);

  const handleAddNew = () => {
    setShowForm(true);
  };

  const hideForm = () => {
    setShowForm(false);
  };

  const schedules = getSheetConfig();

  const deleteRecord = (name) => {
    alert(name);
  };

  const onChange = (name, value) => {
    if (name && value) {
      setForm({
        ...form,
        [name]: value,
      });
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
            value={""}
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
            value={0}
            onChange={onChange}
          />
        </S.Form>
        <ButtonComponent text="Save" action={hideForm} />
        <ButtonComponent type="text" text="Cancel" action={hideForm} />
      </S.Content>
    );
  }

  return (
    <S.Content>
      <S.TableContainer>
        {schedules.map(({ name, amount, frequency }) => {
          const priceFormatted = `$${formatMoney(amount)}`;
          const typeSchedule = Utils.Constants.SCHEDULE_FREQUENCY[frequency];
          return (
            <DetailItemComponent
              key={name}
              amount={priceFormatted}
              title={name}
              description={typeSchedule}
              deleteAction={() => deleteRecord(name)}
            />
          );
        })}
      </S.TableContainer>
      <ButtonComponent text="Add new" action={handleAddNew} />
    </S.Content>
  );
};

export default Schedule;
