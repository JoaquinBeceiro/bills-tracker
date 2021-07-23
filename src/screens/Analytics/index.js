import React, { useContext, useEffect, useState, useCallback } from "react";
import { NoHeaderLayout } from "layouts";
import {
  DropdownComponent,
  LoadingComponent,
  BarChartComponent,
} from "components";
import * as S from "./styles";
import { GlobalContext } from "context";
import { getYears } from "services";
import Utils from "lib/utils";

const Analytics = () => {
  const context = useContext(GlobalContext);
  const [userState] = context.globalUser;
  const { doc, loading } = userState;

  const { nowYear } = Utils.Date;

  const [mainLoading, setMainLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState(nowYear);
  const [yearsOption, setYearsOption] = useState([]);

  const getStartData = async (doc) => {
    setMainLoading(true);
    const years = await getYears(doc);
    const newYearsOptions = years.map((y) => ({ label: y, value: y }));
    setYearsOption(newYearsOptions);
    setMainLoading(false);
  };

  useEffect(() => {
    if (doc) {
      // getStartData(doc);
    }
  }, [doc]);

  const onChangeYear = (newYear) => {
    setSelectedYear(newYear);
  };

  const yearSelectedValueOption = yearsOption.find(
    ({ value }) => value === selectedYear.toString()
  );

  const screenLoading = mainLoading || loading;



  const data = [...Array(12)].map((e, idx) => ({
    name: `${idx+1}`,
    amount: Math.floor(Math.random() * 400) + 100,
  }));


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
          <BarChartComponent data={data} />
        </S.Container>
      </NoHeaderLayout>

      {screenLoading && <LoadingComponent />}
    </>
  );
};

export default Analytics;
