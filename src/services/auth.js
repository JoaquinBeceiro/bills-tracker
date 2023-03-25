import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URI;

export const getRefreshToken = async (code) => {
  try {
    const { data } = await axios.get(`${baseURL}/oauth2callback?code=${code}`);
    return data;
  } catch (error) {
    console.log("ERROR:: ", error);
    return null;
  }
};

export const getNewTokens = async ({
  access_token,
  expiry_date,
  id_token,
  refresh_token,
  scope,
  token_type,
}) => {
  try {
    const tokens = {
      access_token,
      expiry_date,
      id_token,
      refresh_token,
      scope,
      token_type,
    };
    const { data } = await axios.get(`${baseURL}/refresh`, {
      params: { tokens },
    });
    return data;
  } catch (error) {
    console.log("ERROR: ", error);
    return null;
  }
};
