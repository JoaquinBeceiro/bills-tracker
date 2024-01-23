const sheetHeaders = ["Date", "Who", "Amount", "Type", "Detail"];
const sheetHeadersConfig = ["Name", "Frequency", "Amount"];
const defaultTypes = ["Supermercado", "Farmacia", "Vestimenta", "Otros"];
const docName = "BillsTracker";
const sheetTitle = "Bills";
const sheetTitleConfig = "Config";
const sheetScope = "profile email https://www.googleapis.com/auth/spreadsheets";

export {
  sheetHeaders,
  defaultTypes,
  docName,
  sheetTitle,
  sheetScope,
  sheetTitleConfig,
  sheetHeadersConfig
};
