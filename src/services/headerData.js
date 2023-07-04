import { getLocalSheetData, getTotalByMonth } from "./spreadsheet";
import Utils from "lib/utils";

const { split, nowMonth, nowYear, pastMonthYear } = Utils.Date;
const { moneyToNumber, formatMoney } = Utils.Currency;

export const totalsHeaderData = async (doc) => {
  if (doc) {
    const pastMonthYearValue = pastMonthYear();

    const totalThisMonth = await getTotalByMonth(doc, nowMonth(), nowYear());
    const totalPastMonth = await getTotalByMonth(
      doc,
      pastMonthYearValue.month,
      pastMonthYearValue.year
    );

    return {
      title: "Total month",
      primaryValue: `$${totalThisMonth}`,
      secondaryValue: `$${totalPastMonth} past month`,
      arrowIcon: {
        up: moneyToNumber(totalThisMonth) > moneyToNumber(totalPastMonth),
      },
    };
  } else {
    return null;
  }
};

export const avgHeaderData = async (doc) => {
  if (doc) {
    const todayDate = new Date().getDate();

    const fetchedRows = await getLocalSheetData();
    const totalsFiltered = fetchedRows.filter((e) => {
      const dateSplitted = split(e.Date);
      return (
        dateSplitted[2] === nowYear().toString() &&
        dateSplitted[1] === nowMonth().toString()
      );
    });

    const totalValue = totalsFiltered.reduce((acc, val) => {
      return acc + moneyToNumber(val.Amount);
    }, 0);

    const totalsFilteredPreviousMonth = fetchedRows.filter((e) => {
      const dateSplitted = split(e.Date);
      return (
        dateSplitted[2] === pastMonthYear().year.toString() &&
        dateSplitted[1] === pastMonthYear().month.toString() &&
        dateSplitted[0] <= todayDate
      );
    });

    const totalPreviousValue = totalsFilteredPreviousMonth.reduce(
      (acc, val) => {
        return acc + moneyToNumber(val.Amount);
      },
      0
    );

    const avgThisMonth = formatMoney(totalValue / todayDate);
    const avgPreviousMonth = formatMoney(totalPreviousValue / todayDate);

    return {
      title: "AVG per day",
      primaryValue: `$${avgThisMonth}`,
      secondaryValue: `$${avgPreviousMonth} past month`,
      arrowIcon: {
        up: moneyToNumber(avgThisMonth) > moneyToNumber(avgPreviousMonth),
      },
    };
  } else {
    return null;
  }
};

export const categoryHeaderData = async (doc) => {
  if (doc) {
    const todayDate = new Date().getDate();

    const fetchedRows = await getLocalSheetData();
    const totalsFiltered = fetchedRows.filter((e) => {
      const dateSplitted = split(e.Date);
      return (
        dateSplitted[2] === nowYear().toString() &&
        dateSplitted[1] === nowMonth().toString()
      );
    });

    const totalsFilteredPreviousMonth = fetchedRows.filter((e) => {
      const dateSplitted = split(e.Date);
      return (
        dateSplitted[2] === pastMonthYear().year.toString() &&
        dateSplitted[1] === pastMonthYear().month.toString() &&
        dateSplitted[0] <= todayDate
      );
    });

    const totalThisValue = totalsFiltered.reduce((acc, val) => {
      const newObj = { ...acc };
      const newAcc = {
        ...acc,
        [val.Type]: (newObj[val.Type] | 0) + moneyToNumber(val.Amount),
      };
      return newAcc;
    }, {});

    const totalPreviousValue = totalsFilteredPreviousMonth.reduce(
      (acc, val) => {
        const newObj = { ...acc };
        const newAcc = {
          ...acc,
          [val.Type]: (newObj[val.Type] | 0) + moneyToNumber(val.Amount),
        };
        return newAcc;
      },
      {}
    );

    const mergedCategories = [
      ...new Set([
        ...Object.keys(totalThisValue),
        ...Object.keys(totalPreviousValue),
      ]),
    ];

    const categoriesDiff = mergedCategories.map((category) => ({
      category,
      diff: (totalThisValue[category] | 0) - (totalPreviousValue[category] | 0),
    }));

    const maxDiff = categoriesDiff.reduce((prev, current) => {
      return prev.diff > current.diff ? prev : current;
    });

    const category = maxDiff.category;

    const upIcon =
      (totalThisValue[category] | 0) > (totalPreviousValue[category] | 0);

    return {
      title: category,
      primaryValue: `$${totalThisValue[category] | 0}`,
      secondaryValue: `$${totalPreviousValue[category] | 0} past month`,
      arrowIcon: upIcon,
    };
  } else {
    return null;
  }
};
