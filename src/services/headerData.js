import {
  getLocalSheetData,
  getTotalByMonth,
  getAllMonthByYear,
} from "./spreadsheet";
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
      info: "Total for the month compared to the total for the previous month",
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
      info: "Average per day compared to the previous month on the same day of the month",
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

    const categoriesDiff = mergedCategories.length
      ? mergedCategories.map((category) => ({
          category,
          diff:
            (totalThisValue[category] | 0) - (totalPreviousValue[category] | 0),
        }))
      : [{ category: "", diff: 0 }];

    const maxDiff = categoriesDiff.reduce((prev, current) => {
      return prev?.diff > current?.diff ? prev : current;
    });

    const category = maxDiff.category;

    const upIcon =
      (totalThisValue[category] | 0) > (totalPreviousValue[category] | 0);

    const primaryValue = formatMoney(totalThisValue[category] | 0);
    const secondaryValue = formatMoney(totalPreviousValue[category] | 0);

    let returnObject = {};
    if (category) {
      returnObject = {
        title: category,
        primaryValue: `$${primaryValue}`,
        secondaryValue: `$${secondaryValue} past month`,
        arrowIcon: { up: upIcon },
        info: "The category that increased the most compared to the previous month on the same day of the month",
      };
    } else {
      returnObject = null;
    }

    return returnObject;
  } else {
    return null;
  }
};

export const yearHeaderData = async (doc) => {
  if (doc) {
    const currentYear = await getAllMonthByYear(doc, nowYear());

    const totalThisYear = currentYear.reduce(
      (acc, current) => acc + current.value,
      0
    );

    const yearMonthsLength = currentYear.length - 1 || 1;

    const avgMonth =
      currentYear
        .slice(0, -1)
        .reduce((acc, current) => acc + current.value, 0) / yearMonthsLength;

    const primaryValue = formatMoney(totalThisYear);
    const secondaryValue = formatMoney(avgMonth);

    return {
      title: "Total year",
      primaryValue: `$${primaryValue}`,
      secondaryValue: `$${secondaryValue} avg month`,
      info: "Total of the current year and AVG per month of the current yearexcluding current month",
    };
  } else {
    return null;
  }
};
