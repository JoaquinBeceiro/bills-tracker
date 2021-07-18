import React, { useContext, useEffect, useState } from "react";
import { NoHeaderLayout } from "layouts";
import { PieChartComponent, ChartLegendsComponent } from "components";
import * as S from "./styles";

const Type = () => {
  const data = [
    { name: "Rent", value: 400, v: 89, color: "#F7885B" },
    { name: "Others", value: 300, v: 100, color: "#5455FF" },
    { name: "Car", value: 100, v: 200, color: "#4CE2AD" },
    { name: "Market", value: 300, v: 20, color: "#8F5AFF" },
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
            />
          ))}
        </div>
      </S.Container>
    </NoHeaderLayout>
  );
};

export default Type;
