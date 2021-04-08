import { GoogleSpreadsheet } from "google-spreadsheet";

import { todayDate } from "../config/date";
import { defaultTypes } from "../config/options";

const sheetTitle = "Bills";
const sheetHeaders = ["Date", "Who", "Amount", "Type", "Detail"];

const getSheet = (doc) => {
  return doc.sheetsByTitle[sheetTitle];
};

export const createDoc = async (jsonFile, spreadsheetId, name) => {
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
  } catch (e) {
    alert(`Hubo un error en la autenticación: ${e.message}`);
    return null;
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
