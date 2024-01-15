export const isJsonString = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const getSpreadsheetId = (url) => {
  if (url) {
    if (url.slice(0, 4) === "http") {
      const matches = /\/([\w-_]{18,})(.*?gid=(\d+))?/.exec(url);
      return matches[1];
    } else {
      return url;
    }
  } else {
    return null;
  }
};
