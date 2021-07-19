import React, { useContext, useEffect, useState } from "react";
import { NoHeaderLayout } from "layouts";
import { PieChartComponent, ChartLegendsComponent } from "components";
import * as S from "./styles";

const Type = () => {
  const data = [
    { name: "Rent", value: 24000, v: 89, color: "#F7885B", transactions: 1 },
    { name: "Others", value: 10200, v: 100, color: "#5455FF", transactions: 4 },
    { name: "Car", value: 700, v: 200, color: "#4CE2AD", transactions: 2 },
    { name: "Market", value: 8540, v: 20, color: "#8F5AFF", transactions: 8 },
    { name: "Pharmacy", value: 1300, v: 20, color: "#CDDC39", transactions: 4 },
  ];

  const total = data.reduce((prev, cur) => prev + cur.value, 0);

  return (
    <NoHeaderLayout>
      <S.Container>
        <PieChartComponent data={data} />

        <div>
          {data.map((item, index) => (
            <ChartLegendsComponent
              key={`legend-${index}`}
              title={item.name}
              value={item.value}
              color={item.color}
              total={total}
              count={item.transactions}
            />
          ))}
        </div>
      </S.Container>
    </NoHeaderLayout>
  );
};

export default Type;
