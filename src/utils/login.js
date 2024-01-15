import { checkCredentials, createDoc } from "services";
import { setUserSession } from "config/localStorage";
import Utils from "lib/utils";

const setDoc = async ({
  access_token,
  refresh_token,
  expires_at,
  spreadsheetId,
  name,
}) => {
  try {
    const user = {
      access_token,
      refresh_token,
      expires_at,
      spreadsheetId,
      name,
    };
    const newDoc = await createDoc(
      access_token,
      refresh_token,
      expires_at,
      spreadsheetId
    );
    setUserSession(user);
    return newDoc;
  } catch (error) {
    throw error;
  }
};

export const checkUser = async ({
  access_token,
  expires_at,
  refresh_token,
  id_token,
  spreadsheetId,
  name,
  createDoc,
}) => {
  const normalizedId = createDoc
    ? null
    : Utils.Common.getSpreadsheetId(spreadsheetId);
  try {
    const user = {
      access_token,
      expires_at,
      refresh_token,
      id_token,
      spreadsheetId: normalizedId,
      name,
    };
    const valid = await checkCredentials(user);
    if (valid) {
      return await setDoc(user);
    } else {
      return false;
    }
  } catch (error) {
    console.log("ERROR: ", error);
    return false;
  }
};
