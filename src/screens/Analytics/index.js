import React, { useContext, useEffect, useState, useCallback } from "react";
import { NoHeaderLayout } from "layouts";
import {
  DropdownComponent,
  LoadingComponent,
  BarChartComponent,
} from "components";
import * as S from "./styles";
import { GlobalContext } from "context";
import { getYears, getAllMonthByYear } from "services";
import Utils from "lib/utils";

const Analytics = () => {
  const context = useContext(GlobalContext);
  const [userState] = context.globalUser;
  const { doc, loading } = userState;

  const { nowYear } = Utils.Date;

  const [mainLoading, setMainLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState(nowYear);
  const [yearsOption, setYearsOption] = useState([]);
  const [chartData, setChartData] = useState([]);

  const getStartData = useCallback(
    async (doc) => {
      setMainLoading(true);
      const years = await getYears(doc);
      const newYearsOptions = years.map((y) => ({ label: y, value: y }));
      setYearsOption(newYearsOptions);
      const newChartData = await getAllMonthByYear(doc, selectedYear);
      const chartDataWithAllMonths = [...Array(12)].map((i, index) => {
        const findElement = newChartData.find(
          ({ name }) => parseInt(name) === index + 1
        );
        const newName = index + 1 < 10 ? `0${index + 1}` : index + 1;
        return findElement
          ? findElement
          : { name: newName, value: 0, count: 0 };
      });

      setChartData(
        chartDataWithAllMonths.map(({ value, name }, idx) => ({
          name,
          amount: value,
        }))
      );

      setMainLoading(false);
    },
    [selectedYear]
  );

  useEffect(() => {
    if (doc) {
      getStartData(doc);
    }
  }, [doc, getStartData, selectedYear]);

  const onChangeYear = (newYear) => {
    setSelectedYear(newYear);
  };

  const yearSelectedValueOption = yearsOption.find(
    ({ value }) => value === selectedYear.toString()
  );

  const screenLoading = mainLoading || loading;

  return (
    <>
      <NoHeaderLayout>
        <S.Container>
          <S.TitleContainer>
            <S.Title>Expenses</S.Title>
            <DropdownComponent
              name="year"
              options={yearsOption}
              onChange={({ value }) => {
                onChangeYear(value);
              }}
              placeholder="Select"
              value={yearSelectedValueOption}
            />
          </S.TitleContainer>
          <BarChartComponent data={chartData} isLoading={screenLoading} />
        </S.Container>
      </NoHeaderLayout>

      {screenLoading && <LoadingComponent />}
    </>
  );
};

export default Analytics;
