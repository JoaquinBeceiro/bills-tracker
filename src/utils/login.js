import { checkCredentials, createDoc } from "services";
import { setUserSession, getUserSession } from "config/localStorage";
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
    const oldUser = getUserSession();
    setUserSession({
      ...oldUser,
      ...user,
    });
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
}) => {
  const normalizedId = Utils.Common.getSpreadsheetId(spreadsheetId);
  try {
    const user = {
      access_token,
      expires_at,
      refresh_token,
      id_token,
      spreadsheetId: normalizedId,
    };
    const valid = await checkCredentials(user);
    if (valid) {
      return await setDoc(user);
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
