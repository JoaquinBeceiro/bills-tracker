const sheetHeaders = ["Date", "Who", "Amount", "Type", "Detail"];
const sheetHeadersSchedule = [
  "Name",
  "Type",
  "Frequency",
  "Amount",
  "Description",
  "Date",
];
const sheetHeadersTypes = ["Name"];
const defaultTypes = ["Supermercado", "Farmacia", "Vestimenta", "Otros"];
const docName = "BillsTracker";
const sheetTitle = "Bills";
const sheetTitleConfig = "Config";
const sheetScope = "profile email https://www.googleapis.com/auth/spreadsheets";

const createScheduleRow = (name, type, frequency, amount, description, id) => ({
  Name: name,
  Type: type,
  Frequency: frequency,
  Amount: amount,
  Description: description,
  Id: id,
});

export {
  sheetHeaders,
  defaultTypes,
  docName,
  sheetTitle,
  sheetScope,
  sheetTitleConfig,
  sheetHeadersSchedule,
  sheetHeadersTypes,
  createScheduleRow,
};
