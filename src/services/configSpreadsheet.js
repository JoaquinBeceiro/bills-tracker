import { setSheetConfig, getSheetConfig } from "config/localStorage";
import { createScheduleRow } from "config/sheet";
import Utils from "lib/utils";

const getSheet = async (doc, title, headers) => {
  const sheet = doc.sheetsByTitle[title];
  if (sheet) {
    return sheet;
  } else {
    const newSheet = await doc.addSheet({
      title: title,
      headerValues: headers,
    });
    return newSheet;
  }
};

export const storeSheetData = async (doc, title, headers) => {
  if (doc) {
    const sheet = await getSheet(doc, title, headers);
    if (sheet) {
      const fetchedRows = await sheet.getRows();
      const mappedData = fetchedRows.map(({ _rawData, _rowNumber }) => {
        return {
          [Utils.Constants.SCHEDULE]: createScheduleRow(
            _rawData[0],
            _rawData[1],
            _rawData[2],
            _rawData[3],
            _rawData[4],
            _rowNumber
          ),
        }[title];
      });
      setSheetConfig(mappedData, title);
      return mappedData;
    } else {
      return null;
    }
  } else {
    return null;
  }
};

export const getLocalSheetData = async (doc, title, headers) => {
  const data = getSheetConfig(title);
  if (data) {
    return data;
  } else {
    return await storeSheetData(doc, title, headers);
  }
};

export const addRow = async (doc, title, headers, data) => {
  if (doc) {
    const timestamp = new Date().getTime();
    const sheet = await getSheet(doc, title, headers);

    const newRow = {
      [Utils.Constants.SCHEDULE]: {
        Name: data.name,
        Type: data.type,
        Frequency: data.frequency,
        Amount: `$${data.amount}`,
        Description: data.description,
        Date: timestamp,
      },
    }[title];

    await sheet.addRow(newRow);
    const newData = await getLocalSheetData(doc, title, headers);
    const lastId = newData[newData.length - 1]?.Id || 1;
    newData.push({ ...newRow, Id: lastId + 1 });
    setSheetConfig(newData, title);
    return newData;
  } else {
    return null;
  }
};

export const deleteRow = async (doc, title, headers, id) => {
  if (doc) {
    const sheet = await getSheet(doc, title, headers);
    if (sheet) {
      const fetchedRows = await sheet.getRows();
      const findById = fetchedRows.find(({ _rowNumber }) => _rowNumber === id);
      if (findById) {
        try {
          await findById.delete();
          const newData = await storeSheetData(doc, title, headers);
          return newData;
        } catch (error) {
          console.log("Error (config deleteRow)", error);
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
};
