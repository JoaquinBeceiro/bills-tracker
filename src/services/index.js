import { GoogleSpreadsheet } from "google-spreadsheet";
import Utils from "lib/utils";
import { defaultTypes, sheetHeaders, sheetTitle } from "config/sheet";
import { setSheetData, getSheetData } from "config/localStorage";

const { moneyToNumber, formatMoney } = Utils.Currency;
const { dateSort, split } = Utils.Date;

const getSheet = (doc) => {
  return doc.sheetsByTitle[sheetTitle];
};

const storeSheetData = async (doc) => {
  if (doc) {
    const sheet = getSheet(doc);
    const fetchedRows = await sheet.getRows();
    const mappedData = fetchedRows.map(
      ({ Amount, Date, Detail, Type, Who, _rowNumber }) => ({
        Amount,
        Date,
        Type,
        Detail,
        Who,
        id: _rowNumber
      })
    );
    setSheetData(mappedData);
    return mappedData;
  } else {
    return null;
  }
}

const getLocalSheetData = async () => {
  const data = getSheetData();
  if (data) {
    return data;
  } else {
    return await storeSheetData();
  }
}

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
    await storeSheetData(doc);
    return doc;
  } catch (error) {
    throw error;
  }
};

export const getTypes = async (doc) => {
  if (doc) {
    const fetchedRows = await getLocalSheetData();
    const newTypes = fetchedRows.map((e) => e.Type);
    const combinedTypes = Array.from(new Set(newTypes.concat(defaultTypes)));
    return combinedTypes.sort((a, b) => (a.toLowerCase() > b.toLowerCase()) ? 1 : -1);
  } else {
    return null;
  }
};

export const addRow = async (doc, date, who, amount, type, detail) => {
  if (doc) {
    const sheet = getSheet(doc);
    const newRow = {
      Date: date,
      Who: who,
      Amount: `$${amount}`,
      Type: type,
      Detail: detail,
    };
    await sheet.addRow(newRow);
    const newData = await getLocalSheetData();
    const lastId = newData[newData.length - 1].id;
    newData.push({ ...newRow, id: lastId + 1 });
    setSheetData(newData);
    return newData;
  } else {
    return null;
  }
};

export const getTotalByMonth = async (doc, month, year) => {
  if (doc) {
    const fetchedRows = await getLocalSheetData();
    const totalsFiltered = fetchedRows.filter((e) => {
      const dateSplitted = split(e.Date);
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
    const fetchedRows = await getLocalSheetData();
    const totalsFiltered = fetchedRows.filter((e) => {
      const dateSplitted = split(e.Date);
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
    const fetchedRows = await getLocalSheetData();
    const totalsFiltered = fetchedRows.filter((e) => {
      const dateSplitted = split(e.Date);
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
    const fetchedRows = await getLocalSheetData();

    return fetchedRows
      .map((e) => {
        const dateSplitted = split(e.Date);
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

export const getDetailsByTypeDate = async (doc, month, year, type) => {
  if (doc) {
    const monthString = month.toString().length < 2 ? `0${month}` : `${month}`;
    const yearString = year.toString();
    const fetchedRows = await getLocalSheetData();
    const totalsFiltered = fetchedRows.filter((e) => {
      const dateSplitted = split(e.Date);
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
        Who,
      })
    );

    const dataSorted = mappedData.sort(dateSort);

    return dataSorted;
  } else {
    return null;
  }
};

export const getYears = async (doc) => {
  if (doc) {
    const fetchedRows = await getLocalSheetData();
    const years = fetchedRows
      .map((e) => {
        const dateSplitted = split(e.Date);
        const year = dateSplitted[2];
        return year;
      })
      .filter((year) => year !== undefined);

    return [...new Set(years)];
  } else {
    return [];
  }
};

export const getAllMonthByYear = async (doc, year) => {
  if (doc) {
    const fetchedRows = await getLocalSheetData();
    const totalsFiltered = fetchedRows.filter((e) => {
      const dateSplitted = split(e.Date);
      return dateSplitted[2] === year.toString();
    });

    const groupedByMonth = totalsFiltered.reduce((prev, curr) => {
      const newObject = { ...prev };
      const month = split(curr.Date)[1];
      newObject[month] = {
        value: (newObject[month]?.value || 0) + moneyToNumber(curr.Amount),
        count: (newObject[month]?.count || 0) + 1,
      };
      return newObject;
    }, {});

    return Object.entries(groupedByMonth).map((e) => ({ ...e[1], name: e[0] }));
  } else {
    return null;
  }
};


export const getDetailsByMonth = async (doc, month, year) => {
  if (doc) {
    const monthString = month.toString().length < 2 ? `0${month}` : `${month}`;
    const yearString = year.toString();
    const fetchedRows = await getLocalSheetData();
    const totalsFiltered = fetchedRows.filter((e) => {
      const dateSplitted = split(e.Date);
      return (
        dateSplitted[2] === yearString &&
        dateSplitted[1] === monthString
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

    const dataSorted = mappedData.sort(dateSort);

    return dataSorted;
  } else {
    return null;
  }
};