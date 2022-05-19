import React, { useContext, useEffect, useState, useCallback } from "react";
import { NoHeaderLayout } from "layouts";
import {
  PieChartComponent,
  ChartLegendComponent,
  DropdownComponent,
  LoadingComponent,
  BigModalComponent,
  DetailItemComponent,
  ButtonComponent,
} from "components";
import * as S from "./styles";
import { GlobalContext, DispatchTypes } from "context";
import { getByTypesMonth, getMonthYears, getDetailsByTypeDate, getDetailsByMonth, deleteRow } from "services";
import Utils from "lib/utils";
import { useLocation } from "react-router-dom";

const Type = () => {
  const location = useLocation();

  const { nowYear, nowMonth, dateToText, monthToText } = Utils.Date;

  const locationStateMonth = parseInt(location?.state?.defaultMonth) - 1;

  const defaultMonth = isNaN(locationStateMonth)
    ? parseInt(nowMonth()) - 1
    : locationStateMonth;
  const defaultYear = location?.state?.defaultYear || nowYear().toString();

  const { addColors } = Utils.Colors;
  const { MONTHS } = Utils.Constants;

  const [mainLoading, setMainLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState({
    month: defaultMonth,
    year: defaultYear,
  });

  const [monthsOptions, setMonthsOptions] = useState([]);
  const [data, setData] = useState([]);
  const context = useContext(GlobalContext);
  const [userState] = context.globalUser;
  const [, modalDispatch] = context.globalModal;
  const { doc, loading } = userState;
  const [showDetail, setShowDetail] = useState("");
  const [detailData, setDetailData] = useState([]);
  const [modalTitle, setModalTitle] = useState("");
  const [modalSubtitle, setModalSubtitle] = useState("");

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
    setModalTitle(type);
    const selectedMonth = parseInt(selectedDate.month) + 1;
    const data = await getDetailsByTypeDate(
      doc,
      selectedMonth,
      selectedDate.year,
      type
    );
    setDetailData(data);
    setMainLoading(false);
    setShowDetail("single");
    const subTitle = `${data.length} transactions`;
    setModalSubtitle(subTitle);
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
        parseInt(value.year) === parseInt(selectedDate.year) &&
        parseInt(value.month) === parseInt(selectedDate.month)
    );

  const handleCloseDetail = () => {
    setShowDetail("");
    setDetailData([]);
    setModalTitle("");
    setModalSubtitle("");
  };

  const showAllDetails = async () => {
    setMainLoading(true);

    const title = `${monthToText(parseInt(selectedDate.month))} ${selectedDate.year}`;
    setModalTitle(title);

    const selectedMonth = parseInt(selectedDate.month) + 1;
    const data = await getDetailsByMonth(
      doc,
      selectedMonth,
      selectedDate.year,
    );
    setShowDetail("all");
    setDetailData(data);
    const subTitle = `${data.length} transactions`;
    setModalSubtitle(subTitle);
    setMainLoading(false);
  }

  const deleteRecord = async (id, type) => {
    modalDispatch({
      type: DispatchTypes.Modal.MODAL_SHOW,
      title: "Confirmation",
      content: "Do you really want to delete this record?",
      actions: [
        {
          type: "secondary",
          text: "Delete",
          action: async () => {
            modalDispatch({ type: DispatchTypes.Modal.MODAL_HIDE });
            setMainLoading(true);
            await deleteRow(doc, id);
            getStartData(doc);
            if(showDetail === 'all'){
              showAllDetails();
            } else {
              getDetailData(type);
            }
            setMainLoading(false);
          },
        },
        {
          type: "text",
          text: "Cancel",
          action: () => {
            modalDispatch({ type: DispatchTypes.Modal.MODAL_HIDE });

          },
        },
      ],
    });

  }

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
            <S.ShowAllContainer>
              <ButtonComponent type="text" text="Show all" action={showAllDetails} />
            </S.ShowAllContainer>
          </div>
        </S.Container>
      </NoHeaderLayout>
      {showDetail && (
        <BigModalComponent
          title={modalTitle}
          subTitle={modalSubtitle}
          handleClose={() => handleCloseDetail()}
        >
          {detailData.map(({ Amount, Date, Detail, Type, Id }, index) => (
            <DetailItemComponent
              key={`${index}-${Detail}`}
              amount={Amount}
              date={dateToText(Date)}
              title={Detail}
              subTitle={showDetail === 'all' && Type}
              deleteAction={() => deleteRecord(Id, Type)}
            />
          ))}
        </BigModalComponent>
      )}
      {screenLoading && <LoadingComponent />}
    </>
  );
};

export default Type;
