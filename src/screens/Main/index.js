import React, { useContext, useEffect, useState } from "react";
import UserContext from "config/userContext";
import { ArrowIndicatorIcon, LoadingComponent } from "components";
import { HeaderLayout } from "layouts";
import { getTypes, getTotalByMonth, getTotalByYear } from "services";
import { nowYear, nowMonth, pastMonthYear } from "lib/utils/date";
import { moneyToNumber, formatMoney } from "lib/utils/currency";

const Main = (props) => {
  const [mainLoading, setMainLoading] = useState(true);

  const [totalMonth, setTotalMonth] = useState(0);
  const [differencePastCurrent, setDiifferencePastCurrent] = useState(0);
  const [gratherThanPastMonth, setGratherThanPastMonth] = useState(false);

  const userContext = useContext(UserContext);
  const { user, doc, loading } = userContext;

  const setupDoc = async (user, doc) => {
    const types = await getTypes(doc);
    const pastMonthYearValue = pastMonthYear();

    const totalMonthValue = await getTotalByMonth(doc, nowMonth(), nowYear());
    const totalPastMonthValue = await getTotalByMonth(
      doc,
      pastMonthYearValue.month,
      pastMonthYearValue.year
    );

    setTotalMonth(totalMonthValue);

    setDiifferencePastCurrent(
      formatMoney(
        moneyToNumber(totalPastMonthValue) - moneyToNumber(totalMonthValue)
      )
    );

    setGratherThanPastMonth(
      moneyToNumber(totalMonthValue) > moneyToNumber(totalPastMonthValue)
    );

    setMainLoading(false);
  };

  useEffect(() => {
    if (!loading) {
      if (user && doc) {
        setupDoc(user, doc);
      }
    }
  }, [user, doc, loading]);

  const headerBoxProps = {
    primaryValue: `$${totalMonth}`,
    secondaryValue: `$${differencePastCurrent} this month`,
    icon: <ArrowIndicatorIcon up={gratherThanPastMonth} />,
  };

  return (
    <>
      <HeaderLayout headerBox={headerBoxProps}>test</HeaderLayout>
      {mainLoading && <LoadingComponent />}
    </>
  );
};

export default Main;
