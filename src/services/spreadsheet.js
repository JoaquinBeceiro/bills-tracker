import { GoogleSpreadsheet } from "google-spreadsheet";
import Utils from "lib/utils";
import {
  defaultTypes,
  sheetHeaders,
  sheetTitle,
  sheetTitleConfig,
  docName,
  sheetHeadersConfig,
} from "config/sheet";
import { setSheetData, getSheetData } from "config/localStorage";
import {
  avgHeaderData,
  totalsHeaderData,
  categoryHeaderData,
  yearHeaderData,
} from "./headerData";
const { OAuth2Client } = require("google-auth-library");

const { moneyToNumber, formatMoney } = Utils.Currency;
const { dateSort, split, month12Ago, dateParser, dateToText } = Utils.Date;

const getSheet = (doc) => {
  return doc.sheetsByTitle[sheetTitle];
};

const storeSheetData = async (doc) => {
  if (doc) {
    const sheet = getSheet(doc);
    const fetchedRows = await sheet.getRows();
    const mappedData = fetchedRows.map(({ _rawData, _rowNumber }) => {
      return {
        Amount: _rawData[2],
        Date: _rawData[0],
        Type: _rawData[3],
        Detail: _rawData[4],
        Who: _rawData[1],
        Id: _rowNumber,
      };
    });
    setSheetData(mappedData);
    return mappedData;
  } else {
    return null;
  }
};

export const getLocalSheetData = async () => {
  let returnData = [];
  const data = getSheetData();
  if (data) {
    returnData = data;
  } else {
    returnData = await storeSheetData();
  }
  const filteredData = returnData.filter(
    ({ Date, Amount }) => Date.trim() && Amount.trim()
  );
  return filteredData;
};

export const createNewDoc = async ({
  access_token,
  expires_at,
  refresh_token,
}) => {
  try {
    const oAuth2Client = new OAuth2Client({
      clientId: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_SECRET,
    });

    oAuth2Client.credentials.access_token = access_token;
    oAuth2Client.credentials.refresh_token = refresh_token;
    oAuth2Client.credentials.expiry_date = expires_at;

    const newDoc = await GoogleSpreadsheet.createNewSpreadsheetDocument(
      oAuth2Client,
      {
        title: docName,
      }
    );
    return Utils.Common.getSpreadsheetId(newDoc._spreadsheetUrl);
  } catch (error) {
    console.log("ERROR createNewDoc", error);
    return false;
  }
};

export const checkCredentials = async ({
  access_token,
  expires_at,
  refresh_token,
  spreadsheetId,
}) => {
  try {
    const oAuth2Client = new OAuth2Client({
      clientId: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_SECRET,
    });

    oAuth2Client.credentials.access_token = access_token;
    oAuth2Client.credentials.refresh_token = refresh_token;
    oAuth2Client.credentials.expiry_date = expires_at;

    const doc = new GoogleSpreadsheet(spreadsheetId, oAuth2Client);

    await doc.loadInfo();

    return true;
  } catch (error) {
    console.log("ERROR checkCredentials", error);
    return false;
  }
};

export const createDoc = async (
  access_token,
  refresh_token,
  expires_at,
  spreadsheetId
) => {
  try {
    const oauthClient = new OAuth2Client({
      clientId: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_SECRET,
    });

    oauthClient.credentials.access_token = access_token;
    oauthClient.credentials.refresh_token = refresh_token;
    oauthClient.credentials.expiry_date = expires_at;

    const doc = new GoogleSpreadsheet(spreadsheetId, oauthClient);

    await doc.loadInfo();

    const newSheet = getSheet(doc);
    if (newSheet === undefined) {
      await doc.addSheet({
        title: sheetTitle,
        headerValues: sheetHeaders,
      });
      await doc.addSheet({
        title: sheetTitleConfig,
        headerValues: sheetHeadersConfig,
      });
    }
    await storeSheetData(doc);
    return doc;
  } catch (error) {
    console.log("ERROR createDoc", error);
    throw error;
  }
};

export const getTypes = async (doc) => {
  if (doc) {
    const fetchedRows = await getLocalSheetData();
    const newTypes = fetchedRows.map((e) => e.Type);
    const combinedTypes = Array.from(new Set(newTypes.concat(defaultTypes)));
    return combinedTypes.sort((a, b) =>
      a.toLowerCase() > b.toLowerCase() ? 1 : -1
    );
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
    const lastId = newData[newData.length - 1]?.Id || 1;
    newData.push({ ...newRow, Id: lastId + 1 });
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
      ({ Amount, Date, Detail, Type, Who, Id }) => ({
        Amount,
        Date,
        Detail,
        Who,
        Id,
        Type,
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
        year,
      };
      return newObject;
    }, {});

    return Object.entries(groupedByMonth).map((e) => ({ ...e[1], name: e[0] }));
  } else {
    return null;
  }
};

export const getLast12Months = async (doc) => {
  if (doc) {
    const ago = month12Ago();
    const fetchedRows = await getLocalSheetData();
    const totalsFiltered = fetchedRows.filter((e) => {
      const dateFromSpreadsheet = dateParser(e.Date);
      return dateFromSpreadsheet.getTime() >= ago.getTime();
    });

    const grouped = totalsFiltered.reduce((prev, curr) => {
      const newObject = { ...prev };
      const month = split(curr.Date)[1];
      const year = split(curr.Date)[2];
      newObject[month] = {
        value: (newObject[month]?.value || 0) + moneyToNumber(curr.Amount),
        count: (newObject[month]?.count || 0) + 1,
        year,
      };
      return newObject;
    }, {});

    const reduced = Object.entries(grouped)
      .map((e) => ({
        ...e[1],
        name: e[0],
      }))
      .sort((a, b) => a.year + a.name - (b.year + b.name));

    return reduced;
  } else {
    return null;
  }
};

export const getLast12MonthsByType = async (doc) => {
  if (doc) {
    const ago = month12Ago();
    const fetchedRows = await getLocalSheetData();
    const totalsFiltered = fetchedRows.filter((e) => {
      const dateFromSpreadsheet = dateParser(e.Date);
      return dateFromSpreadsheet.getTime() >= ago.getTime();
    });

    const grouped = totalsFiltered.reduce((prev, curr) => {
      const newObject = { ...prev };
      const month = split(curr.Date)[1];
      const year = split(curr.Date)[2];

      const oldValue = newObject[month]?.[curr.Type]?.value || 0;
      const oldCount = newObject[month]?.[curr.Type]?.count || 0;

      if (newObject[month] === undefined) newObject[month] = [];

      newObject[month][curr.Type] = {
        value: oldValue + moneyToNumber(curr.Amount),
        count: oldCount + 1,
        year,
      };
      return newObject;
    }, {});

    const reduced = Object.entries(grouped)
      .map((e) => ({
        ...e[1],
        name: e[0],
        year: e[1][Object.keys(e[1])[0]].year,
      }))
      .sort((a, b) => a.year + a.name - (b.year + b.name));
    return reduced;
  } else {
    return null;
  }
};

export const getAllMonthByTypeByYear = async (doc, year) => {
  if (doc) {
    const fetchedRows = await getLocalSheetData();
    const totalsFiltered = fetchedRows.filter((e) => {
      const dateSplitted = split(e.Date);
      return dateSplitted[2] === year.toString();
    });

    const groupedByMonth = totalsFiltered.reduce((prev, curr) => {
      const newObject = { ...prev };
      const month = split(curr.Date)[1];

      const oldValue = newObject[month]?.[curr.Type]?.value || 0;
      const oldCount = newObject[month]?.[curr.Type]?.count || 0;

      if (newObject[month] === undefined) newObject[month] = [];

      newObject[month][curr.Type] = {
        value: oldValue + moneyToNumber(curr.Amount),
        count: oldCount + 1,
        year,
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
      return dateSplitted[2] === yearString && dateSplitted[1] === monthString;
    });

    const mappedData = totalsFiltered.map(
      ({ Amount, Date, Detail, Type, Who, Id }) => ({
        Amount,
        Date,
        Detail,
        Type,
        Who,
        Id,
      })
    );

    const dataSorted = mappedData.sort(dateSort);

    return dataSorted;
  } else {
    return null;
  }
};

export const deleteRow = async (doc, id) => {
  if (doc) {
    const sheet = getSheet(doc);
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
};

export const getItemsByText = async (doc, text, limit = 100) => {
  if (doc && text) {
    const wordCounts = text.trim().split(" ").length;
    const fetchedRows = await getLocalSheetData();
    const formatSearch = text.toLowerCase().trim();
    const totalsFiltered = fetchedRows.filter((e) => {
      const dateText = dateToText(e.Date);
      const moneyNumber = moneyToNumber(e.Amount);
      const items = [e.Amount, e.Type, e.Detail, dateText, moneyNumber];
      const itemsText = items.join(" ").toLowerCase();

      const coincidences = formatSearch.split(" ").reduce((acc, value) => {
        if (new RegExp(value).exec(itemsText)) {
          return acc + 1;
        }
        return acc;
      }, 0);

      return coincidences === wordCounts;
    });

    const mappedData = totalsFiltered.map(
      ({ Amount, Date, Detail, Type, Who, Id }) => ({
        Amount,
        Date,
        Detail,
        Type,
        Who,
        Id,
      })
    );

    const dataSorted = mappedData.sort(dateSort);

    return {
      count: dataSorted.length,
      results: dataSorted.slice(0, limit),
    };
  } else {
    return null;
  }
};

export const HeaderData = async (doc) => {
  const avgHeader = await avgHeaderData(doc);
  const totalsHeader = await totalsHeaderData(doc);
  const categoryHeader = await categoryHeaderData(doc);
  const yearHeader = await yearHeaderData(doc);

  return [totalsHeader, avgHeader, categoryHeader, yearHeader];
};
