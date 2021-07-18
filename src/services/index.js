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
