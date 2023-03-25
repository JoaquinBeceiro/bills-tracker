import { checkCredentials, createDoc } from "services";
import { setUserSession } from "config/localStorage";

const setDoc = async ({
  access_token,
  refresh_token,
  expires_at,
  spreadsheetId,
}) => {
  try {
    const user = { access_token, refresh_token, expires_at, spreadsheetId };
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
}) => {
  const user = {
    access_token,
    expires_at,
    refresh_token,
    id_token,
    spreadsheetId,
  };
  const valid = await checkCredentials({
    access_token,
    expires_at,
    refresh_token,
    id_token,
    spreadsheetId,
  });
  if (valid) {
    return await setDoc(user);
  } else {
    return false;
  }
};
