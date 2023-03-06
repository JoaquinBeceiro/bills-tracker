import React, { useContext, useEffect, useState, useCallback } from "react";
import { NoHeaderLayout } from "layouts";
import {
  DropdownComponent,
  LoadingComponent,
  BarChartComponent,
  MonthLegendComponent,
} from "components";
import * as S from "./styles";
import { GlobalContext } from "context";
import { getYears, getAllMonthByYear, getLast12Months } from "services";
import Utils from "lib/utils";
import { useHistory } from "react-router-dom";

const Analytics = () => {
  const history = useHistory();
  const context = useContext(GlobalContext);
  const [userState] = context.globalUser;
  const { doc, loading } = userState;

  const { formatSymbol } = Utils.Currency;

  const last12MonthOption = { label: "Last 12M", value: "last12months" };

  const [mainLoading, setMainLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState(last12MonthOption.value);
  const [yearsOption, setYearsOption] = useState([]);
  const [data, setData] = useState([]);

  const getStartData = useCallback(
    async (doc) => {
      setMainLoading(true);
      const years = await getYears(doc);
      const newYearsOptions = years.map((y) => ({ label: y, value: y }));
      newYearsOptions.push(last12MonthOption);
      setYearsOption(newYearsOptions);

      const newChartData =
        selectedYear === "last12months"
          ? await getLast12Months(doc)
          : await getAllMonthByYear(doc, selectedYear);

      const arrayStartsFrom = selectedYear === "last12months" ? 4 : 1;

      const newArray = Array.from({ length: 12 }, (_, i) =>
        i + arrayStartsFrom > 12
          ? (i + arrayStartsFrom + 1) % 13
          : i + arrayStartsFrom
      );

      const chartDataWithAllMonths = newArray.map((index) => {
        const findElement = newChartData.find(
          ({ name }) => parseInt(name) === index
        );
        const newName = index < 10 ? `0${index}` : `${index}`;
        return findElement
          ? findElement
          : { value: 0, count: 0, year: 0, name: newName };
      });
      setData(chartDataWithAllMonths);
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

  const chartData = data.map(({ value, name }) => ({
    name,
    amount: value,
  }));

  const leggendsData = data
    .filter(({ value }) => value > 0)
    .sort((a, b) =>
      parseInt(`${b.year}${b.name}`) > parseInt(`${a.year}${a.name}`) ? 1 : -1
    );

  const totalYear = data.reduce((acc, cur) => acc + cur.value, 0);

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
          <S.SubTitleContainer>
            <S.SubTitle>{`Summary of ${
              selectedYear === "last12months" ? "last 12 months" : selectedYear
            }`}</S.SubTitle>
            <S.ResumeTotal>
              <span>${formatSymbol(totalYear)}</span> this{" "}
              {selectedYear === "last12months" ? "period" : "year"}
            </S.ResumeTotal>
          </S.SubTitleContainer>
          <BarChartComponent data={chartData} isLoading={screenLoading} />
          <S.LeggendsContainer>
            {leggendsData.map(({ name, value, year }, index) => (
              <MonthLegendComponent
                key={`${name}-${index}`}
                month={name}
                amount={value}
                year={year}
                action={() => {
                  history.push({
                    pathname: "/types",
                    state: { defaultMonth: name, defaultYear: year },
                  });
                }}
              />
            ))}
          </S.LeggendsContainer>
        </S.Container>
      </NoHeaderLayout>

      {screenLoading && <LoadingComponent />}
    </>
  );
};

export default Analytics;
