import React, { useContext, useEffect, useState, useCallback } from "react";
import { NoHeaderLayout } from "layouts";
import {
  PieChartComponent,
  ChartLegendsComponent,
  DropdownComponent,
  LoadingComponent,
  BigModalComponent,
  DetailItemComponent,
} from "components";
import * as S from "./styles";
import { GlobalContext } from "context";
import { getByTypesMonth, getMonthYears, getDetailsBuTypeDate } from "services";
import Utils from "lib/utils";

const Analytics = () => {
  const screenLoading = false;

  return (
    <>
      <NoHeaderLayout>
        <S.Container></S.Container>
      </NoHeaderLayout>

      {screenLoading && <LoadingComponent />}
    </>
  );
};

export default Analytics;
