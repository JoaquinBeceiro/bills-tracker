import React, { useContext, useEffect, useState, useCallback } from "react";
import { NoHeaderLayout } from "layouts";
import {
  PieChartComponent,
  ChartLegendComponent,
  DropdownComponent,
  LoadingComponent,
  BigModalComponent,
  DetailItemComponent,
} from "components";
import * as S from "./styles";
import { GlobalContext } from "context";
import { getByTypesMonth, getMonthYears, getDetailsBuTypeDate } from "services";
import Utils from "lib/utils";

const Type = () => {
  const { nowYear, nowMonth, dateToText } = Utils.Date;
  const { addColors } = Utils.Colors;
  const { MONTHS } = Utils.Constants;

  const [mainLoading, setMainLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState({
    month: parseInt(nowMonth()) - 1,
    year: nowYear().toString(),
  });

  const [monthsOptions, setMonthsOptions] = useState([]);
  const [data, setData] = useState([]);
  const context = useContext(GlobalContext);
  const [userState] = context.globalUser;
  const { doc, loading } = userState;
  const [showDetail, setShowDetail] = useState(false);
  const [detailData, setDetailData] = useState([]);
  const [detailTypeSelected, setDetailTypeSelected] = useState("");

  const getStartData = useCallback(
    async (doc) => {
      setMainLoading(true);
      const selectedMonth = parseInt(selectedDate.month) + 1;
      const typesMonth = await getByTypesMonth(
        doc,
        selectedMonth,
        selectedDate.year
      );
      const typesMonthWithColors = addColors(typesMonth);
      const monthYears = await getMonthYears(doc);

      const grouppedYears = [...new Set(monthYears.map(({ year }) => year))];
      const grouppedMonths = grouppedYears.map((year) => ({
        label: year,
        options: monthYears
          .filter((item) => item.year === year)
          .map((item) => ({
            value: { month: parseInt(item.month) - 1, year: item.year },
            label: `${MONTHS[parseInt(item.month) - 1]}`,
          })),
      }));

      setMonthsOptions(grouppedMonths);

      setData(typesMonthWithColors);
      setMainLoading(false);
    },
    [MONTHS, addColors, selectedDate.month, selectedDate.year]
  );

  const getDetailData = async (type) => {
    setMainLoading(true);
    setDetailTypeSelected(type);
    const selectedMonth = parseInt(selectedDate.month) + 1;
    const data = await getDetailsBuTypeDate(
      doc,
      selectedMonth,
      selectedDate.year,
      type
    );
    setDetailData(data);
    setMainLoading(false);
    setShowDetail(true);
  };

  const total = data.reduce((prev, cur) => prev + cur.value, 0);

  const onChangeDate = (value) => {
    if (
      `${value.month}-${value.year}` !==
      `${selectedDate.month}-${selectedDate.year}`
    ) {
      const newValue = { ...value };
      setSelectedDate(newValue);
    }
  };

  const screenLoading = mainLoading || loading;

  useEffect(() => {
    if (!loading && doc) {
      getStartData(doc);
    }
  }, [getStartData, doc, loading, selectedDate]);

  const flattedOptions = monthsOptions
    .map(({ options }) => options)
    .flat()
    .find(
      ({ value }) =>
        value.year === selectedDate.year && value.month === selectedDate.month
    );

  const handleCloseDetail = () => {
    setShowDetail(false);
    setDetailData([]);
    setDetailTypeSelected("");
  };

  return (
    <>
      <NoHeaderLayout>
        <S.Container>
          <S.TitleContainer>
            <S.Title>Expenses</S.Title>
            <DropdownComponent
              name="type"
              options={monthsOptions}
              onChange={({ value }) => {
                onChangeDate(value);
              }}
              placeholder="Select"
              value={flattedOptions}
            />
          </S.TitleContainer>
          <PieChartComponent
            data={data}
            total={total}
            month={selectedDate.month}
            year={selectedDate.year}
            isLoading={screenLoading}
          />
          <div>
            {data.map((item, index) => (
              <ChartLegendComponent
                key={`legend-${index}`}
                title={item.name}
                value={item.value}
                color={item.color}
                total={total}
                count={item.count}
                action={() => getDetailData(item.name)}
              />
            ))}
          </div>
        </S.Container>
      </NoHeaderLayout>
      {showDetail && (
        <BigModalComponent
          title={detailTypeSelected}
          handleClose={() => handleCloseDetail()}
        >
          {detailData.map(({ Amount, Date, Detail }, index) => (
            <DetailItemComponent
              key={`${index}-${Detail}`}
              amount={Amount}
              date={dateToText(Date)}
              title={Detail}
            />
          ))}
        </BigModalComponent>
      )}
      {screenLoading && <LoadingComponent />}
    </>
  );
};

export default Type;
