import { GoogleSpreadsheet } from "google-spreadsheet";
import Utils from "lib/utils";
import { defaultTypes, sheetHeaders, sheetTitle } from "../config/sheet";

const { moneyToNumber, formatMoney } = Utils.Currency;

const getSheet = (doc) => {
  return doc.sheetsByTitle[sheetTitle];
};

export const checkCredentials = async (jsonFile, spreadsheetId) => {
  try {
    const doc = new GoogleSpreadsheet(spreadsheetId);
    await doc.useServiceAccountAuth(jsonFile);
    await doc.loadInfo();
    return true;
  } catch (error) {
    return false;
  }
};

export const createDoc = async (jsonFile, spreadsheetId) => {
  try {
    const doc = new GoogleSpreadsheet(spreadsheetId);
    await doc.useServiceAccountAuth(jsonFile);
    await doc.loadInfo();

    const newSheet = getSheet(doc);
    if (newSheet === undefined) {
      await doc.addSheet({
        title: sheetTitle,
        headerValues: sheetHeaders,
      });
    }
    return doc;
  } catch (error) {
    throw error;
  }
};

export const getTypes = async (doc) => {
  if (doc) {
    const sheet = getSheet(doc);
    const fetchedRows = await sheet.getRows();
    const newTypes = fetchedRows.map((e) => e.Type);
    const combinedTypes = Array.from(new Set(newTypes.concat(defaultTypes)));
    return combinedTypes;
  } else {
    return null;
  }
};

export const addRow = async (doc, date, who, amount, type, detail) => {
  if (doc) {
    const sheet = getSheet(doc);
    return await sheet.addRow({
      Date: date,
      Who: who,
      Amount: `$${amount}`,
      Type: type,
      Detail: detail,
    });
  } else {
    return null;
  }
};

export const getTotalByMonth = async (doc, month, year) => {
  if (doc) {
    const sheet = getSheet(doc);
    const fetchedRows = await sheet.getRows();
    const totalsFiltered = fetchedRows.filter((e) => {
      const dateSplitted = e.Date.split("/");
      return (
        dateSplitted[2] === year.toString() &&
        dateSplitted[1] === month.toString()
      );
    });

    const totalValue = totalsFiltered.reduce((acc, val) => {
      return acc + moneyToNumber(val.Amount);
    }, 0);

    return formatMoney(totalValue);
  } else {
    return null;
  }
};

export const getTotalByYear = async (doc, year) => {
  if (doc) {
    const sheet = getSheet(doc);
    const fetchedRows = await sheet.getRows();
    const totalsFiltered = fetchedRows.filter((e) => {
      const dateSplitted = e.Date.split("/");
      return dateSplitted[2] === year.toString();
    });

    const totalValue = totalsFiltered.reduce((acc, val) => {
      return acc + moneyToNumber(val.Amount);
    }, 0);

    return formatMoney(totalValue);
  } else {
    return null;
  }
};

export const getByTypesMonth = async (doc, month, year) => {
  if (doc) {
    const monthString = month.toString().length < 2 ? `0${month}` : `${month}`;
    const yearString = year.toString();
    const sheet = getSheet(doc);
    const fetchedRows = await sheet.getRows();
    const totalsFiltered = fetchedRows.filter((e) => {
      const dateSplitted = e.Date.split("/");
      return dateSplitted[2] === yearString && dateSplitted[1] === monthString;
    });

    const groupedByType = totalsFiltered.reduce((prev, curr) => {
      const newObject = { ...prev };
      newObject[curr.Type] = {
        value: (newObject[curr.Type]?.value || 0) + moneyToNumber(curr.Amount),
        count: (newObject[curr.Type]?.count || 0) + 1,
      };
      return newObject;
    }, {});

    return Object.entries(groupedByType)
      .map((e) => ({ ...e[1], name: e[0] }))
      .sort((a, b) => b.value - a.value);
  } else {
    return null;
  }
};

export const getMonthYears = async (doc) => {
  if (doc) {
    const sheet = getSheet(doc);
    const fetchedRows = await sheet.getRows();

    return fetchedRows
      .map((e) => {
        const dateSplitted = e.Date.split("/");
        const month = dateSplitted[1];
        const year = dateSplitted[2];
        return { month, year };
      })
      .filter(({ month, year }) => month !== undefined && year !== undefined)
      .reduce((prev, curr) => {
        const findOnPrev = (prev || []).find(
          ({ month, year }) => curr.month === month && curr.year === year
        );
        if (!findOnPrev) {
          const newArray = prev || [];
          newArray.push({ ...curr });
          return newArray;
        } else {
          return prev;
        }
      }, []);
  } else {
    return [];
  }
};

export const getDetailsBuTypeDate = async (doc, month, year, type) => {
  if (doc) {
    const monthString = month.toString().length < 2 ? `0${month}` : `${month}`;
    const yearString = year.toString();
    const sheet = getSheet(doc);
    const fetchedRows = await sheet.getRows();
    const totalsFiltered = fetchedRows.filter((e) => {
      const dateSplitted = e.Date.split("/");
      return (
        dateSplitted[2] === yearString &&
        dateSplitted[1] === monthString &&
        e.Type === type
      );
    });

    const mappedData = totalsFiltered.map(
      ({ Amount, Date, Detail, Type, Who }) => ({
        Amount,
        Date,
        Detail,
        Type,
        Who,
      })
    );

    return mappedData;
  } else {
    return null;
  }
};
