const authErrors = {
  idpiframe_initialization_failed:
    "There was an error trying to authenticate the origin with Google Srvices.",
  default: "There was an error trying to authenticate with Google Srvices.",
};

export const getAuthErrorMessage = (code) =>
  authErrors[code] || authErrors["default"];
