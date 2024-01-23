import React from "react";
import * as S from "./styles";
import { DetailItemComponent, ButtonComponent } from "components";
import Utils from "lib/utils";

const { formatMoney } = Utils.Currency;

const Schedule = () => {
  const handleAddNew = () => {
    alert("Add");
  };

  const schedules = [
    { name: "Rent", price: 30000, type: 2 },
    { name: "Internet", price: 5000, type: 2 },
    { name: "Phone", price: 3000, type: 1 },
    { name: "Netflix", price: 3500, type: 2 },
  ];

  const deleteRecord = (name) => {
    alert(name);
  };

  return (
    <S.Content>
      <S.TableContainer>
        {schedules.map(({ name, price, type }) => {
          const priceFormatted = `$${formatMoney(price)}`;
          const typeSchedule = Utils.Constants.SCHEDULE_TYPES[type];
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
