import React, { useContext, useEffect, useState, useCallback } from "react";
import { NoHeaderLayout } from "layouts";
import {
  DropdownComponent,
  LoadingComponent,
  BarChartComponent,
  MonthLegendComponent,
  LineChartComponent,
  CheckboxComponent,
} from "components";
import * as S from "./styles";
import { GlobalContext } from "context";
import {
  getYears,
  getAllMonthByYear,
  getLast12Months,
  getLast12MonthsByType,
} from "services";
import Utils from "lib/utils";
import { useHistory } from "react-router-dom";

const Analytics = () => {
  const history = useHistory();
  const context = useContext(GlobalContext);
  const [userState] = context.globalUser;
  const { doc, loading } = userState;

  const { formatSymbol } = Utils.Currency;
  const { LAST_12_MONTHS_OPTION } = Utils.Constants;
  const { nextMonth } = Utils.Date;
  const { addColors } = Utils.Colors;

  const [mainLoading, setMainLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState(LAST_12_MONTHS_OPTION.value);
  const [yearsOption, setYearsOption] = useState([]);
  const [data, setData] = useState([]);
  const [legendData, setLegendData] = useState([]);
  const [chartCategories, setChartCategories] = useState([]);
  const [showTypes, setShowTypes] = useState(false);
  const [totalYear, setTotalYear] = useState(0);

  const getStartData = useCallback(
    async (doc) => {
      setMainLoading(true);
      const years = await getYears(doc);
      const newYearsOptions = years.map((y) => ({ label: y, value: y }));
      newYearsOptions.push(LAST_12_MONTHS_OPTION);
      setYearsOption(newYearsOptions);

      const getChartDataTypes = () => {
        if (selectedYear === "last12months") {
          return getLast12MonthsByType(doc);
        } else {
          return getLast12MonthsByType(doc);
        }
      };

      const getChartData = () => {
        if (selectedYear === "last12months") {
          return getLast12Months(doc);
        } else {
          return getAllMonthByYear(doc, selectedYear);
        }
      };

      const newChartData = showTypes
        ? await getChartDataTypes()
        : await getChartData();

      const arrayStartsFrom = selectedYear === "last12months" ? nextMonth() : 1;

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

        if (showTypes) {
          if (findElement) {
            const keys = Object.keys(findElement);
            const newValues = keys
              .filter((e) => e !== "name")
              .map((e) => ({
                [e]: findElement[e].value,
              }))
              .reduce(
                (prev, curr) => ({
                  ...prev,
                  ...curr,
                }),
                {}
              );
            return { ...newValues, name: newName };
          } else {
            return { name: newName };
          }
        } else {
          return findElement
            ? findElement
            : { value: 0, count: 0, year: 0, name: newName };
        }
      });

      const yearData = await getChartData();
      const leggendsData = newArray
        .map((index) => {
          const findElement = yearData.find(
            ({ name }) => parseInt(name) === index
          );
          const newName = index < 10 ? `0${index}` : `${index}`;
          return findElement
            ? findElement
            : { value: 0, count: 0, year: 0, name: newName };
        })
        .filter(({ value }) => value > 0)
        .sort((a, b) =>
          parseInt(`${b.year}${b.name}`) > parseInt(`${a.year}${a.name}`)
            ? 1
            : -1
        );
      const newTotalYear = newArray
        .map((index) => {
          const findElement = yearData.find(
            ({ name }) => parseInt(name) === index
          );
          const newName = index < 10 ? `0${index}` : `${index}`;
          return findElement
            ? findElement
            : { value: 0, count: 0, year: 0, name: newName };
        })
        .filter(({ value }) => value > 0)
        .reduce((acc, cur) => acc + cur.value, 0);

      setTotalYear(newTotalYear);
      setLegendData(leggendsData);
      setData(chartDataWithAllMonths);
      setMainLoading(false);
    },
    [LAST_12_MONTHS_OPTION, nextMonth, selectedYear, showTypes]
  );

  useEffect(() => {
    const categories = showTypes
      ? addColors(
          [...new Set(data.map((e) => Object.keys(e)).flat())]
            .filter((e) => e !== "name")
            .map((e, index) => ({
              key: e,
              checked: index <= 2,
            }))
        )
      : [];
    if (categories) {
      setChartCategories(categories);
    }
  }, [addColors, data, showTypes]);

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

  const chartData = showTypes
    ? data
    : data.map(({ value, name }) => ({
        name,
        amount: value,
      }));

  const handleCategoryChange = (key) => {
    console.log("key", key);
    const newCategories = [...chartCategories].map((category) => ({
      ...category,
      checked: category.key === key ? !category.checked : category.checked,
    }));
    setChartCategories(newCategories);
  };

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
          <>
            <CheckboxComponent
              color="#333"
              checked={showTypes}
              onChange={() => setShowTypes(!showTypes)}
              label="By type"
            />
          </>
          {showTypes ? (
            <>
              <LineChartComponent
                data={chartData}
                isLoading={screenLoading}
                categories={chartCategories.filter(({ checked }) => checked)}
              />
              <S.CategoryList>
                {chartCategories.map(({ key, checked, color }, index) => (
                  <li key={`${key}-${index}`}>
                    <CheckboxComponent
                      label={key}
                      checked={checked}
                      onChange={() => handleCategoryChange(key)}
                      color={color}
                    />
                  </li>
                ))}
              </S.CategoryList>
            </>
          ) : (
            <BarChartComponent data={chartData} isLoading={screenLoading} />
          )}
          <S.LeggendsContainer>
            {legendData.map(({ name, value, year }, index) => (
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
