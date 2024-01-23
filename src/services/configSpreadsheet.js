import { sheetTitleConfig, sheetHeadersConfig } from "config/sheet";
import { setSheetConfig, getSheetConfig } from "config/localStorage";

const getSheet = async (doc) => {
  const sheet = doc.sheetsByTitle[sheetTitleConfig];
  if (sheet) {
    return sheet;
  } else {
    const newSheet = await doc.addSheet({
      title: sheetTitleConfig,
      headerValues: sheetHeadersConfig,
    });
    return newSheet;
  }
};

const storeSheetData = async (doc) => {
  if (doc) {
    const sheet = getSheet(doc);
    const fetchedRows = await sheet.getRows();
    const mappedData = fetchedRows.map(({ _rawData, _rowNumber }) => {
      return {
        Name: _rawData[0],
        Frequency: _rawData[1],
        Amount: _rawData[2],
        Id: _rowNumber,
      };
    });
    setSheetConfig(mappedData);
    return mappedData;
  } else {
    return null;
  }
};

export const getLocalSheetData = async () => {
  const data = getSheetConfig();
  if (data) {
    return data;
  } else {
    return await storeSheetData();
  }
};

export const addRow = async (doc, name, frequency, amount) => {
  if (doc) {
    const sheet = await getSheet(doc);
    const newRow = {
      Name: name,
      Frequency: frequency,
      Amount: `$${amount}`,
    };
    await sheet.addRow(newRow);
    const newData = await getLocalSheetData();
    const lastId = newData[newData.length - 1]?.Id || 1;
    newData.push({ ...newRow, Id: lastId + 1 });
    setSheetConfig(newData);
    return newData;
  } else {
    return null;
  }
};

export const deleteRow = async (doc, id) => {
  if (doc) {
    const sheet = await getSheet(doc);
    console.log("sheet", sheet);
    if (sheet) {
      const fetchedRows = await sheet.getRows();
      const findById = fetchedRows.find(({ _rowNumber }) => _rowNumber === id);
      if (findById) {
        try {
          await findById.delete();
          const newData = await storeSheetData(doc);
          return newData;
        } catch (error) {
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
