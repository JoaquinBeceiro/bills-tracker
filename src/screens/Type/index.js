import React, { useContext, useEffect, useState } from "react";
import { NoHeaderLayout } from "layouts";
import { PieChartComponent } from "components";
import * as S from "./styles";

const Type = () => {
  const data = [
    { name: "Rent", value: 400, v: 89, color: "#F7885B" },
    { name: "Others", value: 300, v: 100, color: "#5455FF" },
    { name: "Car", value: 100, v: 200, color: "#4CE2AD" },
    { name: "Market", value: 300, v: 20, color: "#8F5AFF" },
  ];

  return (
    <NoHeaderLayout>
      <S.Container>
        <PieChartComponent data={data} />
      </S.Container>
    </NoHeaderLayout>
  );
};

export default Type;
